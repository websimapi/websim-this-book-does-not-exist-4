import React from 'react';
import { useRoom } from '../context/RoomContext.js';
import { generateBookInfo, generateBookCover } from '../services/aiService.js';

export const BookForm = ({ onSuccess }) => {
    const { room } = useRoom();
    const [formData, setFormData] = React.useState({
        genre: 'fantasy',
        theme: '',
        setting: '',
        customPrompt: '',
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const genres = [
        'fantasy', 'science fiction', 'mystery', 'thriller', 
        'romance', 'historical fiction', 'horror', 'adventure',
        'dystopian', 'young adult', 'literary fiction', 'non-fiction'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Step 1: Generate book information with AI
            const bookInfo = await generateBookInfo(formData);
            
            // Step 2: Generate book cover image based on the info
            const coverUrl = await generateBookCover(bookInfo);
            
            // Step 3: Save the book to the database
            await room.collection('books').create({
                ...bookInfo,
                coverUrl,
                createdAt: new Date().toISOString(),
                prompt: {
                    genre: formData.genre,
                    theme: formData.theme,
                    setting: formData.setting,
                    customPrompt: formData.customPrompt
                }
            });

            // Reset form and redirect to gallery
            setFormData({
                genre: 'fantasy',
                theme: '',
                setting: '',
                customPrompt: '',
            });
            
            onSuccess();
        } catch (err) {
            console.error('Error creating book:', err);
            setError('Failed to create book. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="book-generator">
            <h2>Generate a New Book</h2>
            
            {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <select 
                        id="genre" 
                        name="genre" 
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    >
                        {genres.map(genre => (
                            <option key={genre} value={genre}>
                                {genre.charAt(0).toUpperCase() + genre.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="theme">Theme (optional)</label>
                    <input 
                        type="text" 
                        id="theme" 
                        name="theme" 
                        value={formData.theme}
                        onChange={handleChange}
                        placeholder="e.g., redemption, love, betrayal"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="setting">Setting (optional)</label>
                    <input 
                        type="text" 
                        id="setting" 
                        name="setting" 
                        value={formData.setting}
                        onChange={handleChange}
                        placeholder="e.g., medieval Europe, cyberpunk city, space station"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="customPrompt">Additional Details (optional)</label>
                    <textarea 
                        id="customPrompt" 
                        name="customPrompt" 
                        value={formData.customPrompt}
                        onChange={handleChange}
                        placeholder="Any specific elements or ideas you'd like to include..."
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Book'}
                </button>
            </form>

            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p style={{ marginLeft: '10px' }}>Creating your fictional book...</p>
                </div>
            )}
        </div>
    );
};

