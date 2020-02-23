export default {
   async FETCH_SPEECHES({ commit }, { slug = '', q = '' } = {}) {
      const response = await this.$axios.get(`/speeches/${slug}`, {
         params: {
            query: q,
         },
      });
      commit('SET_SPEECHES', response.data);
   },
};
