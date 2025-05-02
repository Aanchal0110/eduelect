import axios from 'axios';

// Define API endpoints based on environment
const API_ENDPOINTS = {
  COURSES: process.env.NODE_ENV === 'production' 
    ? 'https://ansheeka.app.n8n.cloud/webhook/15e4d662-3f98-48d0-9f50-68838769ecac/chat'
    : '/api/courses',
  PREFERENCES: process.env.NODE_ENV === 'production'
    ? 'https://ansheeka.app.n8n.cloud/webhook/250eb06b-049f-4d0b-a299-1af238292432/chat'
    : '/api/preferences'
};

// Use the preferences endpoint for chat
const chatUrl = API_ENDPOINTS.PREFERENCES;

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

export const sendMessage = async (message: string): Promise<string> => {
  try {
    console.log('Sending message to chat endpoint:', { message });
    
    const response = await axios({
      method: 'post',
      url: chatUrl,
      data: {
        input: message,
        type: "chat",
        context: "course_preferences",
        format: "text"
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': window.location.origin,
        'Access-Control-Allow-Origin': '*'
      },
      timeout: 60000,
      timeoutErrorMessage: 'Request timed out. Please try again.'
    });

    console.log('Chat response:', response.data);

    // Handle different response formats
    if (response.status === 200) {
      // If the response is a string, try to parse it as JSON
      if (typeof response.data === 'string') {
        try {
          const parsed = JSON.parse(response.data);
          if (parsed.output) {
            return parsed.output.replace(/\\n/g, '\n');
          }
          return response.data;
        } catch {
          // If parsing fails, return the string as is
          return response.data;
        }
      }

      // If the response is an object
      if (typeof response.data === 'object') {
        // Try to find the response in various fields
        const possibleFields = ['output', 'response', 'message', 'text', 'content', 'answer', 'result'];
        for (const field of possibleFields) {
          if (response.data[field]) {
            const text = response.data[field];
            return typeof text === 'string' ? text.replace(/\\n/g, '\n') : JSON.stringify(text);
          }
        }

        // If no specific field found but we have data, stringify it
        return JSON.stringify(response.data);
      }
    }

    throw new Error('Unexpected response format from chat service');
  } catch (error) {
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      error: error
    });
    
    if (axios.isAxiosError(error)) {
      console.error('Response details:', {
        data: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        config: error.config
      });

      if (error.code === 'ECONNABORTED') {
        throw new Error('The request timed out. Please try again.');
      }

      switch (error.response?.status) {
        case 404:
          throw new Error('Chat service endpoint not found. Please check the URL configuration.');
        case 403:
          throw new Error('Access to chat service denied. Please check your permissions.');
        case 429:
          throw new Error('Too many requests to chat service. Please try again later.');
        case 500:
          throw new Error('Chat service encountered an error. Please try again later.');
        default:
          throw new Error('Failed to communicate with the AI assistant. Please try again.');
      }
    }
    
    throw new Error('Network error. Please check your internet connection and try again.');
  }
}; 