
  
<script setup>
import { useI18n } from 'vue-i18n';

const { setLocaleMessage, t, d } = useI18n({ useScope: "local" });

const props = defineProps(['blog', 'id']);

const getAvatarInitials = computed(() => {
    const authorName = props.blog.author.en || '';
    const initials = authorName?.trim().split(/\s+/).map(word => word[0].toUpperCase()).join('').slice(0, 2);
    return initials;
});
function getRandomTimestamp(startDate, endDate) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    return new Date(randomTimestamp);
}

const startDate = new Date('2022-01-01');
const endDate = new Date('2022-12-31');

const randomDate = ref(null)
randomDate.value = getRandomTimestamp(startDate, endDate);
console.log(randomDate.value)
const locales = ["en", "fr"];
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
locales.forEach((locale) => {
    const localeMessages = {};
    for (const [key, value] of Object.entries(props.blog)) {
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
</script>
<template>
    <div class="blog-card">
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
        <!-- <p>{{ t('content') }}</p> -->
        <NuxtLink :to="`/${id}`">
            <button class="btn-read-more">Read More</button>
        </NuxtLink>
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
    position: absolute;
    top: -3.5%;
    left: 50%;
    transform: translateX(-50%);
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
    margin-right: 20px;
}

.btn-read-more {
    padding: 0.3rem 1rem;
    margin-top: 2rem;
    cursor: pointer;
}
</style>
  