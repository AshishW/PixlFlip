import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import ProfileDropdown from './ProfileDropdown';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { FiUser } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const openAuthModal = useUiStore((s) => s.openAuthModal);
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="navbar glass">
            <div className="navbar-brand">
                <HiOutlineSparkles className="brand-icon" />
                <span className="brand-text">PixlFlip</span>
            </div>

            <div className="navbar-actions">
                {token ? (
                    <>
                        <div className="credits-badge">
                            <span className="credits-coin">🪙</span>
                            <span className="credits-count">{user?.credits ?? 0}</span>
                        </div>

                        <div className="profile-wrapper" ref={profileRef}>
                            <button
                                className="profile-btn"
                                onClick={() => setShowProfile(!showProfile)}
                                aria-label="Profile menu"
                            >
                                <FiUser />
                            </button>
                            {showProfile && (
                                <ProfileDropdown onClose={() => setShowProfile(false)} />
                            )}
                        </div>
                    </>
                ) : (
                    <button className="nav-login-btn" onClick={() => openAuthModal('login')}>
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}
