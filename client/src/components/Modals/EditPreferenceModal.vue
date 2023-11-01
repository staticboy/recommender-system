<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { useVModel } from "@vueuse/core";
import { useQuasar, QTableColumn } from "quasar";
import { useCategoryStore } from "../../stores/category";
import { useMemberStore } from "../../stores/member";
import { useProductStore } from "../../stores/product";
import {
  MemberPreferences,
  SkillLevel,
  Frequency,
} from "../../stores/member/types";

const props = defineProps({
  preferences: {
    type: Array as PropType<MemberPreferences[]>,
    required: false,
    default: [] as MemberPreferences[],
  },
});
const emit = defineEmits<{
  (e: "update:preferences", value: MemberPreferences[]): void;
}>();
const preferences = useVModel(props, "preferences", emit);
const q = useQuasar();
const loading = ref(false);
const memberStore = useMemberStore();
const { memberDetails } = useMemberStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const columns = computed<QTableColumn[]>(() => [
  {
    name: "user_id",
    required: true,
    label: "User ID",
    align: "left",
    field: "user_id",
    sortable: true,
  },
  {
    name: "category",
    required: true,
    label: "Category",
    align: "left",
    field: "category",
    sortable: true,
  },
  {
    name: "skill_level",
    required: true,
    label: "Skill Level",
    align: "left",
    field: "skill_level",
    sortable: true,
  },
  {
    name: "frequency",
    required: true,
    label: "Frequency",
    align: "left",
    field: "frequency",
    sortable: true,
  },
]);
const getCategoryName = (id: string) => {
  return categoryStore.categoryList.find((cat) => cat.cat_id === id)?.cat_name;
};
const addRow = () => {
  loading.value = true;
  setTimeout(() => {
    preferences.value.push({
      preference_id: "",
      user_id: memberDetails.user_id,
      cat_id: categoryStore.categoryList[0].cat_id,
      skill_level: SkillLevel.BEGINNER,
      frequency: Frequency.DAILY,
      draft: true,
    });
  }, 1000);
  loading.value = false;
};
const deleteEntry = async (entry: MemberPreferences) => {
  loading.value = true;
  const index = preferences.value.findIndex(
    (pref) => pref.cat_id === entry.cat_id
  );
  if (index !== -1) {
    const resp = await memberStore.deleteMemberPreferences(entry.preference_id);
    if (resp) {
      preferences.value.splice(index, 1);
      await getOrRefreshProductRecommendations(memberDetails.user_id);
      q.notify({
        type: "positive",
        message: "Entry deleted successfully",
      });
    } else {
      q.notify({
        type: "negative",
        message: "Error deleting entry",
      });
    }
  }
  localStorage.setItem("pref_count", preferences.value.length.toString());
  loading.value = false;
};
const addEntry = async (entry: MemberPreferences) => {
  loading.value = true;
  const resp = await memberStore.insertNewMemberPreferences(entry);
  if (resp.preference_id) {
    const index = preferences.value.findIndex(
      (pref) => pref.cat_id === entry.cat_id
    );
    if (index !== -1) {
      preferences.value[index].draft = false;
      preferences.value[index].preference_id = resp.preference_id;
    }
    await getOrRefreshProductRecommendations(memberDetails.user_id);
    q.notify({
      type: "positive",
      message: "Entry added successfully",
    });
  } else {
    q.notify({
      type: "negative",
      message: "Entry could not be added",
    });
  }
  localStorage.setItem("pref_count", preferences.value.length.toString());
  loading.value = false;
};
const getOrRefreshProductRecommendations = async (userid: string) => {
  await productStore.getProductRecommendations(userid);
};
onBeforeMount(async () => {
  if (categoryStore.categoryList.length === 0) {
    await categoryStore.getAllCategories();
  }
});
</script>
<template>
  <q-table
    :rows="preferences"
    :columns="columns"
    :rows-per-page-options="[5, 10, 20, 30]"
    :loading="loading"
  >
    <template v-slot:top>
      <q-btn
        color="primary"
        :disable="loading"
        label="Add row"
        @click="addRow"
      />
    </template>
    <q-space />
    <template v-slot:body="props">
      <q-space />
      <q-tr :props="props">
        <q-td key="user_id">
          {{ props.row.user_id }}
        </q-td>
        <template v-if="!props.row.draft">
          <q-td key="category">
            {{ getCategoryName(props.row.cat_id) }}
          </q-td>
          <q-td key="skill_level">
            {{ props.row.skill_level }}
          </q-td>
          <q-td key="frequency">
            {{ props.row.frequency }}
          </q-td>
          <q-td>
            <q-btn dense flat icon="delete" @click="deleteEntry(props.row)">
              <q-tooltip>Delete Entry</q-tooltip>
            </q-btn>
          </q-td>
        </template>
        <template v-else>
          <q-td>
            <q-select
              emit-value
              map-options
              v-model="props.row.cat_id"
              :options="
                categoryStore.categoryList.map((cat) => {
                  return {
                    label: cat.cat_name,
                    value: cat.cat_id,
                  };
                })
              "
            />
          </q-td>
          <q-td class="text-center" key="skill_level">
            <q-select
              v-model="props.row.skill_level"
              :options="[
                SkillLevel.BEGINNER,
                SkillLevel.INTERMEDIATE,
                SkillLevel.ADVANCED,
              ]"
            />
          </q-td>
          <q-td class="text-center" key="frequency">
            <q-select
              v-model="props.row.frequency"
              :options="[Frequency.DAILY, Frequency.WEEKLY, Frequency.MONTHLY]"
            />
          </q-td>
          <q-td>
            <q-btn dense flat icon="save" @click="addEntry(props.row)">
              <q-tooltip>Save Entry</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="delete" @click="deleteEntry(props.row)">
              <q-tooltip>Delete Entry</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-tr>
    </template>
  </q-table>
</template>
<style scoped lang="scss"></style>
