<template>
    <button @click="openModal = true">Add blog</button>
    <Modal v-model="openModal">
        <AddPostForm @formSubmit="submitForm" />
    </Modal>
    <div style="display: flex; gap: 1.5rem;flex-wrap: wrap;">

        <BlogCard v-for="(post, index
        ) in $store.getters.getBlogPosts" :key="post.title" :blog="post" :id="index" />
    </div>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()
const openModal = ref(false)
store.dispatch("fetchBlogPosts");
let submitForm = (blog) => {
    console.log(blog);
    store.commit('addBlogPost', blog)
    openModal.value = false
}

</script>