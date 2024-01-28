export const state = () => ({
    language: 'en',
    blogPosts: [],
});

export const mutations = {
    setLanguage(state, language) {
        state.language = language;
    },
    setBlogPosts(state, posts) {
        state.blogPosts = posts;
    },
    addBlogPost(state, post) {
        state.blogPosts.unshift({...post});
    },
};

export const actions = {
    async fetchBlogPosts({ commit, state }) {
        console.log('inside fetchBlogPosts');
        try {
            const response = await fetch('blog-posts.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch blog posts: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            commit('setBlogPosts', json);
        } catch (error) {
            console.error('Error fetching blog posts:', error.message);
        }
    },

    switchLanguage({ commit, dispatch }, language) {
        commit('setLanguage', language);
        dispatch('fetchBlogPosts');
    },
};

export const getters = {
    getCurrentLanguage: (state) => state.language,
    getBlogPosts: (state) => state.blogPosts || [],
    getPostById: (state) => (postId) => {
        console.log('inside');
        return state.blogPosts[postId]
    },
};

