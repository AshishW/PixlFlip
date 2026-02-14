import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import Modal from './Modal';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import './AuthModal.css';

export default function AuthModal() {
    const { authModalOpen, authModalMode, closeAuthModal, setAuthModalMode } = useUiStore();
    const { loginAsync, registerAsync, loading, error, clearError } = useAuthStore();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLogin = authModalMode === 'login';

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        clearError();
    };

    const switchMode = () => {
        setAuthModalMode(isLogin ? 'register' : 'login');
        resetForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await loginAsync(email, password);
                toast.success('Welcome back! 🎉');
            } else {
                await registerAsync(name, email, password);
                toast.success('Account created! 🚀');
            }
            resetForm();
            closeAuthModal();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleClose = () => {
        resetForm();
        closeAuthModal();
    };

    return (
        <Modal isOpen={authModalOpen} onClose={handleClose}>
            <div className="auth-modal">
                <div className="auth-header">
                    <h2 className="auth-title">
                        {isLogin ? 'Welcome Back' : 'Join PixlFlip'}
                    </h2>
                    <p className="auth-subtitle">
                        {isLogin
                            ? 'Sign in to access your flashcards'
                            : 'Create an account to start learning'}
                    </p>
                </div>

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => { setAuthModalMode('login'); resetForm(); }}
                    >
                        Sign In
                    </button>
                    <button
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => { setAuthModalMode('register'); resetForm(); }}
                    >
                        Register
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <FiUser className="input-icon" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoComplete="name"
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <FiMail className="input-icon" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="input-group">
                        <FiLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                        />
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="btn-loader"></span>
                        ) : (
                            <>
                                {isLogin ? 'Sign In' : 'Create Account'}
                                <FiArrowRight />
                            </>
                        )}
                    </button>
                </form>

                <p className="auth-switch">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button className="auth-switch-btn" onClick={switchMode}>
                        {isLogin ? 'Register' : 'Sign In'}
                    </button>
                </p>
            </div>
        </Modal>
    );
}
