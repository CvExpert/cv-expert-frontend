// Centralized Auth Utilities
import api from '@/functions/api';

export function clearAuth() {
  localStorage.removeItem('authState');
}

export async function validateAndHydrateAuth(setState: (s: any) => void) {
  try {
    const response = await api.get('/user/checkauth');
    if (response && response.status === 200 && response.data.user) {
      setState({
        isSignedIn: true,
        userID: response.data.user.userID,
        email: response.data.user.email,
        name: response.data.user.name,
      });
      localStorage.setItem('authState', JSON.stringify({
        isSignedIn: true,
        userID: response.data.user.userID,
        email: response.data.user.email,
        name: response.data.user.name,
      }));
      return true;
    }
  } catch (e) {}
  clearAuth();
  setState({ isSignedIn: false, userID: '', email: '', name: '' });
  return false;
}
