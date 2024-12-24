<template>
    <div>
      <dashboard-component />
    </div>
  </template>
  
  <script>
  import DashboardComponent from "../components/dashboard.vue";
  
  export default {
    name: "DashboardView",
    components: {
      DashboardComponent,
    },
  };
  </script>
  