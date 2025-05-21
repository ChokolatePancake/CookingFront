import React from "react"

// Returns the value of the environment variable
// with the given name, or null if it doesn't exist.
const getEnvVar = (search) => {
  // CRA/Vite automatically loads .env.local > .env
  // For React: variables must start with REACT_APP_
  if (process.env[search]) {
    return process.env[search];
  }
  // Add support for variables without the prefix (e.g., BACKEND_URL)
  if (process.env[`REACT_APP_${search}`]) {
    return process.env[`REACT_APP_${search}`];
  }
  return null;
}

export default getEnvVar;
