import React from 'react';

export const BookCard = ({ book, onClick }) => {
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="book-card" onClick={onClick}>
            <img 
                src={book.coverUrl} 
                alt={`Cover for ${book.title}`} 
                className="book-cover"
                loading="lazy"
            />
            <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-description">{truncateText(book.description, 150)}</p>
                <div className="book-meta">
                    <span>Created: {formatDate(book.createdAt)}</span>
                    <span className="created-by">By: {book.username}</span>
                </div>
            </div>
        </div>
    );
};

