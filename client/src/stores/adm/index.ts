import { defineStore } from "pinia";
import { ref } from "vue";

import { List } from "postcss/lib/list";

export const useAdminStore = defineStore("administrator", () => {


    const selectedEnqId = ref({
        enq_id : ''
      });


  return {
    selectedEnqId

  };
});

