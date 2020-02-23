<template>
   <div class="container">
      <Speech class="speech" :results="speeches" />
   </div>
</template>

<script>
import { mapState } from 'vuex';
import Speech from '~/components/Speech.vue';
export default {
   components: {
      Speech,
   },

   async fetch({ store, params, error }) {
      try {
         await store.dispatch('FETCH_SPEECHES');
      } catch (e) {
         error({ statusCode: 404 });
      }
   },

   computed: {
      ...mapState(['speeches']),
   },
};
</script>

<style lang="scss" scoped>
.container {
   .speech {
      margin: 0 auto;
   }
}
</style>
