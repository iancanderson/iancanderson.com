import { useEffect, useState } from "react";

const THEMES = [
  { id: "theme-brutal-1", label: "one" },
  { id: "theme-brutal-2", label: "two" },
  { id: "theme-brutal-3", label: "three" },
  { id: "theme-brutal-dark", label: "dark" },
] as const;

const THEME_CLASSES = THEMES.map((t) => t.id);
const STORAGE_KEY = "theme";

function applyTheme(themeId: string) {
  if (typeof document === "undefined") return;
  const body = document.body;
  THEME_CLASSES.forEach((c) => body.classList.remove(c));
  if (themeId) body.classList.add(themeId);
}

export default function ThemePicker() {
  const [theme, setTheme] = useState<string>(THEMES[1].id); // default to "two"

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const initial = saved && THEME_CLASSES.includes(saved) ? saved : THEMES[1].id;
      setTheme(initial);
      applyTheme(initial);
      if (!saved) localStorage.setItem(STORAGE_KEY, initial);
    } catch {
      // fallback already set via state
      applyTheme(THEMES[1].id);
    }
  }, []);

  function chooseTheme(id: string) {
    setTheme(id);
    applyTheme(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  }

  return (
    <div className="text-sm text-gray-700">
      <span className="mr-2 font-semibold">theme:</span>
      {THEMES.map((t, idx) => (
        <span key={t.id}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              chooseTheme(t.id);
            }}
            className={theme === t.id ? "font-extrabold" : "hover:underline"}
          >
            {t.label}
          </a>
          {idx < THEMES.length - 1 ? <span className="mx-2">|</span> : null}
        </span>
      ))}
    </div>
  );
}
