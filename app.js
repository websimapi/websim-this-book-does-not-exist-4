import React from 'react';
import ReactDOM from 'react-dom/client';
import { BookForm } from './components/BookForm.js';
import { BookGallery } from './components/BookGallery.js';
import { BookDetail } from './components/BookDetail.js';
import { RoomProvider } from './context/RoomContext.js';

const App = () => {
    const [activeTab, setActiveTab] = React.useState('create');
    const [selectedBook, setSelectedBook] = React.useState(null);

    return (
        <RoomProvider>
            <div className="app-container">
                <header>
                    <h1>This Book Does Not Exist</h1>
                    <h2>Generate fictional books with AI</h2>
                </header>

                {selectedBook ? (
                    <BookDetail 
                        book={selectedBook} 
                        onBack={() => setSelectedBook(null)} 
                    />
                ) : (
                    <>
                        <div className="tabs">
                            <button 
                                className={`tab ${activeTab === 'create' ? 'active' : ''}`}
                                onClick={() => setActiveTab('create')}
                            >
                                Create Book
                            </button>
                            <button 
                                className={`tab ${activeTab === 'gallery' ? 'active' : ''}`}
                                onClick={() => setActiveTab('gallery')}
                            >
                                Book Gallery
                            </button>
                        </div>

                        <div className={`tab-content ${activeTab === 'create' ? 'active' : ''}`}>
                            <BookForm onSuccess={() => setActiveTab('gallery')} />
                        </div>

                        <div className={`tab-content ${activeTab === 'gallery' ? 'active' : ''}`}>
                            <BookGallery onSelectBook={setSelectedBook} />
                        </div>
                    </>
                )}
            </div>
        </RoomProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

