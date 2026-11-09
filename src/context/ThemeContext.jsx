import { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('nord-theme', 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggle() {
    setTheme(previous => previous === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
