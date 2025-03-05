import React from 'react';

const RoomContext = React.createContext();

export const RoomProvider = ({ children }) => {
    const [room, setRoom] = React.useState(null);
    const [isConnected, setIsConnected] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const initRoom = async () => {
            try {
                const newRoom = new WebsimSocket();
                
                newRoom.onmessage = (event) => {
                    const data = event.data;
                    if (data.type === 'connected') {
                        setIsConnected(true);
                    } else if (data.type === 'disconnected') {
                        setIsConnected(false);
                    }
                };
                
                setRoom(newRoom);
            } catch (err) {
                console.error('Failed to initialize room', err);
                setError('Failed to connect to the server');
            }
        };

        initRoom();
    }, []);

    const value = {
        room,
        isConnected,
        error
    };

    return (
        <RoomContext.Provider value={value}>
            {children}
        </RoomContext.Provider>
    );
};

export const useRoom = () => {
    const context = React.useContext(RoomContext);
    if (context === undefined) {
        throw new Error('useRoom must be used within a RoomProvider');
    }
    return context;
};

