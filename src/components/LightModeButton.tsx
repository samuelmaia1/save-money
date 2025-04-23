'use client';

import { useTheme } from "@/hooks/useTheme";
import { FaRegSun, FaCloudMoon } from "react-icons/fa";

export function LightModeButton() {

    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>
            {theme === 'light' ? 
                <FaRegSun color="var(--logo-color)" size={24}/> : 
                <FaCloudMoon color="var(--logo-color)" size={24}/> 
            }
        </button>
    )
}