<template>
    <div>
      <button @click="toggleLanguage('en')" :class="{ active: locale === 'en' }">English</button>
      <button @click="toggleLanguage('fr')" :class="{ active: locale === 'fr' }">Français</button>
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n';
  
  const { locale } = useI18n();
  
  
  const toggleLanguage = (language) => {
    locale.value = language;
  };
  </script>
  
  <style scoped>
  .active {
    background-color: #980a0a;
    color: white;
    border: none;
    border-radius: 2px;
    padding-top: 3px;
    padding-bottom: 3px;
  }
  </style>