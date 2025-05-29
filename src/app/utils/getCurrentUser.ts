// src/app/utils/getCurrentUser.ts
// Utility to get the current user from localStorage (for SPA role protection)
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    // You may want to decode the JWT here if you store user info in it
    // For now, just return a dummy user object for demonstration
    const user = JSON.parse(atob(token.split('.')[1])); // JWT payload
    return user;
  } catch {
    return null;
  }
}
