import { FiPlay, FiEdit3, FiTrash2 } from 'react-icons/fi';
import './DeckCard.css';

const DECK_COLORS = [
    'var(--coral)',
    'var(--emerald)',
    'var(--amber)',
    'var(--teal)',
    'var(--rose)',
];

export default function DeckCard({ deck, index, onStudy, onEdit, onDelete }) {
    const accentColor = DECK_COLORS[index % DECK_COLORS.length];
    const cardCount = deck.cards?.length || 0;

    return (
        <div
            className="deck-card"
            style={{ '--accent': accentColor, animationDelay: `${index * 80}ms` }}
        >
            <div className="deck-accent-bar" />

            <div className="deck-card-body">
                <div className="deck-card-header">
                    <h4 className="deck-card-title">{deck.title}</h4>
                    <span className="deck-card-count">{cardCount} cards</span>
                </div>

                <div className="deck-card-actions">
                    <button
                        className="deck-action-btn study-btn"
                        onClick={() => onStudy(deck._id)}
                        title="Study"
                    >
                        <FiPlay size={15} />
                        <span>Study</span>
                    </button>
                    <button
                        className="deck-action-btn edit-btn"
                        onClick={() => onEdit(deck._id)}
                        title="Edit"
                    >
                        <FiEdit3 size={14} />
                    </button>
                    <button
                        className="deck-action-btn delete-btn"
                        onClick={() => onDelete(deck._id)}
                        title="Delete"
                    >
                        <FiTrash2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
