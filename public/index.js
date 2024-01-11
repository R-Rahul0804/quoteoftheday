document.addEventListener('DOMContentLoaded', function () {
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    const getQuoteButton = document.getElementById('get-quote-btn');

    getQuoteButton.addEventListener('click', fetchRandomQuote);
    

    async function fetchRandomQuote() {
        try {
            const response = await fetch('/api/quote');
            const data = await response.json();

            if (data.length > 0) {
                const quote = data[0];
                quoteTextElement.textContent = quote.text;
                quoteAuthorElement.textContent = `- ${quote.author}`;
            } else {
                quoteTextElement.textContent = 'No quotes found.';
                quoteAuthorElement.textContent = '';
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    }

    const searchByAuthorButton = document.getElementById('search-by-author-btn');

    searchByAuthorButton.addEventListener('click', searchByAuthor);

    async function searchByAuthor() {
        try {
            const authorInput = document.getElementById('author-input');
            const authorName = authorInput.value.trim();

            if (authorName === '') {
                return;
            }

            const response = await fetch(`/api/quote?author=${authorName}`);
            const data = await response.json();

            if (data.length > 0) {
                const quote = data[0];
                quoteTextElement.textContent = quote.text;
                quoteAuthorElement.textContent = `- ${quote.author}`;
            } else {
                quoteTextElement.textContent = 'No quotes found for this author.';
                quoteAuthorElement.textContent = '';
            }
        } catch (error) {
            console.error('Error searching by author:', error);
        }
    }

    fetchRandomQuote();
});
