<template>
  <div>
    <q-page>
      <div class="q-pa-md">
        <h1>Admin Business Management List</h1>
      </div>
      <div class="row q-gutter-md mb-4">
        <div class="col-3">
          <q-input v-model="bizName" label="Buisness Name" outlined placeholder="Enter user business"></q-input>
        </div>
        <div class="col-3">
          <q-select v-model="accStatus" label="Status" outlined :options="statusOptions"></q-select>
        </div>
        <q-card-actions align="right">
            <!-- <q-btn label="Search" color="primary" type="submit" /> -->
            <q-btn label="Reset" color="primary" type="reset" @click="testClick" />
          </q-card-actions>
      </div>

      <q-table :rows="filteredList" :rows-per-page-options="[10, 20, 30]" :columns="columns">
        <!-- Add a custom column for the button -->
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="biz_id" :props="props">{{ props.row.biz_id }}</q-td>
            <q-td key="biz_name" :props="props">{{ props.row.biz_name }}</q-td>
            <q-td key="biz_phoneno" :props="props">{{ props.row.biz_phoneno }}</q-td>
            <q-td key="biz_status" :props="props">{{ props.row.biz_status }}</q-td>
            <q-td auto-width key="action" :props="props">
              <q-btn type="button" color="primary" label="View" @click="toggleExistingBiz(props.row.biz_id)" dense />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-dialog v-model="viewExistingBiz">
          <q-card style="width: 960px; max-width: 80vw;">
            <q-card-actions align="right">
              <q-btn icon="close" size="md" flat @click="toggleExistingBiz" class="q-ml-md q-mt-md" />
            </q-card-actions>
            <AdminBusinessProfile
            :selectedBizId="bizIdForChild" 
            :backBtn="toggleExistingBiz" 
            :parentFetchCategoryData="fetchBizData"
            />

          </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import AdminBusinessProfile from "../../components/Administrator/AdminBusinessProfile.vue";
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useStore } from './../../stores';

const store = useStore();
const { selectedBizId } = store.adm;

const router = useRouter();
const bizList = ref([]);

const bizName = ref('');
const accStatus = ref('');
const fromDate = ref('');
const toDate = ref('');



//For Update/Delete Cat
/******************/
const bizIdForChild = ref('');

const viewExistingBiz = ref(false);
const toggleExistingBiz = (row) => {
  bizIdForChild.value = row;
  console.warn(bizIdForChild.value);
  viewExistingBiz.value = !viewExistingBiz.value ;
};

const statusOptions = [
  { label: 'VERIFIED', value: 'VERIFIED' },
  { label: 'UNVERIFIED', value: 'UNVERIFIED' },
  { label: 'DISABLED', value: 'DISABLED' },
];

const testClick = () =>{
  bizName.value = '';
  accStatus.value = '';
}

const columns = computed(() => [
  {
    name: 'biz_id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'biz_id',
    sortable: true,
  },
  {
    name: 'biz_name',
    required: true,
    label: 'Business Name',
    align: 'left',
    field: 'biz_name',
    sortable: true,
  },

  {
    name: 'biz_phoneno',
    label: 'Phone',
    align: 'left',
    field: 'biz_phoneno',
    sortable: true,
  },
  {
    name: 'biz_status',
    label: 'Status',
    align: 'left',
    field: 'biz_status',
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

const filteredList = computed(() => {
  return bizList.value.filter((b) => {
    return (
      (!bizName.value || b.biz_name.toLowerCase().includes(bizName.value.toLowerCase() )) &&
      (!accStatus.value.value || b.biz_status.toLowerCase().includes(accStatus.value.value.toLowerCase() ))
    );
  });
});


//API Fetch
const fetchBizData = async () => {
  try {
    
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/business/getAll2`);
    
    console.log(response);
    if (response.statusText === "OK") {

      bizList.value = response.data;
      console.log(bizList.value);
      
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

watch([viewExistingBiz], () => {
  fetchBizData();
});

onMounted(() => {
  console.log(store.adm);

  fetchBizData();
});

</script>


<style scoped lang="scss"></style>
