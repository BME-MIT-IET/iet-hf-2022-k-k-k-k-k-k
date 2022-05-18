### Talpos Norbert - Q2H4XB
A legfőbb felelősségem a projektben a Github Actions ci pipeline beüzemelése volt.
Ennek keretében elkészítettem a docker_build_push job-ot, ami első körben kiegészíti
a biztonságkritikus részeit a szoftvernek (pl: smtp jelszó beillesztése environment 
változóként az application.properties-be) github secretek segítségével,
majd lebuildeli a Docker image-eket a Dockerfile-ok alapján, ezután pusholja ezeket 
az image-eket a kijelölt Dockerhub repository-ba, hogy fel lehessen őket használni.
Ezen kívül segítettem a SonarCloud által jelzett Bugok és Code Smell-ek írtásában is.

### Rádi Kristóf -- DD38KG

During this homework project, I tried to contribute to the teamwork both in the technology-focused, analytical tasks and in the product, user-focused tasks.

First, I focused more on UI testing, including learning and applying the Cypress framework in the form of component and integration testing. During the integration of Cypress, I encountered unexpected problems, which I solved through a long debugging process, with version conflicts in the external libraries...

During the integration test I used the happy path approach: Happy-path testing is a type of software testing that uses known input and produces an expected output.
The main functionality of the application is clicked through, and during the component tests I checked the functionality of 1-1 more specific units, such as form validation or the correct operation of the light-darkmode switch. In some cases, this also required modifications to the frontend code, where I defined ids and keys for easier testing.
Here is the recorded [video of the Happy path](https://github.com/BME-MIT-IET/iet-hf-2022-k-k-k-k-k-k/blob/master/src/frontend/ev-charger-app-client/cypress/videos/Visit.spec.js.mp4).

And for library version problems, I hooked up the dependabot, which is essential for a longer project to automatically detect problems with each external library and provide update suggestions to keep the project up-to-date.

For the webapp, I tried out the Chrome supported Lighthouse:
>Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO and more.

>You can run Lighthouse in Chrome DevTools, from the command line, or as a Node module. You give Lighthouse a URL to audit, it runs a series of audits against the page, and then it generates a report on how well the page did. From there, use the failing audits as indicators on how to improve the page. Each audit has a reference doc explaining why the audit is important, as well as how to fix it.

Our result:
![image](https://user-images.githubusercontent.com/55052220/168973403-4ce5d054-f6fe-4ac4-b028-ddd716236dc0.png)
