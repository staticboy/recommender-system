<script>
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    getDoubleCount(state) {
      return state.count * 2;
    },
  },
  mutations: {
    incrementCount(state) {
      state.count++;
    },
  },
  actions: {
    incrementCountAction() {
      this.$store.dispatch('incrementCount');
    },
  },
});

</script>