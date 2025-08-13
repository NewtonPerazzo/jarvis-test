export const TOKEN_KEY = "authToken";
export const TOKEN_EXP_KEY = "authTokenExpiration";

const validEmail = process.env.REACT_APP_LOGIN_EMAIL;
const validPassword = process.env.REACT_APP_LOGIN_PASS;

export const fetchLogin = (email: string, password: string): boolean => {
  if (email === validEmail && password === validPassword) {
    const token = generateToken();
    const expiration = getTokenExpiration(); // 1 hour

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXP_KEY, expiration.toString());
    return true;
  }
  return false;
}

export const fetchLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXP_KEY);
}

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiration = localStorage.getItem(TOKEN_EXP_KEY);

  if (!token || !expiration) return false;

  const now = Date.now();
  if (now > parseInt(expiration, 10)) {
    fetchLogout();
    return false;
  }
  return true;
}

const generateToken = (): string => Math.random().toString(36).substring(2) + Date.now().toString(36);

const getTokenExpiration = (hours: number = 3): number => Date.now() + hours * 60 * 60 * 1000; // horas -> ms
