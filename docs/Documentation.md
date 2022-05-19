### Rádi Kristóf -- DD38KG

During this homework project, I tried to contribute to the teamwork both in the technology-focused, analytical tasks and in the product, user-focused tasks.

First, I focused more on UI testing, including learning and applying the Cypress framework in the form of component and integration testing. During the integration of Cypress, I encountered unexpected problems, which I solved through a long debugging process, with version conflicts in the external libraries...

During the integration test I used the happy path approach: Happy-path testing is a type of software testing that uses known input and produces an expected output.
The main functionality of the application is clicked through, and during the component tests I checked the functionality of 1-1 more specific units, such as form validation or the correct operation of the light-darkmode switch. In some cases, this also required modifications to the frontend code, where I defined ids and keys for easier testing.
Here is the recorded [video of the Happy path](https://github.com/BME-MIT-IET/iet-hf-2022-k-k-k-k-k-k/blob/master/src/frontend/ev-charger-app-client/cypress/videos/Visit.spec.js.mp4).

And for library version problems, I hooked up the dependabot, which is essential for a longer project to automatically detect problems with each external library and provide update suggestions to keep the project up-to-date.


Cypress testing:

## Integration tests

Cypress was originally designed to run end-to-end (E2E) tests on anything that runs in a browser. A typical E2E test visits the application in a browser and performs actions via the UI just like a real user would.

### In order to run these cypress tests:


```
npx cypress run
```


these will run all tests (specified in the cypress.json file path will be the path, default is integration folder)

If you only want to run tests from a single spec file and record the results on the Dashboard, the command should be:

```
npm run cy:run -- --record --spec "cypress/integration/my-spec.js"
```

For more specific details and command options see the [documentation](https://docs.cypress.io/guides/guides/command-line#How-to-run-commands).

## Component testing

With component testing in Cypress, you can achieve the same goal: test a component in isolation. Instead of having components render inside a terminal, Cypress renders components in a real browser. Since the components you are testing are visible in the browser, this makes it easier to test and debug when a test fails.

### Open Cypress in Component Testing mode:
```
npx cypress open-ct
```

To run all component tests in the terminal, run the command below (or it is possible to add this to our CI pipeline), and it will show you the success and fail rates of your tests:
```
npx cypress run-ct
```


