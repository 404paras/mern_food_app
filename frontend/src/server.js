// API Server URL - Use environment variable in production
export const server = process.env.REACT_APP_API_URL || `https://mern-food-app-laxt.onrender.com/`;

// For local development, uncomment the line below:
// export const server = `http://localhost:4000/`;

// Razorpay Key ID - Should be set via environment variable
export const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID || '';

// Validate that required environment variables are set
if (!RAZORPAY_KEY_ID && process.env.NODE_ENV === 'production') {
  console.warn('Warning: REACT_APP_RAZORPAY_KEY_ID is not set in environment variables');
}