<template>
    <div>
      <h1 class="text-2xl font-semibold mb-4">Feedback Form</h1>
  
      <!-- Normal Flow: Step 1 -->
      <div v-if="step === 1" class="mb-4">
        <p>Select Feedback Type:</p>
        <label for="feedbackTypeReport">
          <input
            type="radio"
            id="feedbackTypeReport"
            value="Report an Issue"
            v-model="selectedFeedbackType"
            class="mr-2"
          />
          Report an Issue
        </label>
        <label for="feedbackTypeSuggestion">
          <input
            type="radio"
            id="feedbackTypeSuggestion"
            value="Provide Suggestions"
            v-model="selectedFeedbackType"
            class="mr-2"
          />
          Provide Suggestions
        </label>
        <button @click="proceedToStep(2)" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Next
        </button>
      </div>
  
      <!-- Normal Flow: Step 2 -->
      <div v-else-if="step === 2" class="mb-4">
        <p>Business owners input their comments in form fields:</p>
        <textarea
          v-model="feedbackComments"
          placeholder="Enter your feedback comments"
          class="w-full px-3 py-2 rounded-md border border-gray-300"
        ></textarea>
        <button @click="proceedToStep(3)" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Next
        </button>
      </div>
  
      <!-- Normal Flow: Step 3 (Feedback Submitted Successfully) -->
      <div v-else-if="step === 3" class="mb-4">
        <p>Feedback submitted successfully.</p>
        <!-- Change to direct to HOME -->
        <button @click="resetSteps" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Home
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const step = ref(1);
  const selectedFeedbackType = ref('');
  const feedbackComments = ref('');
  
  function proceedToStep(nextStep) {
    step.value = nextStep;
  }
  function submitFeedback() {
    // Implement logic to save feedback
    // Display success message and move to Step 3
    proceedToStep(3);
  }
  function cancelFeedback() {
    // Implement logic to cancel feedback submission
    resetSteps();
  }
  function resetSteps() {
    // Reset all steps and data
    step.value = 1;
    selectedFeedbackType.value = '';
    feedbackComments.value = '';
  }
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  .text-2xl {
    font-size: 1.5rem; /* Adjust the font size as needed */
  }
  
  .mb-4 {
    margin-bottom: 1rem; /* Adjust the margin as needed */
  }
  
  .mr-2 {
    margin-right: 0.5rem; /* Adjust the margin as needed */
  }
  
  .mt-4 {
    margin-top: 1rem; /* Adjust the margin as needed */
  }
  
  .w-full {
    width: 100%; /* Set width to 100% */
  }
  
  .px-3 {
    padding-left: 0.75rem; /* Adjust the padding as needed */
    padding-right: 0.75rem; /* Adjust the padding as needed */
  }
  
  .py-2 {
    padding-top: 0.5rem; /* Adjust the padding as needed */
    padding-bottom: 0.5rem; /* Adjust the padding as needed */
  }
  
  .rounded-md {
    border-radius: 0.375rem; /* Adjust the border radius as needed */
  }
  
  .border {
    /* Add your border styles here */
    border-width: 1px;
    border-color: #d1d5db; /* Adjust the border color as needed */
  }
  
  .border-gray-300 {
    /* Add your border styles here */
    border-color: #e5e7eb; /* Adjust the border color as needed */
  }
  
  .bg-blue-500 {
    background-color: #2563eb; /* Adjust the background color as needed */
  }
  
  .text-white {
    color: #fff; /* Adjust the text color as needed */
  }
  
  .hover\:bg-blue-600:hover {
    background-color: #3b82f6; /* Adjust the hover background color as needed */
  }
  </style>
  