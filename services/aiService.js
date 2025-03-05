// AI Service for generating book information and covers

export const generateBookInfo = async (formData) => {
    try {
        const { genre, theme, setting, customPrompt } = formData;
        
        // Build prompt for the AI
        let prompt = `Create a fictional book that does not exist in the real world.
Generate complete information for a fictional book in the ${genre} genre`;
        
        if (theme) prompt += ` with themes of ${theme}`;
        if (setting) prompt += ` set in ${setting}`;
        if (customPrompt) prompt += `. Additional details: ${customPrompt}`;
        
        prompt += `. 
Please include:
1. A catchy and original title
2. A fictional author name
3. A compelling description/synopsis (100-200 words)
4. A more detailed plot summary
5. Information about main characters
6. A fictional publication year (between 1800 and present)
7. A realistic page count
8. Critical reception or reviews
9. A fun fact about the book's creation or impact
10. The genre classification

Format response as JSON with these fields: title, author, genre, description, plotSummary, mainCharacters, publishYear, pageCount, criticalReception, funFact`;

        // Call AI to generate book information
        const completion = await websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a literary expert who creates detailed fictional books with rich backstories."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            json: true
        });

        // Parse the JSON response
        const bookInfo = JSON.parse(completion.content);
        
        // Ensure all expected fields are present
        return {
            title: bookInfo.title || 'Untitled Book',
            author: bookInfo.author || 'Unknown Author',
            genre: bookInfo.genre || genre,
            description: bookInfo.description || 'No description available.',
            plotSummary: bookInfo.plotSummary || 'No plot summary available.',
            mainCharacters: bookInfo.mainCharacters || 'Character information not available.',
            publishYear: bookInfo.publishYear || new Date().getFullYear(),
            pageCount: bookInfo.pageCount || Math.floor(Math.random() * 300) + 100,
            criticalReception: bookInfo.criticalReception || 'No critical reception available.',
            funFact: bookInfo.funFact || 'No fun facts available.'
        };
    } catch (error) {
        console.error('Error generating book info:', error);
        throw new Error('Failed to generate book information');
    }
};

export const generateBookCover = async (bookInfo) => {
    try {
        // Craft a detailed prompt for the book cover
        const coverPrompt = `Create a professional, high-quality book cover for a ${bookInfo.genre} novel titled "${bookInfo.title}" by ${bookInfo.author}. 
The book is about: ${bookInfo.description.substring(0, 200)}
Style: Create a visually striking, professional book cover that would look realistic on a bookstore shelf. 
Include the title and author name in an appropriate font that matches the genre.`;

        // Generate the book cover image
        const result = await websim.imageGen({
            prompt: coverPrompt,
            aspect_ratio: "2:3" // Standard book cover ratio
        });

        return result.url;
    } catch (error) {
        console.error('Error generating book cover:', error);
        throw new Error('Failed to generate book cover');
    }
};

