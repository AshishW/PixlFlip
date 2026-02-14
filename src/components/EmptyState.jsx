import { HiOutlineSparkles } from 'react-icons/hi2';
import './EmptyState.css';

export default function EmptyState() {
    return (
        <div className="empty-state">
            <div className="empty-icon-wrapper">
                <HiOutlineSparkles className="empty-icon" />
            </div>
            <h3 className="empty-title">No flashcard decks yet</h3>
            <p className="empty-description">
                Enter a topic above and let AI generate your first flashcard deck. It's like magic! ✨
            </p>
        </div>
    );
}
