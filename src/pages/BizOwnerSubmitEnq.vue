<template>
    <div>
      <h1 class="text-2xl font-semibold mb-4">Feedback Form</h1>

      <!-- Normal Flow: Step 1 -->
      <div v-if="step === 1">
        <p>Select Feedback Type:</p>
        <label for="feedbackTypeReport">
          <input
            type="radio"
            id="feedbackTypeReport"
            value="Report an Issue"
            v-model="selectedFeedbackType"
          />
          Report an Issue
        </label>
        <label for="feedbackTypeSuggestion">
          <input
            type="radio"
            id="feedbackTypeSuggestion"
            value="Provide Suggestions"
            v-model="selectedFeedbackType"
          />
          Provide Suggestions
        </label>
        <button @click="proceedToStep(2)">Next</button>
      </div>
  
      <!-- Normal Flow: Step 2 -->
      <div v-else-if="step === 2">
        <p>Business owners input their comments in form fields.</p>
        <textarea v-model="feedbackComments" placeholder="Enter your feedback comments"></textarea>
        <button @click="proceedToStep(3)">Next</button>
      </div>
  
      <!-- Normal Flow: Step 3 (Feedback Submitted Successfully) -->
      <div v-else-if="step === 3">
        <p>Feedback submitted successfully.</p>
        <button @click="resetSteps">End</button>
      </div>
    </div>
  </template>
  
  <script setup>

import { ref } from 'vue';

        const step = ref(1);
        const selectedFeedbackType = ref(''); // Feedback type: "Report an Issue" or "Provide Suggestions"
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
  </style>
  

  