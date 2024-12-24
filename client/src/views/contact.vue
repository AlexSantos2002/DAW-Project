<template>
    <div class="contact-page">
      <ContactComponent />
    </div>
  </template>
  
  <script>
  import ContactComponent from "../components/contact.vue";
  
  export default {
    name: "ContactPage",
    components: {
      ContactComponent,
    },
  };
  </script>
  
  <style scoped>
  .contact-page {
    padding: 2rem;
  }
  </style>
  