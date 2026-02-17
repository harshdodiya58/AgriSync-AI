'use client';

import { useTheme } from '@/context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <div className="theme-toggle-icon">
                {theme === 'dark' ? (
                    <FiSun className="w-5 h-5" />
                ) : (
                    <FiMoon className="w-5 h-5" />
                )}
            </div>
            <span className="theme-toggle-text">
                {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
        </button>
    );
}
