<template>
    <div>
      <powerbi-dashboard
        embedUrl="https://app.powerbi.com/view?r=eyJrIjoiY2IzMjU0YzUtNWQ1OS00MzE0LTg3MjgtMGM4ZjI3NTJiYjE1IiwidCI6ImYyMWY3NTk5LWY2NGMtNGM2My05MTE4LWY2NzI5YmQ3ODc5ZCIsImtleSI6Ijc4MzY2Mjc2MDI3MzQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
        height="600px"
      />
    </div>
  </template>
  
  <script>
  import PowerBIDashboard from 'powerbi-client-vue-js';
  
  export default {
    name: 'PowerBIDashboardComponent',
    components: {
      PowerBIDashboard,
    },
  };
  </script>
  