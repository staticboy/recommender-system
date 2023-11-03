<template>
  <div>
    <q-page>
      <div class="q-pa-md">
        <h1>Admin Category Management</h1>
      </div>

      <q-tabs v-model="selectedTab">
          <q-tab name="tab1" label="Categories">
          </q-tab>
          <q-tab name="tab2" label="Sub Categories">
          </q-tab>
        </q-tabs>

      <div v-if="selectedTab === 'tab1'"> 
        <q-form @submit="submitForm" @reset="resetForm">
        <q-card class="q-mb-md">
          <q-card-section>
            <q-form>
              <div class="row q-gutter-md mb-4">
                <div class="col-3">
                  <q-input v-model="userName" label="Category" outlined placeholder="Enter user name"></q-input>
                </div>

                <div class="col-3">
                  <q-select v-model="status" label="Status" outlined :options="statusOptions"></q-select>
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
            <!-- <q-btn label="Search" color="primary" type="submit" />   to="../admin/cat-new"-->
            <q-btn label="Reset" color="primary" type="reset" />
            <q-btn label="Add Category" color="secondary" @click="toggleNewForm" />

          </q-card-actions>
        </q-card>
      </q-form>
      <!--Cat New-->
      <q-dialog v-model="viewClosedNew">
          <q-card style="width: 960px; max-width: 80vw;">
            <q-card-actions align="right">
              <q-btn icon="close" size="md" flat @click="toggleNewForm" class="q-ml-md q-mt-md" />
            </q-card-actions>

            <AdminCatNewProfile :exampleProp="somevar" :backBtn="toggleNewForm" :parentFetchCategoryData="fetchCategoryData"/>
            <q-card-section>
              

            </q-card-section>

          </q-card>
      </q-dialog>

      <q-table :rows="filteredList" :columns="columns">
        <template v-slot:body="props">
         <q-tr :props="props">          
            <q-td key="cat_id" :props="props">
              {{ props.row.cat_id }}
            </q-td>
            <q-td key="cat_name" :props="props">
              {{ props.row.cat_name }}
            </q-td>
            <q-td key="cat_status" :props="props">
              {{ props.row.cat_status }}
            </q-td>           
            <q-td>
              <q-btn color="primary" label="View" @click="/*viewRow(props.row)*/viewClosedEnq(props.row)" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <!--Cat Update/delete-->
      <q-dialog v-model="viewClosed">
          <q-card style="width: 960px; max-width: 80vw;">
            <q-card-actions align="right">
              <q-btn icon="close" size="md" flat @click="closeDialog" class="q-ml-md q-mt-md" />
            </q-card-actions>

            <AdminCatProfile :exampleProp="somevar" :backBtn="closeDialog" :parentFetchCategoryData="fetchCategoryData"/>
          </q-card>
      </q-dialog>


      </div>
        <div v-if="selectedTab === 'tab2'"> 
        <q-form @submit="submitForm" @reset="resetForm">
        <q-card class="q-mb-md">
          <q-card-section>
            <q-form>
              <div class="row q-gutter-md mb-4">

                <div class="col-3">
                  <q-input v-model="userName" label="Sub Category" outlined placeholder="Enter Sub Category"></q-input>
                </div>

                <div class="col-3">
                  <q-select v-model="status" label="Status" outlined :options="statusOptions"></q-select>
                </div>

              </div>

           
            </q-form>
          </q-card-section>
          <q-card-actions align="right">
            <!-- <q-btn label="Search" color="primary" type="submit" /> -->
            <q-btn label="Reset" color="primary" type="reset" />
            <q-btn label="Add Sub Category" color="secondary" @click="toggleNewFormviewSubcatNew"/>

          </q-card-actions>
        </q-card>
      </q-form>

      <q-dialog v-model="viewSubcatNew">
          <q-card style="width: 960px; max-width: 80vw;">
            <q-card-actions align="right">
              <q-btn icon="close" size="md" flat @click="toggleNewFormviewSubcatNew" class="q-ml-md q-mt-md" />
            </q-card-actions>

            <AdminSubCategoryNewProfile
             :backBtn="toggleNewFormviewSubcatNew" 
             :parentFetchCategoryData="fetchSubCategoryData"
             />
            <q-card-section>
              

            </q-card-section>

          </q-card>
      </q-dialog>

      <q-table :rows="filteredSubCatList" :columns="columnsSubCat">
        <template v-slot:body="props">
         <q-tr :props="props">
          
            <q-td key="subcat_name" :props="props">
              {{ props.row.subcat_name }}
            </q-td>

            <q-td key="subcat_status" :props="props">
              {{ props.row.subcat_status == 'Y' ? 'Active' : 'Inactive'}}
            </q-td>

            <q-td>
              <q-btn color="primary" label="View" @click="toggleExistingSubCat(props.row)" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <!--SubCat Update/delete-->
      <q-dialog v-model="viewExistingSubCat">
          <q-card style="width: 960px; max-width: 80vw;">
            <q-card-actions align="right">
              <q-btn icon="close" size="md" flat @click="toggleExistingSubCat" class="q-ml-md q-mt-md" />
            </q-card-actions>

            <AdminSubCategoryProfile 
            :selectedSubCatName="subcatForChild" 
            :backBtn="toggleExistingSubCat" 
            :parentFetchCategoryData="fetchSubCategoryData"
            />
          </q-card>
      </q-dialog>


      </div>


    </q-page>
  </div>
</template>


<script setup lang="ts">
import AdminCatProfile from "../../components/Administrator/AdminCatProfile.vue";
import AdminCatNewProfile from "../../components/Administrator/AdminCatNewProfile.vue";
import AdminSubCategoryNewProfile from "../../components/Administrator/AdminSubCategoryNewProfile.vue";
import AdminSubCategoryProfile from "../../components/Administrator/AdminSubCategoryProfile.vue";




import { ref, computed, watch ,onMounted} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import { useStore } from './../../stores';
const store = useStore();
const { selectedCatId, selectedSubCat } = store.adm;


const selectedTab = ref('tab1');

//For Update/Delete Cat
/***************** */
const viewClosed = ref(false);
const viewClosedEnq = (row) => {
  somevar.value = row.cat_id;
  console.log(somevar.value)
  viewClosed.value = true;
};
const closeDialog = (row) => {
  viewClosed.value = false;
};
/********************* */
//For New Cat
/****************** */
const viewClosedNew = ref(false);
const toggleNewForm = () => {
  viewClosedNew.value = !viewClosedNew.value ;
};
/********************* */

//For New Sub Cat
/****************** */
const viewSubcatNew = ref(false);
const toggleNewFormviewSubcatNew = () => {
  viewSubcatNew.value = !viewSubcatNew.value ;
};
/**********************/

//For Update/Delete Cat
/******************/

const viewExistingSubCat = ref(false);
const toggleExistingSubCat = (row) => {
  subcatForChild.value = row.subcat_name;
  viewExistingSubCat.value = !viewExistingSubCat.value ;
};

/**********/

const router = useRouter();

const userName = ref('');

const status = ref('');
const userType = ref('');
const startDate = ref('');
const endDate = ref('');
const somevar = ref('');
const subcatForChild = ref('');



const showStartDatePicker = ref(false);
const showEndDatePicker = ref(false);

const toggleDatePicker = (datePicker: 'startDate' | 'endDate') => {
  if (datePicker === 'startDate') {
    showStartDatePicker.value = !showStartDatePicker.value;
  } else if (datePicker === 'endDate') {
    showEndDatePicker.value = !showEndDatePicker.value;
  }
};

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
  { label: 'ACTIVE', value: 'ACTIVE' },
  { label: 'INACTIVE', value: 'INACTIVE' },
  { label: 'Default', value: '' }
];

const userTypeOptions = [
  { label: 'Business Owner', value: 'B' },
  { label: 'Member', value: 'M' },
];

const submitForm = () => {
  // Handle form submission
};

const resetForm = () => {
  // Reset form fields
};

//Items
const tableData = ref([
  { enq_id: 'E0026', enq_submitby: 'User 1', enq_subject : '', enq_message: '' ,userType: '', enq_submitdate: '', enq_status : '' , admin_id : 'dev_user'}

]);

const tableSubData = ref([
  { date_updated : "2023-10-25T02:35:06.799Z",
    subcat_name : "EQUIPMENT",
    subcat_status : "Y"
  }

]);

const columns = computed(() => [
  {
    name: 'cat_id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'cat_id',
    sortable: true,
  },
  {
    name: 'cat_name',
    required: true,
    label: 'Category',
    align: 'left',
    field: 'cat_name',
    sortable: true,
  },

  {
    name: 'cat_status',
    label: 'Status',
    align: 'left',
    field: 'cat_status',
    sortable: true,
  },


  {
    name: 'action',
    label: '',
    align: 'right',
    field: '',
    sortable: false,
  }
]);

const columnsSubCat = computed(() => [

  {
    name: 'subcat_name',
    required: true,
    label: 'Sub Category',
    align: 'left',
    field: 'subcat_name',
    sortable: true,
  },

  {
    name: 'subcat_status',
    label: 'Status',
    align: 'left',
    field: 'cat_status',
    sortable: true,
  },


  {
    name: 'action',
    label: '',
    align: 'right',
    field: '',
    sortable: false,
  }
]);




const tableColumns = ref([
  { name: 'id', required: true, label: 'ID', align: 'left', field: 'cat_id', sortable: true },
  { name: 'enq_submitby', required: true, label: 'Name', align: 'left', field: 'cat_name', sortable: true },
  { name: 'enq_status', label: 'Status', align: 'left', field: 'cat_status', sortable: true }
]);

//not sure why i have the red underline but it works
const viewRow = (row) => {
  router.push({path : '/admin/cat-profile'});  
  selectedCatId.cat_id = row.cat_id;

};

const viewSubCatRow = (row : any) => {

  selectedSubCat.subcat_name = row.subcat_name;

  router.push({path : '/admin/subcat-profile'});  

};



const filteredList = computed(() => {  //filtering not working
  return tableData.value.filter((item) => {
    return (
      (!userName.value || item.cat_name.toLowerCase().includes(userName.value.toLowerCase())) &&
      (!status.value || item.cat_status === status.value) 
    );
  });
});

const filteredSubCatList = computed(() => {  //filtering not working
  return tableSubData.value.filter((item) => {
    return (
      (!userName.value || item.subcat_name.toLowerCase().includes(userName.value.toLowerCase())) &&
      (!status.value || item.subcat_status === status.value) 
    );
  });
});

// Watch for changes in filter inputs and update the filtered list
watch([userName, status, userType, startDate, endDate], () => {
  // The computed property `filteredList` will automatically update here
});





//API Fetch category
const fetchCategoryData = async () => {
  try {
    
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/getCatAll`);
    
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

//Api fetch subcategory
const fetchSubCategoryData = async () => {
  try {
    
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/getSubCatAll`);
    
    console.log(response);
    if (response.statusText === "OK") {

    console.log(response.data);
    tableSubData.value = response.data;
      
      
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

onMounted(() => {
  fetchCategoryData();
  fetchSubCategoryData();
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
