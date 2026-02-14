import { useMemo } from 'react';
import { FiAward, FiArrowLeft } from 'react-icons/fi';
import './VictoryScreen.css';

export default function VictoryScreen({ totalCards, onBackToDashboard }) {
    const confettiPieces = useMemo(() => {
        const colors = ['#FF6B4A', '#10B981', '#F59E0B', '#FB7185', '#14B8A6', '#FBBF24'];
        return Array.from({ length: 40 }, (_, i) => ({
            id: i,
            color: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 3}s`,
            duration: `${2 + Math.random() * 3}s`,
            size: `${6 + Math.random() * 8}px`,
        }));
    }, []);

    return (
        <div className="victory-screen">
            <div className="confetti-container">
                {confettiPieces.map((piece) => (
                    <div
                        key={piece.id}
                        className="confetti-piece"
                        style={{
                            '--color': piece.color,
                            left: piece.left,
                            animationDelay: piece.delay,
                            animationDuration: piece.duration,
                            width: piece.size,
                            height: piece.size,
                        }}
                    />
                ))}
            </div>

            <div className="victory-content">
                <div className="trophy-wrapper">
                    <FiAward className="trophy-icon" />
                </div>

                <h1 className="victory-title">
                    <span className="gradient-text">Deck Complete!</span>
                </h1>

                <p className="victory-message">
                    Amazing! You studied all <strong>{totalCards}</strong> cards. Keep learning! 🚀
                </p>

                <div className="victory-stats">
                    <div className="victory-stat">
                        <span className="victory-stat-value">{totalCards}</span>
                        <span className="victory-stat-label">Cards Studied</span>
                    </div>
                    <div className="victory-stat">
                        <span className="victory-stat-value">100%</span>
                        <span className="victory-stat-label">Completion</span>
                    </div>
                </div>

                <button className="victory-btn" onClick={onBackToDashboard}>
                    <FiArrowLeft size={16} />
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}
