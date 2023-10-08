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
                <div class="col-3">
                  <q-input v-model="userName" label="User" outlined placeholder="Enter user name"></q-input>
                </div>

                <div class="col-3">
                  <q-select v-model="status" label="Status" outlined :options="statusOptions"></q-select>
                </div>

                <div class="col-3">
                  <q-select v-model="userType" label="User Type" outlined :options="userTypeOptions"></q-select>
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
            <q-btn label="Reset" color="primary" type="reset" />
          </q-card-actions>
        </q-card>
      </q-form>

      <q-table :rows="filteredList">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
            </q-td>
            <q-td key="userType" :props="props">
              {{ props.row.userType }}
            </q-td>
            <q-td key="date" :props="props">
              {{ props.row.date }}
            </q-td>
            <q-td>
              <q-btn color="primary" label="View" @click="viewRow()" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

    </q-page>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userName = ref('');
const status = ref('');
const userType = ref('');
const startDate = ref('');
const endDate = ref('');

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
  { label: 'Responded', value: 'Responded' },
  { label: 'Open', value: 'Open' },
  { label: 'Closed', value: 'Closed' },
  { label: 'Default', value: '' },
];

const userTypeOptions = [
  { label: 'Business Owner', value: 'Business Owner' },
  { label: 'Member', value: 'Member' },
];

const submitForm = () => {
  // Handle form submission
};

const resetForm = () => {
  // Reset form fields
};

const tableData = ref([
  { id: 1, name: 'User 1', status: 'Closed', userType: 'Member', date: '2023-10-01' },
  { id: 2, name: 'User 2', status: 'Open', userType: 'Business Owner', date: '2023-10-02' },
  { id: 3, name: 'User 3', status: 'Responded', userType: 'Member', date: '2023-10-03' },
]);

const tableColumns = ref([
  { name: 'id', required: true, label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
  { name: 'userType', label: 'User Type', align: 'left', field: 'userType', sortable: true },
  { name: 'date', label: 'Date', align: 'left', field: 'date', sortable: true },
]);

const viewRow = () => {
  router.push('/admin/enquiry');
};

const filteredList = computed(() => {  //filtering not working
  return tableData.value.filter((item) => {
    return (
      (!userName.value || item.name.toLowerCase().includes(userName.value.toLowerCase())) &&
      (!status.value || item.status === status.value) &&
      (!userType.value || item.userType === userType.value) &&
      (!startDate.value || item.date >= startDate.value) &&
      (!endDate.value || item.date <= endDate.value)
    );
  });
});

// Watch for changes in filter inputs and update the filtered list
watch([userName, status, userType, startDate, endDate], () => {
  // The computed property `filteredList` will automatically update here
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
