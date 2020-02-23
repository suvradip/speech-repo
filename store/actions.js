export default {
   async FETCH_SPEECHES({ commit }, { slug = '' } = {}) {
      const response = await this.$axios.get(`/api/speeches/${slug}`);
      commit('SET_SPEECHES', response.data);
   },
};
