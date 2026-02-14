import { useState, useEffect } from 'react';
import { useFlashcardStore } from '../store/flashcardStore';
import Modal from './Modal';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import './DeckEditor.css';

export default function DeckEditor({ deckId, onClose }) {
    const { decks, updateDeck } = useFlashcardStore();
    const deck = decks.find((d) => d._id === deckId);

    const [title, setTitle] = useState('');
    const [cards, setCards] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (deck) {
            setTitle(deck.title || '');
            setCards(deck.cards?.map((c) => ({ ...c })) || []);
        }
    }, [deck]);

    const handleCardChange = (index, field, value) => {
        setCards((prev) =>
            prev.map((card, i) => (i === index ? { ...card, [field]: value } : card))
        );
    };

    const addCard = () => {
        setCards((prev) => [...prev, { question: '', answer: '' }]);
    };

    const removeCard = (index) => {
        if (cards.length <= 1) {
            toast.error('Deck must have at least one card');
            return;
        }
        setCards((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (!title.trim()) {
            toast.error('Please enter a deck title');
            return;
        }
        const validCards = cards.filter((c) => c.question.trim() && c.answer.trim());
        if (validCards.length === 0) {
            toast.error('Add at least one complete card');
            return;
        }

        setSaving(true);
        try {
            await updateDeck(deckId, { title: title.trim(), cards: validCards });
            toast.success('Deck updated! ✨');
            onClose();
        } catch {
            toast.error('Failed to update deck');
        } finally {
            setSaving(false);
        }
    };

    if (!deck) return null;

    return (
        <Modal isOpen={true} onClose={onClose} title="Edit Deck">
            <div className="deck-editor">
                <div className="editor-field">
                    <label className="editor-label">Deck Title</label>
                    <input
                        type="text"
                        className="editor-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter deck title..."
                    />
                </div>

                <div className="editor-cards">
                    <div className="editor-cards-header">
                        <span className="editor-cards-count">{cards.length} cards</span>
                        <button className="editor-add-btn" onClick={addCard}>
                            <FiPlus size={14} />
                            Add Card
                        </button>
                    </div>

                    {cards.map((card, index) => (
                        <div key={index} className="editor-card-item">
                            <div className="editor-card-number">{index + 1}</div>
                            <div className="editor-card-fields">
                                <textarea
                                    className="editor-textarea"
                                    value={card.question}
                                    onChange={(e) => handleCardChange(index, 'question', e.target.value)}
                                    placeholder="Question..."
                                    rows={2}
                                />
                                <textarea
                                    className="editor-textarea"
                                    value={card.answer}
                                    onChange={(e) => handleCardChange(index, 'answer', e.target.value)}
                                    placeholder="Answer..."
                                    rows={2}
                                />
                            </div>
                            <button
                                className="editor-remove-btn"
                                onClick={() => removeCard(index)}
                                title="Remove card"
                            >
                                <FiTrash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="editor-actions">
                    <button className="editor-cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="editor-save-btn"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
