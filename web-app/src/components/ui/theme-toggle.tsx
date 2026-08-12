"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative text-slate-500 dark:text-slate-400 dark:text-slate-500 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] dark:hover:bg-slate-800 transition-colors w-9 h-9 flex items-center justify-center">
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative text-slate-500 dark:text-slate-400 dark:text-slate-500 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] dark:hover:bg-slate-800 dark:text-slate-400 dark:text-slate-500 dark:hover:text-slate-100 transition-colors w-9 h-9 flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
