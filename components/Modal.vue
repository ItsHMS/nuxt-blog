<template>
    <div v-if="modelValue">
        <div class="modal-overlay" @click="closeModal"></div>
        <div class="modal-content">
            <button @click="emit('update:modelValue', false)" class="close-button">×</button>

            <slot></slot>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
<style scoped>
@media (min-width: 769px) {
    .modal-content {
        max-width: 900px;
        max-height: 80% !important;
        width: 80%;
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 1001;
    max-height: 100%;
    overflow: auto;
    overscroll-behavior-y: none;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #555;
}



.modal-content::-webkit-scrollbar {
    width: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
    background-color: #888;
}

.modal-content::-webkit-scrollbar-track {
    background-color: #eee;
}
</style>