import { defineStore } from "pinia";
import { computed, ref } from "vue";

/**
 * Options Store
 */
// export const useCounterStore = defineStore("counter", {
//   state: () => ({
//     counter: 0,
//   }),
//   getters: {
//     doubleCount: (state) => state.counter * 2,
//   },
//   actions: {
//     increment() {
//       this.counter++;
//     },
//   },
// });

/**
 * Setup Store, our preferred way
 */
export const useCounterStore = defineStore("counter", () => {
  const counter = ref(0);

  const doubleCount = computed(() => counter.value * 2);

  const increment = () => {
    counter.value++;
  };

  return {
    counter,
    doubleCount,
    increment,
  };
});
