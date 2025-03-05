import React from 'react';
import { useRoom } from '../context/RoomContext.js';
import { BookCard } from './BookCard.js';

export const BookGallery = ({ onSelectBook }) => {
    const { room } = useRoom();
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = room.collection('books').subscribe((booksList) => {
            // Sort books by creation date (newest first)
            const sortedBooks = [...booksList].sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setBooks(sortedBooks);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [room]);

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p style={{ marginLeft: '10px' }}>Loading books...</p>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h3>No books have been created yet</h3>
                <p>Be the first to generate a fictional book!</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Book Gallery</h2>
            <p style={{ marginBottom: '20px' }}>
                Discover {books.length} fictional books created by the community
            </p>
            <div className="gallery">
                {books.map(book => (
                    <BookCard 
                        key={book.id} 
                        book={book} 
                        onClick={() => onSelectBook(book)}
                    />
                ))}
            </div>
        </div>
    );
};

