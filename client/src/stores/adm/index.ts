import { defineStore } from "pinia";
import { ref } from "vue";

import { List } from "postcss/lib/list";

export const useAdminStore = defineStore("administrator", () => {
  const selectedCatId = ref({
    cat_id : ''
  });

    const selectedEnqId = ref({
        enq_id : ''
      });

    const selectedBizId = ref({
        biz_id : ''
      });  


  return {
    selectedCatId,
    selectedEnqId,
    selectedBizId

  };
});

