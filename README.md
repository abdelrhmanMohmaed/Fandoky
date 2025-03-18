# Fandoky - Accommodation Booking Platform

Fandoky is a platform that allows users to book accommodations. It's built with React.js for the frontend and Laravel (for testing) / Django (planned) for the backend.

## Features

* User authentication (login, signup, logout)
* Password reset
* Email verification
* User data management using Context API
* Updated landing page
* Updated login view and functionality
* OTP verification and resend
* Password strength check
* **Global Axios Helper:** Added a helper file to manage Axios requests globally.
* **Context for Places Data:** Implemented Context API to manage and fetch place data.
    * **Display Places:** Context is used to fetch and display all places on the Home page.
    * **Filter Places:** Implemented filtering functionality in the Navbar using Context data.
    * **Loading Card:** Added a loading card component for better user experience during data fetching.
* **Footer:** Added a footer component.

## Technologies Used

* Frontend: React.js, Tailwind CSS, React Router DOM, React Toastify, React-icons, jwt-decode, React Date Range, React Password Strength Bar, zxcvbn

## Getting Started

1. Clone the repository: `git clone https://github.com/abdelrhmanMohmaed/Fandoky`
2. Install dependencies: `yarn install` or `npm install`
3. Start the development server: `yarn dev` or `npm start`
4. Open your browser at `http://localhost:5173/`

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b my-new-feature`
3. Make your changes
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Create a new pull request

## Screenshots

![Home Page (Initial Layout)](screenshots/home-initial-layout.png)
![Login Modal](screenshots/login-modal-initial-layout.png)
![Footer Modal](screenshots/footer.png)
![Home Filter](screenshots/home-filter.png)
![Loader](screenshots/Loader.png)
![Login Successful](screenshots/login-success-initial-layout.png)
![Forgot Password](screenshots/forgot-password.png)
![Reset Password](screenshots/reset-password.png)
![Verify Email](screenshots/verify-email.png)
![Home Page (Mobile)](screenshots/home-mobile.png)
![Search (Mobile)](screenshots/search-mobile.png)


**Note:** The login functionality uses an external API that is currently configured to work only on my local machine. To test the login feature, you will need to set up your own API or modify the existing one to work on your machine.