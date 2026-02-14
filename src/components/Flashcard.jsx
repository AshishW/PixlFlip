import './Flashcard.css';

export default function Flashcard({ card, isFlipped, onFlip }) {
    return (
        <div className="flashcard-container" onClick={onFlip}>
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
                <div className="flashcard-face flashcard-front">
                    <span className="flashcard-label">Question</span>
                    <p className="flashcard-text">{card.question}</p>
                    <span className="flashcard-hint">Click or press Space to flip</span>
                </div>
                <div className="flashcard-face flashcard-back">
                    <span className="flashcard-label">Answer</span>
                    <p className="flashcard-text">{card.answer}</p>
                    <span className="flashcard-hint">Click or press Space to flip back</span>
                </div>
            </div>
        </div>
    );
}
