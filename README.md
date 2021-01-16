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

  ![terraform1](screens/terraform1.png)

- Here is tfstate well uploaded and updated to the used container

  ![terraform2](screens/terraform2.png)

## Automated Testing

- Load test suite : Endurance tests

  ![endurancetests](screens/jmeter1.png)

- Load test suite : Stress tests

  ![stress tests](screens/jmeter2.png)

- Functional test suites

  - screenshot of the execution of the test suite by the CI/CD pipeline
    ![uitest](screens/uitests.png)

- API-integration tests

  - screenshot of the Run Summary page (which contains 4 graphs)
    ![postman2](screens/postman2.png)

  - screenshot of the Test Results page (which contains the test case titles from each test)

    ![postman4](screens/postman4.png)

  - screenshot of the output of the Publish Test Results step
    ![publishtests](screens/postman1.png)

## Monitoring & Observability

- Configure Azure Monitor

  - screenshots of the email received when the alert is triggered
    ![capture-6-emails-part1](screens/alert.png)

  - screenshots of the graphs of the resource that the alert was triggered
    ![capture-6-webapp-part2](screens/metric.png)
  - screenshots of the alert rule
    ![capture-6-alerts-part3a](screens/alertrule2.png)

- Azure Log Analytics
  - screenshots of log analytics queries and result sets which will show specific output of the Azure resource
    ![capture-7-log-analytics](screens/loginfo.png)
