<template>
    <v-card class="mt-3 pa-5 zoom-out">
        <v-container>
            <v-row>
                <v-col cols="12" class="pb-0">
                    <v-text-field
                        v-model="searchField"
                        outlined
                        persistent-placeholder
                        placeholder="company name"
                        style="font-size: 20px;"
                        clearable
                        prepend-inner-icon="mdi-magnify"
                        @input="searchFieldHandler"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                    <v-layout>
                        <span style="font-size: 20px; margin-right: 10px;">range:</span>
                        <v-slider
                            v-model="slider"
                            max="20"
                            thumb-color="primary"
                            color="primary"
                            track-color="primary"
                            :thumb-label="true"
                            @input="rangeSliderHandler"
                        ></v-slider>
                    </v-layout>
                </v-col>
            </v-row>
            <v-row justify="center" no-gutters dense class="mt-5">
                <v-card class="px-6 pt-6" style="max-width: 450px; height: 100%;" elevation="2" outlined>
                    <v-layout row wrap justify-start>
                        <v-card-title style="font-size: 20px; margin-right: 10px; margin-bottom: 10px;">charger types:</v-card-title>
                        <v-spacer/>
                        <v-btn class="mt-2" color="darkprimary" dark @click="toggleAllChargerTypes">
                            toggle all
                        </v-btn>
                    </v-layout>
                    <v-container style="position: relative; overflow-y: scroll; max-height: 400px;">
                        <v-row dense class="mb-5">
                            <v-col class="sm12 md12 lg6 xl6 mb-1" v-for="chargerType in chargerTypes" :key="chargerType">
                                <div class="image" :style="chargerTypeStyle(chargerType)" @click="chargerTypeSelected(chargerType)">
                                    <v-layout column>
                                        <v-layout row wrap justify-center>
                                            <v-img :class="`${darkTheme ? 'darkChargerIcon' : ''}`" style="margin-left: 10px;"
                                                   :src="require(`../assets/chargerTypes/${chargerType}.png`)"
                                                   max-width="70px"/>
                                        </v-layout>
                                        <v-layout class="mt-5" row wrap justify-center>
                                            <span style="margin-left: 5px;">{{ chargerType }}</span>
                                        </v-layout>
                                    </v-layout>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import {DebounceSearch} from "@/mixins/DebounceSearch";

export default {
    name: "filter-card",
    mixins: [DebounceSearch],
    data() {
        return {
            debounce: null,
            searchField: null,
            slider: 10,
            chargerTypes: [
                "Type 2",
                "Type 3",
                "ChaDeMo",
                "Tesla"
            ],
            selectedChargerTypes: [],
        }
    },
    computed: {
        darkTheme() {
            return this.$vuetify.theme.dark;
        }
    },
    methods: {
        searchFieldHandler() {
            this.debounceSearch(() => this.$emit("filterChanged", {
                ownerCompanyName: this.searchField
            }), 400);
        },
        rangeSliderHandler() {
            this.debounceSearch(() => this.$emit("filterChanged", {
                radius: this.slider
            }), 400);
        },
        chargerTypeSelected(chargerType) {
            if(this.selectedChargerTypes.includes(chargerType)) {
                const index = this.selectedChargerTypes.indexOf(chargerType);
                if (index !== -1) {
                    this.selectedChargerTypes.splice(index, 1);
                }
            }
            else {
                this.selectedChargerTypes.push(chargerType);
            }

            this.debounceSearch(() => this.$emit("filterChanged", {
                chargerTypes: this.selectedChargerTypes,
            }), 400);
        },
        chargerTypeStyle(chargerType) {
            const base = 'display: flex; justify-content: center; align-items: center; height: 160px; min-width: 180px; border-radius: 5px; '
            return this.selectedChargerTypes.includes(chargerType) ?
                base + `border: solid 3px ${this.$vuetify.theme.dark ? this.$vuetify.theme.themes.dark.darkprimary :  this.$vuetify.theme.themes.light.darkprimary};`
                : base + 'border: solid 3px transparent;';
        },
        toggleAllChargerTypes() {
            if(this.selectedChargerTypes.length !== this.chargerTypes.length) {
                this.selectedChargerTypes = [];
                this.chargerTypes.forEach(i => this.selectedChargerTypes.push(i));
            }
            else {
                this.selectedChargerTypes = [];
            }

            this.debounceSearch(() => this.$emit("filterChanged", {
                chargerTypes: this.selectedChargerTypes,
            }), 400);
        }
    },
    async mounted() {
        const resp = await this.axios.get(`/api/person/current-person`);
        const person = resp.data;

        if(person.car) {
            this.chargerTypes = person.car.carType.compatibleChargerTypes.map(i => i.name);
        }
    }
}
</script>