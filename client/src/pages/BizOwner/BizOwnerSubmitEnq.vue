<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-9">
          <h1 class="q-mb-md">Submit Enquiry</h1>
        </div>
      </div>
      <q-form @submit.prevent="submitEnquiry">
        <div class="row">
          <div class="col-6">
            <q-input 
              outlined 
              v-model="enquiry.enq_subject" 
              label="Subject" 
              dense 
              required 
              type="text"
              class="q-mr-md"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <q-input 
              outlined 
              v-model="enquiry.enq_message" 
              label="Description" 
              type="textarea" 
              :rows=4 
              dense 
              required
              class="q-mt-md width-100"
              lazy-rules:rules="[ val => val && val.length > 0 || 'Please type something']"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <q-select
              v-model="enquiry.enq_types"
              :options="enq_types"
              label="Enquiry Type"
              dense
              emit-value
              map-options
              class="q-mr-md q-mt-md"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <!--
            <h6>
              Priority Level : {{ enquiry.enq_types === '' ? '' : enq_types.indexOf(enquiry.enq_types) + 1 }}
            </h6>
            -->
            <q-input outlined v-model="enquiry.enq_priority" label="Priority" type="text"  dense 
              readonly required :model-value="priorityMapper(enquiry.enq_types)"
              class="q-mt-md width-100"></q-input>
            
          </div>
          
        </div>
      </q-form>
      <q-btn type="submit" color="primary" label="Submit" class="q-mt-md" dense @click="submitEnquiry"></q-btn>
      <div class="row">
        <div class="col-9">
          <h1 class="q-mb-md mt-8">Past Enquiries</h1>
        </div>
        <q-tabs v-model="selectedTab">
          <q-tab name="tab1" label="Open">
          </q-tab>
          <q-tab name="tab2" label="Closed">
          </q-tab>
        </q-tabs>
      </div>
      <div v-if="selectedTab === 'tab1'" class="mt-6">
        <q-table :rows="openEnq" :rows-per-page-options="[10, 20, 30]" :columns="columns">
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div v-if="selectedTab === 'tab2'" class="mt-6">
        <q-table :rows="closedEnq" :rows-per-page-options="[10, 20, 30]" :columns="columns">
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-td auto-width></q-td>
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td>
                <q-btn @click="viewClosedEnq(props.row)" label="View" color="primary" />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.name === 'your_column_name' ? props.row[col.field] : props.row[col.field] }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-dialog v-model="viewClosed">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-actions align="right">
              <q-btn icon="close" size="md" flat @click="closeDialog" class="q-ml-md q-mt-md" />
            </q-card-actions>
            <div class="row">
              <h4 class="q-mt-md q-ml-md">Response for Enquiry {{ selectedRow ? selectedRow.enq_id : '' }}</h4>
            </div>
            <q-card-section>
              
              <q-input label="Responded By" v-model="selectedRow.admin_id" readonly />
              <q-input label="Response" v-model="selectedRow.enq_response" readonly type="textarea" :rows="4" />
              <q-input label="Response Date" v-model="selectedRow.enq_responsedate" readonly />
            </q-card-section>

          </q-card>
        </q-dialog>

      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();
const q = useQuasar();
const selectedTab = ref('tab1');
const openEnq = ref([]);
const closedEnq = ref([]);
const viewClosed = ref(false);
const selectedRow = ref(null);
const enquiry = ref({
  enq_subject: '',
  enq_message: '',
  enq_submitby: '',
  enq_types : '',
  enq_priority : 0

});




const viewClosedEnq = (row) => {
  selectedRow.value = row;
  viewClosed.value = true;
};

const closeDialog = (row) => {
  viewClosed.value = false;
};

const clearEnquiryForm = () => {
  // Clear form
  enquiry.value = {
    enq_subject: '',
    enq_message: '',
    enq_submitby: '',
  };
};

const enq_types = ref([
    {
        "enq_get_enq_types": "TRANSACTION"
    }

])

const priorityMapper = (row) => {

  return enq_types.value.indexOf(row) + 1 
            
}
const columns = computed(() => [
  {
    name: 'enq_id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'enq_id',
    sortable: true,
  },
  {
    name: 'enq_subject',
    required: true,
    label: 'Subject',
    align: 'left',
    field: 'enq_subject',
    sortable: true,
  },
  {
    name: 'enq_message',
    label: 'Message',
    align: 'left',
    field: 'enq_message',
    sortable: true,
  },
  {
    name: 'enq_submitdate',
    label: 'Submitted On',
    align: 'left',
    field: 'enq_submitdate',
    sortable: true,
  },
]);

//const updateFilteredTransactions = enq_types.value.map(item => item.enq_get_enq_types);



const submitEnquiry = () => {
  //router.push('/biz/home');
  enquiry._rawValue.enq_submitby = localStorage.getItem("userId")
  enquiry._rawValue.enq_priority = priorityMapper(enquiry.value.enq_types)

  

  console.log(enquiry._rawValue);
  postRowEnquiry()
};

//API POST : New product row
//product/addNewProd
const postRowEnquiry = async () => {
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/enquiry/insertEnquiry`, enquiry._rawValue);
    console.log(response)
    if (response.statusText === "OK") {
      console.log("Enquiry sent");
      q.notify({
          type: 'positive',
          message: 'New enquiry submitted successfully'
        })
      fetchEnquiryData();
      clearEnquiryForm();
    } else {
      console.error('failed to send enquiry');
      q.notify({
          type: 'negative',
          message: 'New enquiry submission failed'
        })
    }
  } catch (error) {
    console.error('Critical error:', error);
    q.notify({
          type: 'negative',
          message: 'Something went wrong.'
        })
  }
};

const fetchEnquiryData = async () => {
  try {
    //change biz id value to the id of current login biz owner
    var param = { "enq_submitby": localStorage.getItem("userId") }
    console.log(param)
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/enquiry/getEnquiryByMe`, param);
    console.log(response.data.length)
    if (response.data.length >= 1) {
      const data = response.data;
      openEnq.value = data.filter((record) => record.enq_status === "OPEN");
      closedEnq.value = data.filter((record) => record.enq_status === "RESPONDED");
    } else {
      console.error("Failed to fetch enquiry data");
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

const fetchEnquiryTypes = async () => {
  try {
    //change biz id value to the id of current login biz owner
    
   
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/enquiry/getEnquiryTypes`);
    console.log(response.data.length);
    //enq_types.value = response.data;
    enq_types.value = response.data.map((enquiry_type: { enq_get_enq_types: any; }) =>  enquiry_type.enq_get_enq_types);
    // enq_types.value = response.data.map((enq_get_enq_types, index) => {
    //   return { key: index + 1, enq_get_enq_types };
    // });
    //console.log(enq_types.value.map(x => x.enq_get_enq_types));


  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

onMounted(() => {
  q.loading.show();
  fetchEnquiryData();
  fetchEnquiryTypes();
  q.loading.hide();
});

</script>