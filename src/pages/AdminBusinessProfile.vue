<template>
  



  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    
    <div class="l-body">
      
      <header>
        <h1>
          Business Profile : <b>Interraisin Inc.</b>
        </h1>
        <q-btn class="q-mt-md" color="white" text-color="blue" unelevated to="/adm-home" label="Go Home" no-caps />

        <form class="w-full q-mt-md max-w-lg">
          <div class="-mx-3 mb-8">
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Business Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="Jane">

            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Year Est
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="Jane">

            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Phone No
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="Jane">

            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Address
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="Jane">

            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Business Description
              </label>
              <textarea id="businessSummary" class="form-control" v-model="businessSummary"></textarea>
            </div>

            <div class="form-group">
              <router-link to="/adm-home" class="btn" id="approve">Approve</router-link>
              <router-link to="/adm-home" class="btn" id="reject">Reject</router-link>
            </div>

          </div>
        </form>

      </header>




    </div>
  </div>
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
//Structure

.l-body {
  width: 960px;
  height: 90vh;
}


* {
  text-align: left;
}

table * {
  padding: 8px;
}

.btn,
button {
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

.btn:hover,
button:hover {
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
.form-group {
  margin: 10px;
}</style>  