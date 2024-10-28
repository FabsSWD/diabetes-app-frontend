
# Diabetes App Frontend

## Index

- [Frontend](https://github.com/FabsSWD/diabetes-app-frontend)
- [Backend](https://github.com/FabsSWD/diabetes-service-backend)
- [AI API](https://github.com/FabsSWD/diabetes-ml)

## Project Description

This project is the **frontend** component of a diabetes prediction application, developed using **React**. It allows users to create an account, log in, reset passwords, make diabetes predictions, and view a table of predictions. The application is fully integrated with a **RESTful API backend** that handles user management and prediction storage. The frontend includes an **internationalization (i18n)** feature that enables users to toggle between English and Spanish, with a language switch button represented by the flags of Spain and the USA.

## Technologies Used

- **React 18**: Main framework for building the user interface.
- **Material UI**: For UI components and styling.
- **i18next**: For internationalization.
- **axios**: For making HTTP requests to the backend API.
- **jsPDF**: For generating PDF reports of predictions.
- **CSVLink**: For downloading predictions in CSV format.

## Project Structure

The project follows a modular structure, with components organized based on their functionality. The main folders include:

- `components`: Contains all the UI components, such as `Appbar`, `Login`, `Register`, `Prediction`, and `PredictionsTable`.
- `context`: Holds the `UserContext` that manages user authentication status and context.
- `assets`: Stores static resources, including the flag images used in the language switcher.
- `i18n`: Contains configuration files for internationalization (`en.json` and `es.json` for English and Spanish translations).

## Features

The frontend provides the following features:

### 1. User Authentication

- **Login**: Allows users to log in with a username and password.
- **Registration**: New users can register by providing a username and password.
- **Password Reset**: Users can reset their password if they forget it.

### 2. Diabetes Prediction

- **Make Prediction**: Users can enter personal health data and submit it to get a diabetes prediction.
- **View Predictions**: Users can view their own predictions or public predictions in a table format.
- **Download Predictions**: Predictions can be downloaded as PDF or CSV files.

### 3. Language Toggle

- **Language Switcher**: A button that switches between English and Spanish by clicking on the respective flag (USA or Spain) in the Appbar. The entire application will switch to the selected language.

## Main Components

### 1. `Appbar`
The navigation bar of the application, including links to different sections and the language toggle. Displays a flag to indicate the current language and allows users to switch between English and Spanish.

### 2. `Login`
A form where users can enter their credentials to log in. If the credentials are correct, the user is redirected to the main page.

### 3. `Register`
A form that allows new users to register by providing a username and password.

### 4. `ResetPassword`
A form that allows users to reset their password by entering their username, new password, and password confirmation.

### 5. `Prediction`
A form that allows users to input health data for diabetes prediction. After submitting, the data is sent to the backend, and the prediction result is displayed.

### 6. `PredictionsTable`
Displays a table of predictions. Users can view their own predictions or public predictions. The table includes options to download the data as a PDF or CSV file.

### 7. `UserProfile`
Shows the logged-in user's profile information, including their username, with an option to log out.

## API Endpoints

This frontend communicates with a backend API that manages user authentication, password resetting, and prediction data. The main API endpoints include:

- **User Registration**: `/user/add` - Registers a new user.
- **User Login Validation**: `/user/validate` - Validates user credentials.
- **Password Update**: `/user/update-password` - Updates user password.
- **Create Prediction**: `/prediction/add` - Adds a new diabetes prediction.
- **Get Predictions**: `/prediction/user` (for own predictions), `/prediction/public` (for public predictions).

## User Interface Overview

### Appbar

The `Appbar` includes:
- **Navigation Buttons**: Links to various pages such as "Make Prediction" and "Prediction Table".
- **User Avatar**: Shows the profile picture, which redirects to the User Profile page.
- **Language Toggle**: A button that switches between English and Spanish by changing the flag icon.

### Internationalization

The app is fully translated into English and Spanish. Texts are stored in `en.json` and `es.json` files inside the `i18n` folder. By clicking on the language toggle button, users can dynamically switch the language throughout the application.

## How to Run the Project

### Prerequisites

- **Node.js** (version 14 or above)
- **npm** (Node package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/FabsSWD/diabetes-app-frontend
   cd diabetes-app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Testing with the Backend

The frontend is designed to work with a backend API running at `http://localhost:8085`. Ensure that the backend is running and configured to accept requests from the frontend for full functionality.

### Internationalization Configuration

The internationalization feature is powered by **i18next** and configured in `i18n.js`. The translations are located in JSON files:

- `en.json`: English translations
- `es.json`: Spanish translations

## Project Directory Structure

```
diabetes-app-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   │   ├── es-flag.png
│   │   └── us-flag.png
│   ├── components/
│   │   ├── Appbar.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── ResetPassword.js
│   │   ├── Prediction.js
│   │   ├── PredictionsTable.js
│   │   └── UserProfile.js
│   ├── context/
│   │   └── UserContext.js
│   ├── i18n/
│   │   ├── en.json
│   │   └── es.json
│   ├── App.js
│   ├── index.js
│   └── ...
└── README.md
```

## License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this project for both personal and commercial purposes.
