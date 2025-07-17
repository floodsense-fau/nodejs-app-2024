# FloodSense Application Documentation

## Table of Contents

- [FloodSense Application Documentation](#floodsense-application-documentation)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [System Architecture](#system-architecture)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [API Reference (REST)](#api-reference-rest)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)
- [PREV GROUP NOTES](#prev-group-notes) - [FloodSense-App-ED2-Project (PREV DOCS)](#floodsense-app-ed2-project-prev-docs)
  - [Documentaton](#documentaton)
  - [Source Code](#source-code)

## Project Overview

FloodSense is a capstone project focused on developing an affordable sensor system for flood detection. The goal is to deploy these sensors across various locations to assist in real-time flood monitoring and data collection. The current prototype consists of a motherboard with a gateway and an ultrasonic sensor that measures distance to detect potential flooding. While the project is still in its early stages and the approach may evolve, the core objective remains to provide accessible and effective flood sensing solutions.

## Features

- **Custom Motherboard:** Integrates and manages multiple sensors for flexible deployment.
- **Wireless Gateway:** Transmits sensor data securely to the cloud backend.
- **Ultrasonic Flood Detection:** Measures water levels accurately using ultrasonic technology.
- **Cloud Backend:** Processes, stores, and manages sensor data with scalable APIs.
- **User-Friendly Frontend:** Provides real-time monitoring, historical data visualization, and alert notifications.
- **Weather Data Integration:** Enhances flood prediction by incorporating external weather APIs.

## System Architecture

The FloodSense system is composed of several key components working together to enable real-time flood monitoring:

- **Sensors:** Ultrasonic sensors connected to a custom motherboard measure water levels at deployment sites.
- **Gateway:** Collects sensor data and transmits it to the backend server via a wireless connection.
- **Backend (Cloud Service):** Receives, processes, and stores sensor data. Provides APIs for data access and management.
- **Frontend Application:** Visualizes real-time and historical flood data for users, offering alerts and insights.
- **External APIs:** Integrates with weather data providers (e.g., tomorrow.io) to enhance flood prediction and context.

A typical data flow:

1. Sensors detect water level changes and send readings to the gateway.
2. The gateway forwards data to the backend cloud service.
3. The backend processes and stores the data, making it available via APIs.
4. The frontend application retrieves and displays the data to users.

_You can include a diagram here to visually represent the architecture._

## Installation

_Steps to install and set up the project locally._

## Usage

_Instructions on how to run and use the application._

## Configuration

_Explain any configuration files or environment variables needed._

## API Reference (REST)

_Document the main API endpoints and their usage._

## Contributing

_Guidelines for contributing to the project._

## License

This project is the property of the participating students and Florida Atlantic University. It is intended for educational and non-commercial use as part of the capstone curriculum. Redistribution or use outside of academic purposes may require permission from both the students and the institution. Please contact the project team or faculty advisor for more information regarding licensing or usage rights.

## Acknowledgements

We would like to acknowledge the contributions of previous groups whose work laid the foundation for this project. Special thanks to our project sponsors, Dan Zimmerman (PhD Student) and George Sklivanitis (PhD), for their guidance and support. We also extend our gratitude to Florida Gulf Coast University for providing the opportunity and resources to pursue this capstone project.

# PREV GROUP NOTES

#### FloodSense-App-ED2-Project (PREV DOCS)

## Documentaton

The Documentation file includes the documentation for AWS and source code explanations.

## Source Code

Includes all the source code for the Node.js backend. Removed the API token and any other private information from the source code. serialReader.js and tomorrow.js are the two files of importance. serialReader.js reads the Arduino inputs from USB port and tomorrow.js uses the tomorrow.io API call to return weather data.

..
