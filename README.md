# Black Therapy Platform

A comprehensive therapy and coaching platform built with React and Node.js, featuring Stripe payment integration.

## Project Structure

- `/src` - React frontend application
- `/server` - Node.js backend with Express and Stripe integration
- `/public` - Static assets

## Features

- 🔐 Firebase Authentication
- 💳 Stripe Payment Integration
- 📅 Appointment Management
- 💬 Real-time Chat
- 🗺️ Therapist/Coach Finder with Maps
- 📱 Responsive Design
- 🔔 Subscription Management

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Stripe account

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd black_therapy
```

2. **Install frontend dependencies**

```bash
npm install
```

3. **Install backend dependencies**

```bash
cd server
npm install
cd ..
```

4. **Configure environment variables**

Create `.env` file in the root directory:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_API_URL=http://localhost:5000
```

Create `.env` file in the `server` directory:

```env
PORT=5000
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
FRONTEND_URL=http://localhost:3000
```

See [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md) for complete configuration details.

### Running the Application

**Start the backend server:**

```bash
cd server
npm run dev
```

**In a new terminal, start the frontend:**

```bash
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000)  
The backend will run on [http://localhost:5000](http://localhost:5000)

## Documentation

- [Stripe Setup Guide](STRIPE_SETUP_GUIDE.md) - Complete guide for setting up Stripe integration
- [Server README](server/README.md) - Backend API documentation

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
