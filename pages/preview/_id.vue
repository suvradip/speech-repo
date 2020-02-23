<template>
   <div class="container">
      <div class="row">
         <div class="col-11">
            <div class="title mb-4">
               <h1 v-text="speech.title" />
               <p class="led">
                  Wrote by <span class="bold">{{ speech.author }}</span>
               </p>
            </div>

            <div class="speech">
               <pre class="preview-contents" v-text="speech.content" />
            </div>
         </div>
         <div class="col-1">
            <router-link :to="`/create/?id=${speech.id}`" class="edit btn btn-outline-primary btn-sm mb-1"
               >EDIT</router-link
            >
            <a :href="`mailto:?subject=${speech.title}&body=${speech.content}`" class="btn share btn-primary btn-sm">
               share
            </a>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
   async fetch({ store, params, error }) {
      const { id } = params;
      try {
         await store.dispatch('FETCH_SPEECHES', {
            slug: id,
         });
      } catch (e) {
         error({ statusCode: 404 });
      }
   },

   computed: {
      ...mapState({
         speech: state => state.speeches,
      }),
   },
};
</script>

<style lang="scss" scoped>
.container {
   .speech {
      background: #fff;
      padding: 10px;
   }
   .edit {
      padding: 8px 25px;
   }
   .preview-contents {
      background-color: #fff;
      font-family: 'Roboto';
      padding: 0;
      white-space: pre-wrap;
      word-break: keep-all;
      font-size: 15px;
      font-weight: 400;
   }
}
</style>
