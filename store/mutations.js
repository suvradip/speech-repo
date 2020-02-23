import Vue from 'vue';

export default {
   SET_SPEECHES: (state, data) => {
      Vue.set(state, 'speeches', data);
   },
};
