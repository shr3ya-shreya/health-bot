# Friendly Chatbot - Gemini Pro Powered

A friendly, supportive chatbot backend using Google Gemini Pro API and a React frontend. The chatbot acts like a bestie, chatting casually about health, emotions, and general knowledge with Gen-Z slang and empathetic vibes.

---

## Project Structure

- **backend/** — Flask API server that communicates with Google Gemini Pro.
- **frontend/** — React app that interacts with the backend API.

---

## Features

- Chatbot with friendly, casual tone and Gen Z slang.
- Handles health-related queries, emotional support, and general questions.
- Provides Spotify playlists based on user mood.
- Cross-Origin Resource Sharing (CORS) enabled for frontend-backend communication.

---

## Getting Started

### Prerequisites

- Python 3.x
- Node.js & npm/yarn
- Google Gemini Pro API key

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend

Install dependencies:

```bash
pip install -r requirements.txt
```
Replace the API key in your Flask app:
```bash
genai.configure(api_key="YOUR_GEMINI_PRO_API_KEY")
```
Run the Flask server
``` bash
python app.py
```
The backend will run on http://localhost:8000.

## Frontend Setup
Navigate to the frontend folder:

```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start the React development server:

```bash
npm start
```
The frontend will run on http://localhost:3000 and proxy API requests to the backend.

## Usage
Open http://localhost:3000 in your browser.

Chat with the friendly bot.

The frontend sends user messages to the Flask backend at /friendly_chat.

The backend processes the message with Gemini Pro and returns a response.

## Notes
This chatbot is not a substitute for professional medical advice. Always consult a healthcare professional if symptoms persist or worsen.
