import './EvaluationResults.css';

export default function EvaluationResults({ results, onReset }) {
  if (!results) return null;

  const { sectionResults, overallBandScore, generalFeedback } = results;

  const renderSection = (title, section) => {
    if (!section) return null;

    return (
      <div className="result-section" key={title}>
        <div className="section-header">
          <h3>{title}</h3>
          {section.bandScore && (
            <span className="band-score">Band {section.bandScore}</span>
          )}
        </div>
        
        {section.taskResponsePersonalizedFeedback && (
          <div className="feedback-box">
            {section.taskResponsePersonalizedFeedback.notes && (
              <div className="feedback-item">
                <strong>Notes:</strong>
                <p>{section.taskResponsePersonalizedFeedback.notes}</p>
              </div>
            )}
            
            {section.taskResponsePersonalizedFeedback.strengths?.length > 0 && (
              <div className="feedback-item">
                <strong>Strengths:</strong>
                <ul>
                  {section.taskResponsePersonalizedFeedback.strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {section.taskResponsePersonalizedFeedback.areasForImprovement?.length > 0 && (
              <div className="feedback-item">
                <strong>Areas for Improvement:</strong>
                <ul>
                  {section.taskResponsePersonalizedFeedback.areasForImprovement.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="evaluation-results">
      <div className="results-header">
        <h2>Evaluation Results</h2>
        <div className="overall-score">
          <span className="score-label">Overall Band Score</span>
          <span className="score-value">{overallBandScore}</span>
        </div>
      </div>

      {sectionResults?.taskResponse && renderSection('Task Response', sectionResults.taskResponse)}
      {sectionResults?.coherenceAndCohesion && renderSection('Coherence and Cohesion', sectionResults.coherenceAndCohesion)}
      {sectionResults?.lexicalResource && renderSection('Lexical Resource', sectionResults.lexicalResource)}
      {sectionResults?.grammaticalRangeAndAccuracy && renderSection('Grammatical Range and Accuracy', sectionResults.grammaticalRangeAndAccuracy)}

      {generalFeedback && (
        <div className="general-feedback">
          <h3>General Feedback</h3>
          {generalFeedback.summary && (
            <div className="feedback-summary">
              <p>{generalFeedback.summary}</p>
            </div>
          )}
          {generalFeedback.keyRecommendations?.length > 0 && (
            <div className="recommendations">
              <strong>Key Recommendations:</strong>
              <ul>
                {generalFeedback.keyRecommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="results-actions">
        <button onClick={onReset} className="btn btn-secondary">
          Start New Question
        </button>
      </div>
    </div>
  );
}

