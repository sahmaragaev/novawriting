# NovaWriting - IELTS Writing Task 2 Practice App

A clean, professional React application for practicing IELTS Writing Task 2 with AI-powered question generation and evaluation. Features an authentic IELTS-style interface with split-screen layout.

## Features

- **Question Generation**: Generate IELTS Writing Task 2 questions with customizable task types and topics
- **IELTS-Style Writing Interface**: Split-screen layout with question on the left and writing area on the right, matching the real IELTS test format
- **Real-time Word Count**: Monitor your word count as you write
- **AI Evaluation**: Get detailed band scores and personalized feedback on your writing across all IELTS criteria

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure API Key**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your API key:
     ```
     VITE_API_KEY=your-actual-api-key-here
     ```
   - Alternatively, you can edit `src/config.js` directly to set the API key

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - The app will be available at `http://localhost:5173` (or the port shown in the terminal)
   - Make sure your backend API is running at `http://localhost:8081`

## API Configuration

The app expects the backend API to be running at `http://localhost:8081`. 

- In development, API requests are proxied through Vite to avoid CORS issues (configured in `vite.config.js`)
- The API base URL can be changed in `src/config.js` if needed
- API authentication is handled via the `X-API-Key` header

## Usage

1. **Generate a Question**: 
   - Select an optional task type (Opinion, Advantage/Disadvantage, etc.)
   - Optionally specify topics to include or exclude
   - Click "Generate Question"

2. **Write Your Answer**:
   - Read the question and statement on the left panel
   - Write your essay in the text area on the right panel
   - Monitor your word count in real-time (minimum 50 words required for submission)
   - Click "Submit for Evaluation" when ready

3. **Review Results**:
   - View your overall band score
   - Read detailed feedback for each evaluation criterion
   - See strengths and areas for improvement
   - Click "Start New Question" to practice again

## Project Structure

```
src/
  ├── components/          # React components
  │   ├── QuestionGenerator.jsx
  │   ├── AnswerWriter.jsx
  │   └── EvaluationResults.jsx
  ├── services/           # API service functions
  │   └── api.js
  ├── config.js           # API configuration
  ├── App.jsx             # Main app component
  └── main.jsx            # App entry point
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Technologies Used

- React 19
- Vite (with proxy configuration for API requests)
- Clean, professional CSS design
- Responsive layout for mobile and desktop devices
