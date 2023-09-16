<template>
  <div>
    <SearchBar v-model="searchQuery" class="q-mb-md" />

    <q-table :rows="filteredProducts" :rows-per-page-options="[5, 10, 20, 30]" :columns="columns"
      :row-key="row => row.id" grid card-class="bg-blue-7 text-white">
    </q-table>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import SearchBar from './SearchBar.vue';

const searchQuery = ref('');
const pagination = ref({
  sortBy: 'prod_name',
  descending: false,
  page: 1,
  rowsPerPage: 5,
});

const products = ref([
  {
    prod_id: 'P0PJ001',
    prod_name: 'Golf Club Set',
    prod_description: 'Complete set of golf clubs for all skill levels.',
    prod_stockqty: 15,
    prod_price: 499.99,
    prod_modelnum: 'GC-001',
    cat_id: 'Golf',
    sub_cat: 'Equipment',
    prod_status: 'Not Available',
    biz_name: 'Pearl Jam Sporting Goods'
  },
  {
    prod_id: 'P0PJ002',
    prod_name: 'Golf Ball Pack',
    prod_description: 'High-quality golf balls for maximum distance and accuracy.',
    prod_stockqty: 50,
    prod_price: 29.99,
    prod_modelnum: 'GB-002',
    cat_id: 'Golf',
    sub_cat: 'Equipment',
    prod_status: 'Available',
    biz_name: 'Pearl Jam Sporting Goods'
  },
  {
    prod_id: 'P0PJ003',
    prod_name: 'Golf Glove',
    prod_description: 'Premium leather golf glove for a comfortable grip.',
    prod_stockqty: 30,
    prod_price: 19.99,
    prod_modelnum: 'GG-003',
    cat_id: 'Golf',
    sub_cat: 'Apparel',
    prod_status: 'Not Available',
    biz_name: 'Pearl Jam Sporting Goods'
  },
  {
    prod_id: 'P0PJ004',
    prod_name: 'Golf Cart Bag',
    prod_description: 'Lightweight and durable cart bag for your golf clubs.',
    prod_stockqty: 20,
    prod_price: 129.99,
    prod_modelnum: 'GB-004',
    cat_id: 'Golf',
    sub_cat: 'Equipment',
    prod_status: 'Available',
    biz_name: 'Pearl Jam Sporting Goods'
  },
  {
    prod_id: 'P0PJ005',
    prod_name: 'Golf Polo Shirt',
    prod_description: 'Stylish polo shirt designed for golfers.',
    prod_stockqty: 40,
    prod_price: 39.99,
    prod_modelnum: 'GPS-005',
    cat_id: 'Golf',
    sub_cat: 'Apparel',
    prod_status: 'Available',
    biz_name: 'Pearl Jam Sporting Goods'
  },
  {
    prod_id: 'P0PJ006',
    prod_name: 'Golf Umbrella',
    prod_description: 'Large golf umbrella for sun and rain protection on the course.',
    prod_stockqty: 25,
    prod_price: 24.99,
    prod_modelnum: 'GU-006',
    cat_id: 'Golf',
    sub_cat: 'Equipment',
    prod_status: 'Available',
    biz_name: 'Pearl Jam Sporting Goods'
  },
  {
    prod_id: 'P0PJ007',
    prod_name: 'Golf Driver',
    prod_description: 'High-performance golf driver for long drives.',
    prod_stockqty: 10,
    prod_price: 249.99,
    prod_modelnum: 'GD-007',
    cat_id: 'Golf',
    sub_cat: 'Equipment',
    prod_status: 'Available',
    biz_name: 'Pearl Jam Sporting Goods'
  },
  {
    prod_id: 'P0PJ008',
    prod_name: 'Golf Shoes',
    prod_description: 'Comfortable and spikeless golf shoes for better traction.',
    prod_stockqty: 35,
    prod_price: 79.99,
    prod_modelnum: 'GS-008',
    cat_id: 'Golf',
    sub_cat: 'Footwear',
    prod_status: 'Available',
    biz_name: 'Pearl Jam Sporting Goods'
  },
  {
    prod_id: 'P0PJ009',
    prod_name: 'Golf Putting Mat',
    prod_description: 'Practice your putting skills at home with this mat.',
    prod_stockqty: 15,
    prod_price: 49.99,
    prod_modelnum: 'GPM-009',
    cat_id: 'Golf',
    sub_cat: 'Equipment',
    prod_status: 'Available',
    biz_name: 'Pearl Jam Sporting Goods'
  },
  {
    prod_id: 'P0PJ010',
    prod_name: 'Golf Sun Visor',
    prod_description: 'Visor hat with UV protection for sunny days on the golf course.',
    prod_stockqty: 30,
    prod_price: 14.99,
    prod_modelnum: 'GSV-010',
    cat_id: 'Golf',
    sub_cat: 'Apparel',
    prod_status: 'Available',
    biz_name: 'Pearl Jam Sporting Goods'
  },
]);

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
  // {
  //   name: 'prod_id',
  //   required: true,
  //   label: 'ID',
  //   align: 'left',
  //   field: 'prod_id',
  //   sortable: true,
  // },
  {
    name: 'prod_name',
    required: true,
    label: 'Product Name',
    align: 'left',
    field: row => row.prod_name + ' (' + row.prod_modelnum + ')',
    sortable: true,
  },
  {
    name: 'prod_description',
    label: 'Description',
    align: 'left',
    field: 'prod_description',
    sortable: true,
  },
  {
    name: 'prod_stockqty',
    label: 'Stock Quantity',
    align: 'right',
    field: 'prod_stockqty',
    sortable: true,
  },
  {
    name: 'prod_price',
    label: 'Price',
    align: 'right',
    field: row => '$' + row.prod_price,
    sortable: true,
  },
  // {
  //   name: 'prod_modelnum',
  //   label: 'SKU',
  //   align: 'left',
  //   field: 'prod_modelnum' ,
  //   sortable: true,
  // },
  {
    name: 'cat_id',
    label: 'Category',
    align: 'left',
    field: row => row.cat_id + ' - ' + row.sub_cat,
    sortable: true,
  },
  // {
  //   name: 'sub_cat',
  //   label: 'Sub Category',
  //   align: 'left',
  //   field: 'sub_cat',
  //   sortable: true,
  // },
  {
    name: 'biz_name',
    label: 'Seller',
    align: 'left',
    field: 'biz_name',
    sortable: true,
  },
]);

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const searchString = searchQuery.value.toLowerCase();

    return (
      Object.values(product)
        .map((value) => (typeof value === 'string' ? value.toLowerCase() : value))
        .some((value) => value.toString().includes(searchString))
    );
  }).slice(
  );
});

const stockQtyStyle = ref((stockQty) => {
  return {
    color: stockQty < 20 ? 'red' : 'inherit',
    'font-weight': stockQty < 20 ? 'bold' : 'normal',
  };
});

const toggleRowExpansion = (row) => {
  row.expanded = !row.expanded;
};

</script>
