/* =============================================================================
   API Client
   -----------------------------------------------------------------------------
   Centralized helper for all HTTP requests.
   Keeps the base URL in one place and handles response validation.
============================================================================= */

const BASE_URL = "https://dummyjson.com";

export async function api(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API Error (${response.status})`);
  }

  return response.json();
}
