export const API_CONFIG = {
  baseURL: import.meta.env.DEV ? '/api' : 'http://localhost:8081',
  apiKey: import.meta.env.VITE_API_KEY || 'your-api-key-here'
};

