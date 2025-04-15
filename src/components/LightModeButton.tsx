'use client';

import { useTheme } from "@/hooks/useTheme";
import { FaRegSun, FaCloudMoon } from "react-icons/fa";

export function LightModeButton() {

    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>
            {theme === 'light' ? 
                <FaRegSun color="var(--logo-color)" style={{width: '24px', height: '24px'}}/> : 
                <FaCloudMoon color="var(--logo-color)" style={{width: '24px', height: '24px'}}/> 
            }
        </button>
    )
}