<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label for="title">{{ $t('post.title') }}</label>
            <input required type="text" id="title" v-model="post.title[locale]">
        </div>

        <div class="form-group">
            <label for="author">{{ $t('post.author') }}</label>
            <input required type="text" id="author" v-model="post.author[locale]">
        </div>

        <div class="form-group">
            <label for="content">{{ $t('post.content') }}</label>
            <textarea required id="content" v-model="post.content[locale]"></textarea>
        </div>

        <div class="form-group">
            <label for="content">{{ $t('post.description') }}</label>
            <textarea required id="content" v-model="post.description[locale]"></textarea>
        </div>

        <div class="form-group">
            <label for="category">{{ $t('post.category') }}</label>
            <select id="category" v-model="post.category">
                <option value="uncategorized">{{ $t('post.uncategorized') }}</option>
                <option value="news">{{ $t('post.news') }}</option>
                <option value="tutorials">{{ $t('post.tutorials') }}</option>
                <option value="reviews">{{ $t('post.reviews') }}</option>
            </select>
        </div>

        <button type="submit">{{ $t('post.submit') }}</button>
    </form>
</template>
  
<script setup>
const { locale } = useI18n()
const emit = defineEmits(['formSubmit'])
const post = reactive({
    title: {
        [locale.value]: ''
    },
    author: {
        [locale.value]: ''
    },
    content: {
        [locale.value]: ''
    },
    description: {
        [locale.value]: ''
    },
    category: 'uncategorized',
});
const submitForm = () => {

    console.log(post);
    emit("formSubmit",{...post})

};
</script>
<style scoped>
@media (min-width: 769px) {
    form {
        max-width: 900px;
        width: auto !important;
        height: 80% !important;
        max-height: 80% !important;
    }
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100vw;
    padding: 40px;
}

textarea {
    height: 100px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

label {
    font-weight: bold;
}

input,
textarea,
select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input:focus,
textarea:focus {
    outline: none;
    border-color: #999;
}



select:focus {
    outline: none;
    border-color: #999;
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}

button:hover {
    background-color: #0069d9;
}
</style>