// src/services/backendUrl.js

const getBackendUrl = () => {
  // CRA/Vite/Craco автоматично підтягує .env.local > .env
  // BACKEND_URL має бути прописаний як REACT_APP_BACKEND_URL для CRA/Vite, але Craco дозволяє і так
  return process.env.BACKEND_URL || process.env.BACKEND_URL || '';
};

export default getBackendUrl;
