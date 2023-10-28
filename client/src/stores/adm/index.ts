import { defineStore } from "pinia";
import { ref } from "vue";

import { List } from "postcss/lib/list";

export const useAdminStore = defineStore("administrator", () => {
  const selectedCatId = ref({
    cat_id : ''
  });

  const selectedSubCat = ref({
    subcat_name : ''
  });

    const selectedEnqId = ref({
        enq_id : ''
      });

    const selectedBizId = ref({
        biz_id : ''
      });  


  return {
    selectedCatId,
    selectedSubCat,
    selectedEnqId,
    selectedBizId

  };
});

