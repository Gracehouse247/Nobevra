"use client";

import * as React from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  resolvedTheme: "dark" | "light" | undefined;
  themes: string[];
  systemTheme: "dark" | "light" | undefined;
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  resolvedTheme: "light",
  themes: ["light", "dark", "system"],
  systemTheme: "light",
});

export interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: "class" | "data-theme" | string;
  defaultTheme?: Theme | string;
  enableSystem?: boolean;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
  forcedTheme?: string;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = true,
  storageKey = "theme",
  disableTransitionOnChange = false,
  forcedTheme,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<string>(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      return localStorage.getItem(storageKey) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const [systemTheme, setSystemTheme] = React.useState<"dark" | "light">("light");

  const resolvedTheme: "dark" | "light" = React.useMemo(() => {
    if (forcedTheme) return forcedTheme === "dark" ? "dark" : "light";
    if (theme === "system") return systemTheme;
    return theme === "dark" ? "dark" : "light";
  }, [theme, systemTheme, forcedTheme]);

  // Handle system color scheme detection
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    updateSystemTheme();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateSystemTheme);
      return () => mediaQuery.removeEventListener("change", updateSystemTheme);
    } else {
      mediaQuery.addListener(updateSystemTheme);
      return () => mediaQuery.removeListener(updateSystemTheme);
    }
  }, []);

  // Apply theme to DOM
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    if (disableTransitionOnChange) {
      const css = document.createElement("style");
      css.appendChild(
        document.createTextNode(
          "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
        )
      );
      document.head.appendChild(css);

      const targetTheme = resolvedTheme;
      if (attribute === "class") {
        root.classList.remove("light", "dark");
        root.classList.add(targetTheme);
      } else {
        root.setAttribute(attribute, targetTheme);
      }

      // Force style recalculation then remove transition blocker
      window.getComputedStyle(document.body);
      setTimeout(() => {
        if (document.head.contains(css)) {
          document.head.removeChild(css);
        }
      }, 1);
    } else {
      const targetTheme = resolvedTheme;
      if (attribute === "class") {
        root.classList.remove("light", "dark");
        root.classList.add(targetTheme);
      } else {
        root.setAttribute(attribute, targetTheme);
      }
    }
  }, [resolvedTheme, attribute, disableTransitionOnChange]);

  const setTheme = React.useCallback(
    (newTheme: string) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // Ignore write errors (e.g. private browsing storage limits)
      }
    },
    [storageKey]
  );

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      themes: enableSystem ? ["light", "dark", "system"] : ["light", "dark"],
      systemTheme,
    }),
    [theme, setTheme, resolvedTheme, enableSystem, systemTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
