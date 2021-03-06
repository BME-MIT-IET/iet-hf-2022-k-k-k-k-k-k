package com.adja.evchargerappserver.security.configs;

import com.adja.evchargerappserver.EvChargerAppServerApplication;
import com.adja.evchargerappserver.security.filters.JwtAuthenticationFilter;
import com.adja.evchargerappserver.security.filters.JwtAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        if(EvChargerAppServerApplication.JWT_ENABLED) {
            http.cors().and().authorizeRequests().antMatchers(
                    "/api/login/**",
                    "/api/token/refresh",
                    "/api/hasRightForPage",
                    "/api/person/register",

                    "/v2/api-docs",
                    "/configuration/ui",
                    "/swagger-resources/**",
                    "/configuration/security",
                    "/swagger-ui.html",
                    "/webjars/**"
            ).permitAll();

            http.authorizeRequests().antMatchers("/socket").hasAnyAuthority("role_user");
            http.authorizeRequests().antMatchers("/socket").hasAnyAuthority("role_user");

            http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/**/search").hasAnyAuthority("role_user");

            http.authorizeRequests().antMatchers("/api/notification/**").hasAnyAuthority("role_admin");

            http.authorizeRequests().antMatchers("/email/sendmail").hasAnyAuthority("role_admin");

            http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/electricCar/").hasAnyAuthority("role_user");

            http.authorizeRequests().antMatchers(HttpMethod.GET, "/api/**").hasAnyAuthority("role_user");
            http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/**").hasAnyAuthority("role_admin");
            http.authorizeRequests().antMatchers(HttpMethod.PUT, "/api/**").hasAnyAuthority("role_user");
            http.authorizeRequests().antMatchers(HttpMethod.DELETE, "/api/**").hasAnyAuthority("role_admin");
        }
        else {
            http.cors().and().authorizeRequests().anyRequest().permitAll();
        }

        JwtAuthenticationFilter customAuthenticationFilter = new JwtAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/api/login");

        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new JwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);

        web.httpFirewall(allowUrlEncodedSlashHttpFirewall());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(List.of("x-auth-token"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedSlash(true);
        firewall.setAllowUrlEncodedDoubleSlash(true);
        firewall.setAllowSemicolon(true);
        return firewall;
    }


    public static String getSecretKey() {
        String secret = "titok_adja";
        return secret;
    }
}
