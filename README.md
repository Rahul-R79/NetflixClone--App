Netflix Clone App 🎥
Welcome to the Netflix Clone App, a modern web application built with React and Bootstrap, designed to replicate the core experience of Netflix. This app allows users to browse movies, watch trailers, and manage their accounts with a sleek, responsive interface. Powered by the OMDB API for movie data, Firebase Authentication for secure user management, and the YouTube API for streaming trailers, this project showcases a robust front-end architecture with useEffect for side effects and useReducer for state management.

✨ Features

User Authentication:

Sign Up: Create a new account with email and password using Firebase Authentication.
Sign In: Securely log in to access personalized features.
Logout: Seamlessly sign out of the app.


Movie Browsing:

Fetches movie data from the OMDB API to display a rich catalog of movies.
Search functionality to find movies by title.
Detailed movie pages with posters, descriptions, ratings, and more.


Trailer Playback:

Integrates the YouTube API to fetch and play movie trailers directly in the app.
Responsive video player for an immersive viewing experience.


Responsive Design:

Built with Bootstrap for a polished, mobile-friendly UI.
Consistent look and feel across devices, mimicking Netflix’s aesthetic.


State Management:

Uses useReducer for predictable, centralized state management.
Leverages useEffect for handling API calls and side effects efficiently.


🛠️ Tech Stack

Frontend: React, Bootstrap
State Management: useReducer, useEffect
Authentication: Firebase Authentication
APIs:
OMDB API: For fetching movie details.
YouTube API: For streaming movie trailers.


🚀 Getting Started
Prerequisites

Node.js (v16 or higher)
Firebase account for authentication
API keys for:
OMDB API
YouTube Data API v3

Installation

Clone the Repository:
git clone https://github.com/your-Rahul-R79/NetflixClone--App.git
cd netflix-clone


Install Dependencies:
npm install

Set Up Environment Variables

Run the App:
npm start

The app will be available at http://localhost:3000.


📖 Usage

Sign Up / Sign In:

Navigate to the Sign-Up page to create an account or Sign-In page to log in.
Firebase Authentication ensures secure user sessions.


Browse Movies:

Use the search bar to find movies by title.
Browse movie details, including posters, ratings, and descriptions fetched from the OMDB API.


Watch Trailers:

Click on a movie to view its trailer, powered by the YouTube API.
Enjoy a seamless video playback experience.


Responsive Experience:

Access the app on any device—desktop, tablet, or mobile—for a consistent Netflix-like experience.


🧠 How It Works

State Management with useReducer:

The app uses useReducer to manage global state, such as user authentication status, movie data, and search results.
Actions like FETCH_MOVIES, SET_USER, and PLAY_TRAILER ensure predictable state updates.


API Integration with useEffect:

useEffect handles asynchronous API calls to the OMDB API for movie data and the YouTube API for trailers.
Efficiently manages side effects like fetching data on component mount or search input changes.


Firebase Authentication:

Securely handles user sign-up, sign-in, and logout using Firebase’s authentication service.
Stores user sessions for a seamless experience across page reloads.


Bootstrap for Styling:

Leverages Bootstrap’s grid system, components, and utilities for a responsive, Netflix-inspired UI.
Custom CSS enhances the visual appeal to match Netflix’s dark theme.


🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.


📬 Contact
Have questions or suggestions? Reach out at rahul.devworks@gmail.com or open an issue on GitHub.
Enjoy your Netflix Clone App! 🍿