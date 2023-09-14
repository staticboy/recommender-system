<template>

<q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-home" label="Go Home" no-caps />

<form class="w-full max-w-lg">
  <div class="-mx-3 mb-8">
    <div class="form-group">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Category Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
    
    </div>

    <div class="form-group">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Number of Items
      </label>
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        <strong>1432</strong> 
      </label>
    </div>
    <div class="form-group">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Last Modified Date
      </label>
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        30 July 2023 12:00:01
      </label>
    </div>
    <div class="form-group">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Last Modified By
      </label>
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Grumpy Aneh
      </label>
    </div>

    <div class="form-group">
        <router-link to="/adm-home" class="btn" id="approve">Approve</router-link>
        <router-link to="/adm-home" class="btn" id="reject">Reject</router-link>
    </div>

</div>
</form>
</template>
  
  <script>
  export default {
    name: 'VerticalForm',
    data() {
      return {
        name: '',
        address: '',
        businessSummary: '',
        yearFound: '',
      };
    },
  };
  </script>
  
  <style scoped lang="scss">
  * {
    text-align: left;
  }
  
  table * {
    padding: 8px;
  }
  
  .btn, button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  .btn:hover, button:hover {
    border-color: #646cff;
  }

  #approve {
    border-color: green;
    color: green; 
    margin: 5px;
  }
  #reject {
    border-color: red;
    color: red;
    margin: 5px;
  }
  .btn:focus,
  .btn:focus-visible,
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  /***********
  FORMS
  ************/
  .form-group{
    margin : 10px;
  }
  
  </style>  