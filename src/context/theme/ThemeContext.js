import { createContext, useContext } from "react";

export const ThemeContext = createContext();

export default function useThemeMode() {
    return useContext(ThemeContext)
}
