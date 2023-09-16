<template>
    <q-input v-model="searchQuery" outlined placeholder="Search..." rounded @input="$emit('search', searchQuery)">
        <template v-slot:prepend>
            <q-icon name="search" />
        </template>
    </q-input>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
</script>
  