<template>
    <div class="about-view">
      <AboutComponent />
    </div>
  </template>
  
  <script>
  import AboutComponent from "../components/about.vue";
  
  export default {
    name: "AboutView",
    components: {
      AboutComponent,
    },
  };
  </script>
  
  <style scoped>
  .about-view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 80vh;
  }
  </style>
  