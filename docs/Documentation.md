### Talpos Norbert - Q2H4XB
A legfőbb felelősségem a projektben a Github Actions ci pipeline beüzemelése volt.
Ennek keretében elkészítettem a docker_build_push job-ot, ami első körben kiegészíti
a biztonságkritikus részeit a szoftvernek (pl: smtp jelszó beillesztése environment 
változóként az application.properties-be) github secretek segítségével,
majd lebuildeli a Docker image-eket a Dockerfile-ok alapján, ezután pusholja ezeket 
az image-eket a kijelölt Dockerhub repository-ba, hogy fel lehessen őket használni.
Ezen kívül segítettem a SonarCloud által jelzett Bugok és Code Smell-ek írtásában is.
