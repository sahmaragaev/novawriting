# NovaWriting - IELTS Writing Task 2 Practice App

A modern React application for practicing IELTS Writing Task 2 with AI-powered question generation and evaluation.

## Features

- **Question Generation**: Generate IELTS Writing Task 2 questions with customizable task types and topics
- **Answer Writing**: Write and edit your essay answers with real-time word count
- **AI Evaluation**: Get detailed band scores and personalized feedback on your writing

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

The app expects the backend API to be running at `http://localhost:8081`. You can change this in `src/config.js` if needed.

## Usage

1. **Generate a Question**: 
   - Select an optional task type (Opinion, Advantage/Disadvantage, etc.)
   - Optionally specify topics to include or exclude
   - Click "Generate Question"

2. **Write Your Answer**:
   - Read the question and statement
   - Write your essay in the text area
   - Monitor your word count (minimum 50 words required)
   - Click "Submit for Evaluation"

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
- Vite
- Modern CSS with gradients and animations
