import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);
