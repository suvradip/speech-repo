<template>
   <div class="card">
      <div class="card-header">
         <form @submit.prevent="onSubmit">
            <div class="input-group mb-3">
               <input v-model.trim="search" type="text" class="form-control" placeholder="search" />
               <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="submit">
                     search
                  </button>
               </div>
            </div>
         </form>
      </div>
      <div v-if="checkResult">
         <ul class="list-group list-group-flush results">
            <li v-for="(item, index) in results" :key="index" class="list-group-item">
               <router-link :to="`/preview/${item.id}`" v-text="item.title" />
            </li>
         </ul>
      </div>
      <div v-else>
         <h5 class="text-center">Didn't find what you are looking for? You can try the following things...</h5>
         <ul>
            <li>Include spaces if it has more than one word</li>
            <li>Query with the synonym/alternate wording</li>
         </ul>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      results: {
         type: [Array, Object],
         default: () => [],
      },
   },

   data: () => ({
      search: '',
   }),

   computed: {
      checkResult() {
         if (this.results.length > 0) return true;
         return false;
      },
   },

   methods: {
      onSubmit() {
         if (typeof this.search === 'undefined') return false;
         if (this.search === '') return false;

         this.$store.dispatch('FETCH_SPEECHES', {
            q: this.search,
         });
      },
   },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/colors.scss';
.card {
   width: 600px;
   margin: 0 auto;
   .results {
      li {
         padding: 0;
         a {
            text-decoration: none;
            color: #000;
            padding: 0.75rem 3rem;
            display: block;
         }
         &:hover {
            background-color: $colorTwo;
            cursor: pointer;
         }
      }
   }

   input {
      outline: none;
      border-color: #6957da;
      box-shadow: none;
   }
}
</style>
