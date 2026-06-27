import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

export const THEMES = {
    light: {
        id: "light", name: "Light", dark: false,
        sidebar:          "linear-gradient(180deg, var(--p800) 0%, var(--p600) 50%, var(--p400) 100%)",
        sidebarSolid:     "var(--p600)",
        accent:           "var(--p600)",
        accentHover:      "var(--p700)",
        accentLight:      "var(--p400)",
        accentBg:         "var(--p100)",
        accentBorder:     "var(--p200)",
        accentSoft:       "var(--p50)",
        accentGlow:       "rgba(8,145,178,.18)",
        navActive:        "rgba(255,255,255,0.2)",
        navActiveText:    "#ffffff",
        navText:          "rgba(255,255,255,0.6)",
        navHover:         "rgba(255,255,255,0.1)",
        brandGrad:        "linear-gradient(135deg,var(--p600),var(--p400))",
        avatarGrad:       "linear-gradient(135deg,var(--p600),#38BDF8)",
        heroGrad:         "linear-gradient(135deg,var(--p800) 0%,var(--p600) 50%,var(--p400) 100%)",
        pageBg:           "var(--p50)",
        cardBg:           "rgba(255,255,255,0.8)",
        cardBorder:       "rgba(255,255,255,0.9)",
        cardBorderHover:  "#ffffff",
        cardShadow:       "var(--shadow-cyan-sm)",
        cardShadowHover:  "var(--shadow-cyan-md)",
        topbarBg:         "rgba(255,255,255,.65)",
        topbarBorder:     "rgba(255,255,255,.6)",
        topbarShadow:     "0 1px 24px rgba(8,145,178,.08)",
        textPrimary:      "var(--n900)",
        textSecondary:    "var(--p800)",
        textMuted:        "var(--n500)",
        textFaint:        "var(--n400)",
        inputBg:          "#ffffff",
        inputBorder:      "var(--p200)",
        inputFocus:       "var(--p600)",
        inputShadow:      "0 0 0 3px rgba(8,145,178,.12)",
        divider:          "rgba(8,145,178,.08)",
        skeletonBase:     "var(--p100)",
        skeletonShimmer:  "var(--p200)",
    },
};

export function ThemeProvider({ children }) {
    const [themeId, setThemeId] = useState(() => {
        const s = localStorage.getItem("uc_theme");
        return (s === "light" || s === "dark") ? s : "light";
    });

    const theme     = THEMES[themeId] || THEMES.light;
    const setTheme  = (id) => {
        if (id !== "light" && id !== "dark") return;
        setThemeId(id);
        localStorage.setItem("uc_theme", id);
    };
    const toggleTheme = () => setTheme(theme.dark ? "light" : "dark");

    useEffect(() => {
        document.body.style.background = theme.pageBg;
        document.documentElement.style.setProperty("--accent",   theme.accent);
        document.documentElement.style.setProperty("--page-bg",  theme.pageBg);
        document.documentElement.style.setProperty("--pageBg",   theme.pageBg);
        document.documentElement.style.setProperty("--sidebar",  theme.sidebar);
        document.documentElement.style.setProperty("--card-bg",  theme.cardBg);
        document.documentElement.setAttribute("data-theme", themeId);
    }, [theme, themeId]);}


