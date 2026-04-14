const API_URL = process.env.REACT_APP_API_URL || 'https://winchenqaz.com/api';

export const articlesAPI = {
    // Get all articles
    getAll: async () => {
        const response = await fetch(`${API_URL}/articles`);
        if (!response.ok) throw new Error('Failed to fetch articles');
        return response.json();
    },

    // Get single article by ID
    getById: async (id) => {
        const response = await fetch(`${API_URL}/articles/${id}`);
        if (!response.ok) throw new Error('Failed to fetch article');
        return response.json();
    },

    // Get article by slug
    getBySlug: async (slug) => {
        const response = await fetch(`${API_URL}/articles/slug/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch article');
        return response.json();
    },
};
