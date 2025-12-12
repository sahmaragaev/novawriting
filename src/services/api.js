import { API_CONFIG } from '../config';

async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': API_CONFIG.apiKey,
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function checkHealth() {
  const url = `${API_CONFIG.baseURL}/health`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
}

/**
 * Generate a writing question
 * @param {Object} params - Question generation parameters
 * @param {string} params.test_type - Required: "task2"
 * @param {string} [params.task_type] - Optional: "opinion" | "advantage_disadvantage" | "problem_solution" | "discuss_both_views"
 * @param {string[]} [params.include_topics] - Optional: array of topics to include
 * @param {string[]} [params.exclude_topics] - Optional: array of topics to exclude
 */
export async function generateQuestion(params) {
  const body = {
    test_type: params.test_type || 'task2',
    ...(params.task_type && { task_type: params.task_type }),
    ...(params.include_topics && { include_topics: params.include_topics }),
    ...(params.exclude_topics && { exclude_topics: params.exclude_topics }),
  };

  return apiRequest('/v1/writing/generate-question', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * Evaluate a writing answer
 * @param {Object} params - Evaluation parameters
 * @param {string} params.question - The question prompt
 * @param {string} params.answer - The user's essay answer
 * @param {number} params.wordCount - Word count of the answer
 * @param {string} params.task_type - Task type (e.g., "opinion")
 */
export async function evaluateAnswer(params) {
  const body = {
    category: 'writing',
    test_type: 'task2',
    task_type: params.task_type,
    data: {
      question: params.question,
      answer: params.answer,
      wordCount: params.wordCount,
    },
  };

  return apiRequest('/v1/writing/evaluate', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

