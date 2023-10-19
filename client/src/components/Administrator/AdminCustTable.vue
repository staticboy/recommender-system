<template>
    <div>
        <SearchBar v-model="searchQuery" class="q-mb-md" />

        <q-table :rows="filteredCustomers" :rows-per-page-options="[5, 10, 20, 30]" :columns="columns"
            :row-key="row => row.id">
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                    </q-th>
                    <q-td auto-width />
                </q-tr>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        <template v-if="col.name === 'prod_status'">
                            <q-badge :color="props.row.prod_status === 'Available' ? 'green' : 'red'"
                                :label="props.row.prod_status" />
                        </template>
                        <template v-else-if="col.name === 'prod_stockqty'">
                            <span :style="stockQtyStyle(props.row.prod_stockqty)">
                                {{ props.row.prod_stockqty }}
                            </span>
                        </template>
                        <template v-else>
                            {{ props.row[col.field] }}
                        </template>
                    </q-td>
                    <q-td auto-width>
                        <q-btn type="submit" color="primary" label="View Profile" @click="viewProfile(props.row)"
                            class="q-mt-md q-mr-md" dense />
                    </q-td>
                    <q-td auto-width>
                        <q-btn type="submit" color="red" label="Delete" @click="deleteRow(props.row)"
                            class="q-mt-md q-mr-md" dense />
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>


<script setup>
import { ref, computed, watch, reactive, onMounted } from 'vue';
import SearchBar from '../SearchBar.vue';
import { DEMO_CUSTOMER_LIST } from '../../constants.ts'
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useStore } from './../../stores';


const store = useStore();

const router = useRouter();
const filteredCustomerRef = ref([...DEMO_CUSTOMER_LIST]);
const searchQuery = ref('');
const pagination = ref({
    sortBy: 'prod_name',
    descending: false,
    page: 1,
    rowsPerPage: 5,
});

const viewProfile = (row) => {
    router.push({ path: '../admin/customer-profile', query: { id: row.user_id } });
};

const deleteRow = (key) => {
    //remove item via api
    filteredCustomerRef.value.splice(key, 1);
    q.notify({
        message: "Deleted from cart",
        icon: "delete",
        color: "positive",
    });
};

const categoryOptions = computed(() => [
    'Golf',
    'Tennis',
    'Basketball',
    'Soccer',
]);

const subCategoryOptions = computed(() => [
    'Equipment',
    'Apparel',
    'Accesories',
    'Footwear',
]);

const availabilityOptions = computed(() => [
    'Available',
    'Not Available',
]);

const columns = computed(() => [
    {
        name: 'user_id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'user_id',
        sortable: true,
    },
    {
        name: 'user_name',
        required: true,
        label: 'Name',
        align: 'left',
        field: 'user_name',
        sortable: true,
    },
    {
        name: 'last_login_date',
        label: 'Last Login Date',
        align: 'left',
        field: 'log_timestamp',
        sortable: true,
    },

    {
        name: 'status',
        label: 'status',
        align: 'left',
        field: 'user_status',
        sortable: true,
    },
    {
        name: 'action',
        label: '',
        align: '',
        field: '',
        sortable: true,
    },    {
        name: 'action',
        label: '',
        align: '',
        field: '',
        sortable: true,
    },
]);

/*
const filteredCustomers = computed(() => {
    return filteredCustomerRef.value.filter((product) => {
        const searchString = searchQuery.value.toLowerCase();
        return (
            Object.values(product)
                .map((value) => (typeof value === 'string' ? value.toLowerCase() : value))
                .some((value) => value.toString().includes(searchString))
        );
    }).slice(
    );
});
*/

const filteredCustomers = computed(() => {
  return filteredCustomerRef.value.filter((b) => {
    return (
      (!searchQuery.value || b.user_name.toLowerCase().includes(searchQuery.value.toLowerCase() ))
    );
  });
});

const stockQtyStyle = ref((stockQty) => {
    return {
        color: stockQty < 20 ? 'red' : 'inherit',
        'font-weight': stockQty < 20 ? 'bold' : 'normal',
    };
});

const fetchMemberData = async () => {
  try {
    
    console.log("invoke");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/member/getAll`);
    
    console.log(response);
    if (response.statusText === "OK") {
      console.log(response.data);
      filteredCustomerRef.value = response.data;
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};


onMounted(async () => {
  console.log(store.adm);
  await fetchMemberData();

});


</script>