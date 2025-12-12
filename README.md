# AI Integration (OpenAI API)

A simple web + Node.js project that sends a question from the browser to a backend endpoint and returns an AI-generated answer using the OpenAI API.

## Features
- Simple HTML frontend
- Express backend
- POST `/ask` endpoint
- API key stored safely via `.env` (not committed to Git)

## Tech Stack
- Node.js
- Express
- OpenAI SDK
- dotenv

## Project Structure
.
├── server.js
├── index.html
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md

## Setup

### 1) Install dependencies
```bash
npm install


2) Create .env file (DO NOT COMMIT)
Create a file named .env in the root folder:
OPENAI_API_KEY=your_real_key_here ( It must start with SK-....) 


3) Run the server
node server.js
Open: http://localhost:3000

API
POST /ask
Request body:
{ "question": "Write a short joke" }
Response:
{ "answer": "..." }