<template>
  <div>
    <q-page>
      <div class="q-pa-md">
        <h1>Admin Enquiries</h1>
      </div>
      <q-form @submit="submitForm" @reset="resetForm">
        <q-card class="q-mb-md">
          <q-card-section>
            <q-form>
              <div class="row q-gutter-md mb-4">
                <div class="col-2">
                  <q-input v-model="userName" label="User Id" outlined placeholder="Enter user Id"></q-input>
                </div>

                <div class="col-2">
                  <q-select v-model="status" label="Status" outlined :options="statusOptions"></q-select>
                </div>

                <div class="col-2">
                  <q-select v-model="userType" label="User Type" outlined :options="userTypeOptions"></q-select>
                </div>

                <div class="col-2">
                  <q-select v-model="priorityLevel" label="Priority" outlined :options="priorityOptions"></q-select>
                </div>

                <div class="col-2">
                  <q-select v-model="enquiryType" label="Enquiry Type" outlined :options="enquiryTypeOptions"></q-select>
                </div>
              </div>

              <div class="date-pickers ">
                <div class="date-picker" @click="toggleDatePicker('startDate')">
                  <label for="startDate">From:</label>
                  <span v-if="!showStartDatePicker">
                    <q-icon name="event" size="24px" />
                  </span>
                  <q-date v-model="startDate" label="From" ref="startDatePicker" @blur="onDatePickerBlur('startDate')"
                    @input="onDatePickerInput('startDate')" v-show="showStartDatePicker" />
                </div>
                <div class="date-picker" @click="toggleDatePicker('endDate')">
                  <label for="endDate">To:</label>
                  <span v-if="!showEndDatePicker">
                    <q-icon name="event" size="24px" />
                  </span>
                  <q-date v-model="endDate" label="To" ref="endDatePicker" @blur="onDatePickerBlur('endDate')"
                    @input="onDatePickerInput('endDate')" v-show="showEndDatePicker" />
                </div>
              </div>
            </q-form>
          </q-card-section>
          <q-card-actions align="right">
            <!-- <q-btn label="Search" color="primary" type="submit" /> -->
            <q-btn label="Reset" color="primary" type="reset" @click="testClick" />
          </q-card-actions>
        </q-card>
      </q-form>

      <q-table :rows="filteredList" :rows-per-page-options="[10, 20, 30]" :columns="columns">
        <template v-slot:body="props">
         <q-tr :props="props">
          
            <q-td key="enq_id" :props="props">
              {{ props.row.enq_id }}
            </q-td>
            <q-td key="enq_submitby" :props="props">
              {{ props.row.enq_submitby }}
            </q-td>
            <q-td key="enq_priority" :props="props">
              {{ props.row.enq_priority }}
            </q-td>

            <q-td key="enq_type" :props="props">
              {{ props.row.enq_type }}
            </q-td>
            <q-td key="enq_subject" :props="props">
              {{ props.row.enq_subject }}
            </q-td>

            <q-td key="enq_submitdate" :props="props">
              {{ props.row.enq_submitdate }}
            </q-td>
            <q-td key="enq_status" :props="props">
              {{ props.row.enq_status }}
            </q-td>
            <q-td key="user_type" :props="props">
              {{ props.row.user_type }}
            </q-td>
            <q-td>
              <q-btn color="primary" label="View" @click="toggleExistingEnq(props.row)" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-dialog v-model="viewExistingEnq">
          <q-card style="width: 960px; max-width: 80vw;">
            <q-card-actions align="right">
              <q-btn icon="close" size="md" flat @click="toggleExistingEnq" class="q-ml-md q-mt-md" />
            </q-card-actions>
            
              <AdminEnquiryForm 
              :selectedEnq="subcatForEnq" 
              :backBtn="toggleExistingEnq" 
              :parentFetchEnqList="fetchEnquiryData"
              />
            
          </q-card>
      </q-dialog>

    </q-page>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, watch ,onMounted} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import AdminEnquiryForm from "../../components/Administrator/AdminEnquiryForm.vue";
import { useStore } from './../../stores';
const store = useStore();

const { selectedEnqId } = store.adm;


//For Update/Delete Cat
/******************/
const subcatForEnq = ref('');

const viewExistingEnq = ref(false);
const toggleExistingEnq = (row) => {
 
  subcatForEnq.value = row.enq_id;
  viewExistingEnq.value = !viewExistingEnq.value ;
};

/**********/

const router = useRouter();

const userName = ref('');

const status = ref('');
const userType = ref('');
const startDate = ref('');
const endDate = ref('');
const enquiryType = ref('');
const priorityLevel = ref('');

const showStartDatePicker = ref(false);
const showEndDatePicker = ref(false);

const toggleDatePicker = (datePicker: 'startDate' | 'endDate') => {
  if (datePicker === 'startDate') {
    showStartDatePicker.value = !showStartDatePicker.value;
  } else if (datePicker === 'endDate') {
    showEndDatePicker.value = !showEndDatePicker.value;
  }
};

const testClick = () =>{
  
  userName.value = '';
  status.value = '';
  userType.value = '';
  startDate.value = '';
  endDate.value = '';
  enquiryType.value = '';
  priorityLevel.value = '';


}

const onDatePickerBlur = (datePicker: 'startDate' | 'endDate') => {
  if (datePicker === 'startDate') {
    showStartDatePicker.value = false;
  } else if (datePicker === 'endDate') {
    showEndDatePicker.value = false;
  }
};

const onDatePickerInput = (datePicker: 'startDate' | 'endDate') => {
  // Handle date selection here if needed
  console.log(datePicker);
};

const statusOptions = [
  { label: 'RESPONDED', value: 'RESPONDED' },
  { label: 'OPEN', value: 'OPEN' }
];

const userTypeOptions = [
  { label: 'Business Owner', value: 'Business Owner' },
  { label: 'Member', value: 'Member' },
];

const enquiryTypeOptions = [
  { label: 'TRANSACTION', value: 'TRANSACTION' },
  { label: 'SOFTWARE ISSUE', value: 'SOFTWARE ISSUE' },
  { label: 'ENQUIRY', value: 'ENQUIRY' },
  { label: 'SERVICE', value: 'SERVICE' },
  { label: 'INCIDENT', value: 'INCIDENT' }
];

const priorityOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 }
];



const submitForm = () => {
  // Handle form submission
};

const resetForm = () => {
  // Reset form fields
};

//Items
const tableData = ref([
  { enq_id: 'E0026', enq_submitby: 'User 1', enq_subject : '', enq_message: '' ,enq_priority : '',enq_type : '' ,user_type: '', enq_submitdate: '', enq_status : '' , admin_id : 'dev_user'}

]);

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
    name: 'enq_submitby',
    required: true,
    label: 'Submitted By',
    align: 'left',
    field: 'enq_submitby',
    sortable: true,
  },
  {
    name: 'enq_priority',
    label: 'Priority',
    align: 'left',
    field: 'enq_priority',
    sortable: true,
  },
  {
    name: 'enq_type',
    label: 'Enquiry Type',
    align: 'left',
    field: 'enq_type',
    sortable: true,
  },
  {
    name: 'enq_subject',
    label: 'Enquiry Subject',
    align: 'left',
    field: 'enq_subject',
    sortable: true,
  },

  {
    name: 'enq_submitdate',
    label: 'Enquiry Date',
    align: 'left',
    field: 'enq_submitdate',
    sortable: true,
  },
  {
    name: 'enq_status',
    label: 'Enquiry Status',
    align: 'left',
    field: 'enq_status',
    sortable: true,
  },
  {
    name: 'user_type',
    label: 'User Type',
    align: 'left',
    field: 'user_type',
    sortable: true,
  },
  {
    name: 'action',
    label: '',
    align: 'right',
    field: '',
    sortable: false,
  },
]);

const tableColumns = ref([
  { name: 'id', required: true, label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'enq_submitby', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'enq_priority', required: true, label: 'Priority', align: 'left', field: 'Priority', sortable: true },
  { name: 'enq_status', label: 'Status', align: 'left', field: 'status', sortable: true },
  { name: 'user_type', label: 'User Type', align: 'left', field: 'user_type', sortable: true },
  { name: 'enq_submitdate', label: 'Date', align: 'left', field: 'date', sortable: true },
]);

//not sure why i have the red underline but it works
const viewRow = (row) => {
  router.push({path : '/admin/enquiry'});
  
  selectedEnqId.enq_id = row.enq_id;

};



const filteredList = computed(() => {  //filtering not working

  tableData.value.forEach((item)=>{

    //2000-12-12
    let fullDate = item.enq_submitdate.slice(0,10);
    
    //200/12/12
    item.enq_submitdate = fullDate.slice(0,4) + "/" + fullDate.slice(5,7) + "/" +  fullDate.slice(8,10);

  })

  return tableData.value.filter((item) => {
    return (
      (!userName.value || item.enq_submitby.toLowerCase().includes(userName.value.toLowerCase())) &&
      (!status.value.value || item.enq_status === status.value.value) &&
      (!userType.value.value || item.user_type === userType.value.value) &&
      (!enquiryType.value.value || item.enq_type === enquiryType.value.value) &&
      (!priorityLevel.value.value || item.enq_priority === priorityLevel.value.value) &&

      (!startDate.value || item.enq_submitdate >= startDate.value) &&
      (!endDate.value || item.enq_submitdate <= endDate.value)
    );
  });
});

// Watch for changes in filter inputs and update the filtered list
watch([userName, status, userType, startDate, endDate, filteredList], () => {
  // The computed property `filteredList` will automatically update here

  console.log(startDate);
  console.log(status.value.value );
  console.log(userType.value.value );

  console.log(filteredList);


});





//API Fetch
const fetchEnquiryData = async () => {
  try {
    
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/enquiry/getAllEnquiries`);
    
    console.log(response);
    if (response.statusText === "OK") {

      tableData.value = response.data;
      
      console.log(tableData);
      console.log(tableData.value);
      
      
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};



onMounted(() => {
  fetchEnquiryData();

});
</script>


<style scoped lang="scss">
.date-pickers {
  display: flex;
  flex-direction: row;
}

.date-picker {
  display: inline-block;
  margin-right: 10px;
  /* Adjust as needed */
  cursor: pointer;
  transition: all 0.3s ease;
  /* Smooth transition */
}

.date-picker:hover,
.date-picker:focus-within {
  transform: scale(1.05);
  /* Scale up on hover or when focused within */
}
</style>
