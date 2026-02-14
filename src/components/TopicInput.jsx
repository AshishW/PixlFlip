import { useState } from 'react';
import { useFlashcardStore } from '../store/flashcardStore';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import toast from 'react-hot-toast';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { FiZap } from 'react-icons/fi';
import './TopicInput.css';

export default function TopicInput() {
    const [topic, setTopic] = useState('');
    const [cardCount, setCardCount] = useState(5);
    const { generateCards, saveDeck, generating } = useFlashcardStore();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const openAuthModal = useUiStore((s) => s.openAuthModal);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!topic.trim()) return;

        if (!isAuthenticated()) {
            openAuthModal('login');
            toast.error('Please sign in to generate flashcards');
            return;
        }

        try {
            const data = await generateCards(topic.trim(), cardCount);
            if (data?.flashcards?.length) {
                await saveDeck(topic.trim(), data.flashcards);
                toast.success(`Created ${data.flashcards.length} flashcards! ✨`);
                setTopic('');
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="topic-section">
            <form className="topic-form" onSubmit={handleGenerate}>
                <div className="topic-input-wrapper">
                    <HiOutlineSparkles className="topic-sparkle-icon" />
                    <input
                        type="text"
                        className="topic-input"
                        placeholder="Enter any topic — AI will generate flashcards..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        disabled={generating}
                    />
                    <button
                        type="submit"
                        className="topic-generate-btn"
                        disabled={generating || !topic.trim()}
                    >
                        {generating ? (
                            <span className="generate-spinner"></span>
                        ) : (
                            <FiZap size={18} />
                        )}
                    </button>
                </div>

                <div className="card-count-control">
                    <label className="card-count-label">Cards: {cardCount}</label>
                    <input
                        type="range"
                        min="3"
                        max="15"
                        value={cardCount}
                        onChange={(e) => setCardCount(Number(e.target.value))}
                        className="card-count-slider"
                    />
                </div>
            </form>
        </div>
    );
}
