<!-- just for demonstration -->
<template>
  <div>
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <LanguageToggle />
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
  </template>
  <style scoped>
  nav{
    display: flex;
    justify-content: space-between;
  }
  </style>