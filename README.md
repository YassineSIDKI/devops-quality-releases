[![Build Status](https://dev.azure.com/yassinesidki822/Quality-releases/_apis/build/status/YassineSIDKI.devops-quality-releases?branchName=master)](https://dev.azure.com/yassinesidki822/Quality-releases/_build/latest?definitionId=1&branchName=master)

# Overview

Devops For Microsoft Azure Udacity Final Project

![pipeline](pipelinediag.png)

# Project Structure

- **azure-piplines.yaml**: azure pipelines yaml
- **automatedtesting/**: suites of automated tests
  - **jmeter**: load test files (.jmx) and CSV inputs
  - **postman**: Integration tests postman: Environments + Collections
  - **selenium**: Functional Ui test
- **fakerestapi**: Api to deploy
- **screens**: all screenshots
- **terraform**: terraform folder

---

## Provisioning azure resources using Terraform

- The following screenshot showing the output of init, plan and apply terraform tasks

  ![capture-1-terraform-provisioning](screenshots/provisionning.png)

- Here is tfstate well uploaded and updated to the used container

  ![capture-1-terraform-tfstate](screens/tfstate.png)

## FakerestAPI deployment

- See azurepipelines.yaml for more details about how to deploy webapp ASP.NET

  ![capture-3-load-test]()

## Automated Testing

- Load test suite : Endurance tests

  ![capture-3-load-test]()

- Load test suite : Stress tests

  ![capture-3-load-test]()

- Functional test suites

  - screenshot of the execution of the test suite by the CI/CD pipeline
    ![capture-4-functional-test](screenshots/capture-4-functional-test.png)

- API-integration tests
  - screenshot of the Run Summary page (which contains 4 graphs)
    ![capture-5-summary-page-part1](screenshots/capture-5-summary-page-part1.png)
  - screenshot of the Test Results page (which contains the test case titles from each test)
    ![capture-5-test-result-page-part2](screenshots/capture-5-test-result-page-part2.png)
  - screenshot of the output of the Publish Test Results step
    ![capture-5-publish-tests-output-part3](screenshots/capture-5-publish-tests-output-part3.png)

## Monitoring & Observability

- Configure Azure Monitor

  - screenshots of the email received when the alert is triggered
    ![capture-6-emails-part1](screenshots/capture-6-emails-part1.png)
  - screenshots of the graphs of the resource that the alert was triggered
    ![capture-6-webapp-part2](screenshots/capture-6-webapp-part2.png)
  - screenshots of the alert rule
    ![capture-6-alerts-part3a](screenshots/capture-6-alerts-part3c.png)
    ![capture-6-alerts-part3b](screenshots/capture-6-alerts-part3c.png)
    ![capture-6-alerts-part3c](screenshots/capture-6-alerts-part3c.png)

- Azure Log Analytics
  - screenshots of log analytics queries and result sets which will show specific output of the Azure resource
    ![capture-7-log-analytics](screenshots/capture-7-log-analytics.png)
