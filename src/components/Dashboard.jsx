import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useFlashcardStore } from '../store/flashcardStore';
import { useUiStore } from '../store/uiStore';
import TopicInput from './TopicInput';
import DeckGrid from './DeckGrid';
import EmptyState from './EmptyState';
import DeckEditor from './DeckEditor';
import Loader from './Loader';
import toast from 'react-hot-toast';
import './Dashboard.css';

export default function Dashboard() {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const { decks, fetchDecks, deleteDeck, loading } = useFlashcardStore();
    const { editDeckId, openDeckEditor, closeDeckEditor } = useUiStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetchDecks();
        }
    }, [token, fetchDecks]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    const handleStudy = (deckId) => {
        navigate(`/study/${deckId}`);
    };

    const handleEdit = (deckId) => {
        openDeckEditor(deckId);
    };

    const handleDelete = async (deckId) => {
        try {
            await deleteDeck(deckId);
            toast.success('Deck deleted');
        } catch {
            toast.error('Failed to delete deck');
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-hero">
                {token ? (
                    <h1 className="dashboard-greeting">
                        {getGreeting()},{' '}
                        <span className="gradient-text">{user?.name?.split(' ')[0] || 'Learner'}</span>
                    </h1>
                ) : (
                    <h1 className="dashboard-greeting">
                        Welcome to <span className="gradient-text">PixlFlip</span>
                    </h1>
                )}
                <p className="dashboard-subtitle">
                    Generate AI-powered flashcards for any topic — study smarter, not harder.
                </p>
            </div>

            <TopicInput />

            {token && (
                <div className="dashboard-decks-section">
                    <div className="decks-header">
                        <h2 className="decks-section-title">My Decks</h2>
                        <span className="decks-count">{decks.length} deck{decks.length !== 1 ? 's' : ''}</span>
                    </div>

                    {loading && decks.length === 0 ? (
                        <Loader text="Loading your decks..." />
                    ) : decks.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <DeckGrid
                            decks={decks}
                            onStudy={handleStudy}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            )}

            {editDeckId && (
                <DeckEditor
                    deckId={editDeckId}
                    onClose={closeDeckEditor}
                />
            )}
        </div>
    );
}
