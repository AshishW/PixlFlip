import { useAuthStore } from '../store/authStore';
import { FiLogOut, FiMail, FiUser } from 'react-icons/fi';
import './ProfileDropdown.css';

export default function ProfileDropdown({ onClose }) {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        onClose();
    };

    return (
        <div className="profile-dropdown glass">
            <div className="profile-info">
                <div className="profile-avatar">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="profile-details">
                    <span className="profile-name">{user?.name || 'User'}</span>
                    <span className="profile-email">
                        <FiMail size={12} />
                        {user?.email || ''}
                    </span>
                </div>
            </div>

            <div className="profile-divider" />

            <div className="profile-stats">
                <div className="stat-item">
                    <span className="stat-value">{user?.credits ?? 0}</span>
                    <span className="stat-label">Credits</span>
                </div>
            </div>

            <div className="profile-divider" />

            <button className="profile-logout-btn" onClick={handleLogout}>
                <FiLogOut size={16} />
                Sign Out
            </button>
        </div>
    );
}
