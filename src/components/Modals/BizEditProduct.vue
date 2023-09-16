<template>
    <q-dialog v-model="showModal" class="modal">
        <q-card>
            <q-card-section>
                <!-- Your edit form fields go here -->
                <q-input v-model="editedProduct.prod_name" label="Product Name" />
                <q-input v-model="editedProduct.prod_description" label="Description" />
                <!-- Add more fields for other product properties -->
            </q-card-section>

            <q-card-actions align="right">
                <q-btn label="Cancel" color="primary" @click="closeModal" />
                <q-btn label="Save" color="primary" @click="saveChanges" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
  
<script setup>
import { ref } from 'vue';

const showModal = ref(false);
const editedProduct = ref({});

const openModal = (product) => {
    showModal.value = true;
    editedProduct.value = { ...product };
};

const closeModal = () => {
    showModal.value = false;
};

const saveChanges = () => {
    // Save handler
    closeModal();
};
</script>


<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top of other content */
}

/* Add more styles for modal content if needed */
</style>
  
  