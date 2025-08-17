Vibe-Watch Recommender 🍿
Project Overview
Vibe-Watch Recommender is a simplified movie recommendation system that suggests movies based on their similarity to a user's selection. This project serves as a foundational web application to demonstrate the integration of machine learning models with a Python backend and a dynamic frontend.

The system uses a content-based recommendation approach and includes a basic sentiment score to influence the final recommendations, giving you a movie suggestion that matches the "vibe" you're looking for.

Key Features ✨
Movie Search/Autocomplete: A user-friendly search bar provides real-time movie suggestions as you type.

Movie Recommendation: Get a list of movies similar to your selected choice.

Simplified Sentiment Analysis: Recommendations are influenced by a pre-calculated sentiment score associated with each movie, ensuring better suggestions.

User Interface: A simple, web-based interface for easy interaction.

Tech Stack 🛠️
Backend: Python (Flask)

Frontend: HTML, CSS, JavaScript (AJAX)

Machine Learning/Data: Scikit-learn, Pandas, NLTK (or similar)

Serialization: Pickle

Architecture 🗺️
The application follows a simplified Model-View-Controller (MVC) pattern:

Model: The core of the system is a serialized recommendation model (using Pickle) that handles the similarity calculations.

View: The user interface is built with HTML and styled with CSS.

Controller: The Flask backend acts as the controller, handling HTTP requests, processing user input, and interacting with the model to serve the right data to the frontend.

Getting Started 🚀
Prerequisites
Python 3.x

pip (Python package installer)

Installation
Clone the repository:

git clone https://github.com/your-username/vibe-watch-recommender.git
cd vibe-watch-recommender

Install the required Python libraries:

pip install Flask pandas scikit-learn

Ensure you have the movies.csv data file in the root directory. This file contains the pre-calculated sentiment scores and movie metadata.

How to Run
Start the Flask server from your terminal:

python app.py

Open your web browser and navigate to http://127.0.0.1:5000 to access the application.

Local Development 💻
Use your preferred IDE.

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - install with nvm

Follow these steps:

# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

Data 📂
The project uses a simplified movies.csv file. This dataset contains a limited number of movies with their titles, genres, actors, directors, and a pre-calculated sentiment score. This score serves as a placeholder for a more complex sentiment analysis model in future iterations.

Future Improvements 📈
This MVP is a starting point. Potential enhancements include:

Implementing a full, real-time sentiment analysis model using a library like NLTK or TextBlob to analyze user-submitted reviews.

Exploring more advanced recommendation algorithms, such as collaborative filtering based on user-item interaction data.

Improving the user interface and user experience with more modern design principles and features.
