<!-- PROJECT SHIELDS -->
<a name="readme-top"></a>
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Main Branch](https://github.com/tekcapsule/tekcapsule-web/actions/workflows/cicd.yml/badge.svg)](https://github.com/tekcapsule/tekcapsule-web/actions/workflows/cicd.yml) 
[![SonarCloud Bugs](https://sonarcloud.io/api/project_badges/measure?project=tekcapsule_tekcapsule-web&metric=bugs)](https://sonarcloud.io/project/overview?id=tekcapsule_tekcapsule-web)
[![SonarCloud Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=tekcapsule_tekcapsule-web&metric=vulnerabilities)](https://sonarcloud.io/project/overview?id=tekcapsule_tekcapsule-web)
[![SonarCloud Code Smell](https://sonarcloud.io/api/project_badges/measure?project=tekcapsule_tekcapsule-web&metric=code_smells)](https://sonarcloud.io/project/overview?id=tekcapsule_tekcapsule-web)
[![SonarCloud Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=tekcapsule_tekcapsule-web&metric=ncloc)](https://sonarcloud.io/project/overview?id=tekcapsule_tekcapsule-web)
[![Github all releases](https://img.shields.io/github/downloads/tekcapsule/tekcapsule-web/total.svg)](https://GitHub.com/tekcapsule/tekcapsule-web/releases/)


<!-- PROJECT LOGO -->

<div align="center">
  <img src="https://user-images.githubusercontent.com/9839481/209770761-99fd940f-3c75-407b-a339-9fd2cd2c5b7f.svg">
  <h3 align="center">TekCapsule Web App</h3>
  <p align="center">
    A set of lambda functions to manage users in TekCapsule
    <br />
    <a href="https://www.tekcapsule.com/">View Demo</a> |
    <a href="https://github.com/tekcapsule/tekcapsule-web/issues">Report Bug</a> |
    <a href="https://github.com/tekcapsule/tekcapsule-web/issues">Request Feature</a>
  </p>
</div>
<div align="center">
  
  <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=389065899&machine=standardLinux32gb&location=SouthEastAsia">![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)</a>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

This project contains set of functions written in Java 11 to create, update, query and manage TekCapsule users. It is a multi-module maven project with two modules named application & domain. Application module is a springboot application that exposes these functions and domain module contains the domain logic.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- GETTING STARTED -->

## Getting Started

Please follow the below instructions to setup the project locally.

### Prerequisites

This project requires following softwares: 
* SAM  
* JAVA 11
* Maven 

### Installation

Please follow the step by step instructions to install the required softwares and setup the project.
1. Get the AWS Access Key details
2. Clone the repo
   ```sh
   git clone https://github.com/tekcapsule/tekcapsule-web.git
   ```
3. Install SAM CLI by following instructions https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
4. Configure the following Environment variables
* APPLICATION_ENVIRONMENT=<Environment_Name>
* CLOUD_REGION=<Region_Name>
* secrets.AWS_ACCESS_KEY_ID=<Access_KEY_ID>
* secrets.AWS_SECRET_ACCESS_KEY=<Access_KEY_Value>
* secrets.SERVER_PASSWORD=<SERVER_PASSWORD>
* secrets.SERVER_USERNAME=<SERVER_USERNAME>

Note: SERVER_USERNAME and SERVER_PASSWORD details will be be provided by the maintainers on request.

5. Copy the settings.xml to ~/.m2
6. Run the command
   ```sh
   sam build
   ```
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/tekcapsule/tekcapsule-web/issues) for a list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## How to Contribute?

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/Neweature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## Contributors
<img src= "https://contrib.rocks/image?repo=tekcapsule/tekcapsule-web">

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the GNU GENERAL PUBLIC LICENSE. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# TekcapsuleWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
