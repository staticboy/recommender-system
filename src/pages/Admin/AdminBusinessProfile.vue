


<template>
  



  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    
    
    <div class="l-body">
      
      <header>
        <h1>
          Business Profile : <b>Little Drummer Boy</b>
        </h1>
        <q-btn class="q-mt-md" color="white" text-color="blue" unelevated to="/admin/business-list" label="Go Back" no-caps />

        <form class="q-mt-lg max-w-lg">
          <div class=" mb-8">
            <div class="form-group">
              <label class=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Business Name
              </label>
              <input
                class=" appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="" type="text" value="Little Drummer Boy">
            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Year Est
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="" type="text" value="2008">

            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Phone No
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="" type="text" value="1800 1234 0009">

            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Address
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="" type="text" value="1234 Chuckle Avenue Laughington, Haha 56789 Funnyland">

            </div>
            <div class="form-group ">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Business Description
              </label>
              <p>
                Sporting goods companies would like to increase their ecommerce footprint by having a web portal to showcase their products to sports enthusiasts. This is to drive sales and marketing exposures on the products that they sell, which could be challenging when they only rely on showcasing products in their physical stores. Furthermore, they would like to gain insightful information between their products and users to help them formulate their future business decision. 
              </p>
            </div>

            <div class="form-group">
              <router-link to="/admin/business-list" class="btn" id="approve">Approve</router-link>
              <router-link to="/admin/business-list" class="btn" id="reject">Reject</router-link>
            </div>

          </div>
        </form>

      </header>




    </div>
  </div>
</template>


<!--<script >





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




</script>-->




  
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
  margin-bottom: 15px;
  width: 50%;
}

input, p{
  width: 100%;
  pointer-events:none; //disable interaction
}
p{border: 1px solid white; box-sizing: border-box; padding: 5px;}
label {
  margin-bottom: 5px;
}

</style>  