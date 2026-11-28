import { useState } from "react";
import './Settings.css'; 

export default function Settings() {
    const [isOpen, setIsOpen] = useState(false);

    const togglemenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="settings-wrapper">
            <button
                className="settings-button"
                onClick={togglemenu}
                aria-expanded={isOpen}
            >
                Settings
            </button>

            {isOpen && (
                <div className="settings-dropdown">
                    {/* Placeholder */}
                    <p className="settings-placeholder">Settings...</p>
                </div>
            )}
        </div>
    );
}