<template>
  <div class="text-center q-pa-md flex flex-center">
    <div class="l-body">
      <header>
        <h4>INC100021 : <b>Unable to buy item</b></h4>

      

        <form class="q-mt-lg max-w-lg">
          <div class="mb-8">
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                User ID
              </label>
              <input
                class="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="MEM-1001"
              />
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                User Name
              </label>
              <input
                class="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="Little Drummer Boy"
              />
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Submitted on
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="01 January 2023 10:09:33"
              />
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                User Type
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="Member"
              />
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Address
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="1234 Chuckle Avenue Laughington, Haha 56789 Funnyland"
              />
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Case Description
              </label>
              <p>
                User Unable to purchase item. Wallet is empty. Please advice to
                enable Purchase
              </p>
            </div>

            <div class="form-group q-mt-lg">
              <hr />
              <h5 class="">Administrator's Response</h5>
              <textarea name="" id="admin-response" cols="60" rows="5">
Customer is broke. Admin advised to go get a job and use the money to buy ball.
              </textarea>
            </div>

            <div class="form-group">
              <router-link to="/admin/enquiry-list" class="btn" id="approve"
                >Send Feedback</router-link
              >
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
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 4px;
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

input,
p {
  width: 100%;
  pointer-events: none; //disable interaction
}
p {
  border: 1px solid white;
  box-sizing: border-box;
  padding: 5px;
}
label {
  margin-bottom: 5px;
}

#admin-response {
  padding: 5px;
  box-sizing: border-box;
}

.form-group h5 {
  margin-top: 16px;
  margin-bottom: 4;
}
</style>
