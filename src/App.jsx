import { useState, useEffect } from 'react';
import QuestionGenerator from './components/QuestionGenerator';
import AnswerWriter from './components/AnswerWriter';
import EvaluationResults from './components/EvaluationResults';
import { checkHealth } from './services/api';
import './App.css';

function App() {
  const [step, setStep] = useState('generate'); // 'generate', 'write', 'results'
  const [questionData, setQuestionData] = useState(null);
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    checkHealth()
      .then(() => setApiStatus('connected'))
      .catch(() => setApiStatus('disconnected'));
  }, []);

  const handleQuestionGenerated = (data) => {
    setQuestionData(data);
    setStep('write');
    setEvaluationResults(null);
  };

  const handleEvaluationComplete = (results) => {
    setEvaluationResults(results);
    setStep('results');
  };

  const handleReset = () => {
    setStep('generate');
    setQuestionData(null);
    setEvaluationResults(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>NovaWriting</h1>
        <p className="subtitle">IELTS Writing Task 2 Practice & Evaluation</p>
        <div className={`api-status ${apiStatus}`}>
          {apiStatus === 'checking' && 'Checking API...'}
          {apiStatus === 'connected' && '✓ API Connected'}
          {apiStatus === 'disconnected' && '✗ API Disconnected'}
        </div>
      </header>

      <main className="app-main">
        {step === 'generate' && (
          <QuestionGenerator onQuestionGenerated={handleQuestionGenerated} />
        )}

        {step === 'write' && questionData && (
          <AnswerWriter
            question={questionData.question}
            statement={questionData.statement}
            taskType={questionData.taskType}
            onEvaluationComplete={handleEvaluationComplete}
          />
        )}

        {step === 'results' && evaluationResults && (
          <EvaluationResults
            results={evaluationResults}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Practice makes perfect. Keep writing!</p>
      </footer>
    </div>
  );
}

export default App;
