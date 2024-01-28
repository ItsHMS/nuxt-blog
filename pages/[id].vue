<script setup>
import { useI18n } from 'vue-i18n';
import { useStore, mapState } from 'vuex';
const store = useStore();
const route = useRoute();
const { setLocaleMessage, t, d } = useI18n({ useScope: "local" });
const list = computed(() => store.getters.getPostById(route.params.id))
definePageMeta({
    layout: 'blog-layout'
});
console.log(route.params.id);
const post = ref(null);
const randomDate = ref(null);
function getRandomTimestamp(startDate, endDate) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    return new Date(randomTimestamp);
}
const categoryTranslations = {
    "en": {
        "uncategorized": "Uncategorized",
        "news": "News",
        "tutorials": "Tutorials",
        "reviews": "Reviews"
    },
    "fr": {
        "uncategorized": "Non classé",
        "news": "Actualités",
        "tutorials": "Tutoriels",
        "reviews": "Critiques"
    }
};
const getCategoryTranslation = (category, locale) => {
    console.log(category, locale);
    const lowerCaseCategory = category.toLowerCase();
    return categoryTranslations[locale][lowerCaseCategory] || lowerCaseCategory;
};
const translateAndSetLocaleMessages = () => {
    const locales = ["en", "fr"];

    locales.forEach((locale) => {
        const localeMessages = {};
        for (const [key, value] of Object.entries(post.value)) {
            if (key === 'category') {
                localeMessages[key] = getCategoryTranslation(value, locale);
            } else if (typeof value === "string") {
                localeMessages[key] = value;
            } else if (typeof value === "object") {
                localeMessages[key] = value[locale];
            }
        }
        setLocaleMessage(locale, localeMessages);
    });
}

post.value = store.getters.getPostById(route.params.id);
if (post.value) {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-12-31');

    randomDate.value = getRandomTimestamp(startDate, endDate);
    translateAndSetLocaleMessages()

}
if (!post.value) {
    store.dispatch('fetchBlogPosts');
}

watch(list, (n) => {
    if (n) {
        post.value = n
        const startDate = new Date('2022-01-01');
        const endDate = new Date('2022-12-31');

        randomDate.value = getRandomTimestamp(startDate, endDate);
        translateAndSetLocaleMessages()
    }
});
const getAvatarInitials = computed(() => {
    const authorName = post.value.author.en || '';
    const initials = authorName?.trim().split(/\s+/).map(word => word[0].toUpperCase()).join('').slice(0, 2);
    return initials;
});




</script>
<template>
    <div v-if="post" class="blog-card">
        <div class="category-chip">{{ t('category') }}</div>
        <div class="user-info">
            <div class="avatar">{{ getAvatarInitials }}</div>
            <div>
                <p>{{ t('author') }}</p>
                <p style="opacity: .5;">{{ d(randomDate, 'long') }}</p>
            </div>
        </div>
        <h3>{{ t('title') }}</h3>
        <p style="opacity: .5;">{{ t('description') }}</p>
        <p>{{ t('content') }}</p>

    </div>
</template>

<style scoped>
.blog-card {
    max-width: 960px;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid gray;
    margin: auto;
    width: 25rem;
    position: relative;
}

.category-chip {
    width: fit-content;
    margin-left: auto;
    background-color: #6f42c1;
    color: #ffffff;
    padding: 0.1rem 1rem;
    border-radius: 20px;
    z-index: 1;
}

.blog-card h3 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 600;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.user-info p {
    margin: 0;
}

.avatar {
    background-color: #3498db;
    color: #ffffff;
    font-size: 1.2rem;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.btn-read-more {
    padding: 0.3rem 1rem;
    margin-top: 2rem;
    cursor: pointer;
}
</style>