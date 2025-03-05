import React from 'react';

export const BookDetail = ({ book, onBack }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="book-detail-view">
            <button className="back-button" onClick={onBack}>
                &larr; Back to Gallery
            </button>

            <div className="book-detail-header">
                <img 
                    src={book.coverUrl} 
                    alt={`Cover for ${book.title}`} 
                    className="book-detail-cover"
                />
                <div className="book-detail-info">
                    <h1 className="book-detail-title">{book.title}</h1>
                    <h2 className="book-detail-author">by {book.author}</h2>
                    <p><strong>Genre:</strong> {book.genre}</p>
                    <p><strong>Published:</strong> {book.publishYear}</p>
                    <p><strong>Pages:</strong> {book.pageCount}</p>
                    <p><strong>Created by:</strong> {book.username} on {formatDate(book.createdAt)}</p>
                </div>
            </div>

            <div className="book-detail-content">
                <h3>Book Description</h3>
                <p className="book-detail-summary">{book.description}</p>
                
                <h3>Plot Summary</h3>
                <p className="book-detail-summary">{book.plotSummary}</p>
                
                {book.mainCharacters && (
                    <>
                        <h3>Main Characters</h3>
                        <p className="book-detail-summary">{book.mainCharacters}</p>
                    </>
                )}
                
                {book.criticalReception && (
                    <>
                        <h3>Critical Reception</h3>
                        <p className="book-detail-summary">{book.criticalReception}</p>
                    </>
                )}
                
                {book.funFact && (
                    <>
                        <h3>Fun Fact</h3>
                        <p className="book-detail-summary">{book.funFact}</p>
                    </>
                )}
            </div>
        </div>
    );
};

