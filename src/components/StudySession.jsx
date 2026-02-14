import { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFlashcardStore } from '../store/flashcardStore';
import Flashcard from './Flashcard';
import ProgressBar from './ProgressBar';
import VictoryScreen from './VictoryScreen';
import { FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi';
import './StudySession.css';

export default function StudySession() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const {
        decks,
        currentCardIndex,
        studiedCards,
        isFlipped,
        startStudy,
        flipCard,
        nextCard,
        prevCard,
        endStudy,
    } = useFlashcardStore();

    const deck = decks.find((d) => d._id === deckId);
    const cards = deck?.cards || [];
    const currentCard = cards[currentCardIndex];
    const isComplete = studiedCards.length >= cards.length && cards.length > 0;

    useEffect(() => {
        if (deckId) {
            startStudy(deckId);
        }
        return () => endStudy();
    }, [deckId, startStudy, endStudy]);

    const handleKeyDown = useCallback(
        (e) => {
            switch (e.key) {
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    flipCard();
                    break;
                case 'ArrowRight':
                    nextCard();
                    break;
                case 'ArrowLeft':
                    prevCard();
                    break;
                case 'Escape':
                    navigate('/');
                    break;
            }
        },
        [flipCard, nextCard, prevCard, navigate]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    if (!deck) {
        return (
            <div className="study-error">
                <h2>Deck not found</h2>
                <button onClick={() => navigate('/')}>Go Back</button>
            </div>
        );
    }

    if (isComplete) {
        return (
            <VictoryScreen
                totalCards={cards.length}
                onBackToDashboard={() => navigate('/')}
            />
        );
    }

    return (
        <div className="study-session">
            <div className="study-header">
                <button className="study-exit-btn" onClick={() => navigate('/')}>
                    <FiX size={18} />
                </button>
                <div className="study-title-bar">
                    <h3 className="study-deck-title">{deck.title}</h3>
                </div>
            </div>

            <ProgressBar
                current={studiedCards.length}
                total={cards.length}
                label="Progress"
            />

            <div className="study-card-area">
                {currentCard && (
                    <Flashcard
                        card={currentCard}
                        isFlipped={isFlipped}
                        onFlip={flipCard}
                    />
                )}
            </div>

            <div className="study-controls">
                <button
                    className="study-nav-btn"
                    onClick={prevCard}
                    disabled={currentCardIndex === 0}
                >
                    <FiArrowLeft size={20} />
                    <span>Previous</span>
                </button>

                <span className="study-counter">
                    {currentCardIndex + 1} / {cards.length}
                </span>

                <button
                    className="study-nav-btn"
                    onClick={nextCard}
                    disabled={currentCardIndex >= cards.length - 1}
                >
                    <span>Next</span>
                    <FiArrowRight size={20} />
                </button>
            </div>

            <div className="study-hotkeys">
                <span><kbd>Space</kbd> Flip</span>
                <span><kbd>←</kbd><kbd>→</kbd> Navigate</span>
                <span><kbd>Esc</kbd> Exit</span>
            </div>
        </div>
    );
}
