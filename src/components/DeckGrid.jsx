import './DeckGrid.css';
import DeckCard from './DeckCard';

export default function DeckGrid({ decks, onStudy, onEdit, onDelete }) {
    return (
        <div className="deck-grid">
            {decks.map((deck, index) => (
                <DeckCard
                    key={deck._id}
                    deck={deck}
                    index={index}
                    onStudy={onStudy}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
