export const state = () => ({
    language: 'en',
    blogPosts: {},
});

export const mutations = {
    setLanguage(state, language) {
        state.language = language;
    },
    setBlogPosts(state, { language, posts }) {
        state.blogPosts[language] = posts;
    },
    addBlogPost(state, post) {
        const language = post.language || state.language;
        if (!state.blogPosts[language]) {
            state.blogPosts[language] = [];
        }
        state.blogPosts[language].push(post);
    },
};

export const actions = {
    async fetchBlogPosts({ commit, state }) {
        const posts = await fetch(`/api/posts?lang=${state.language}`);
        commit('setBlogPosts', { language: state.language, posts });
    },
    switchLanguage({ commit, dispatch }, language) {
        commit('setLanguage', language);
        dispatch('fetchBlogPosts');
    },
};

export const getters = {
    getCurrentLanguage: (state) => state.language,
    getBlogPosts: (state) => state.blogPosts[state.language] || [],
    getPostById: (state) => (postId) => {
        const posts = state.blogPosts[state.language] || [];
        return posts.find((post) => post.id === postId);
    },
};

