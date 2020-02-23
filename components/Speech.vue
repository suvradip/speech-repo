<template>
   <div class="card">
      <div class="card-header">
         <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="search" />
            <div class="input-group-append">
               <button class="btn btn-outline-secondary" type="button">
                  search
               </button>
            </div>
         </div>
      </div>
      <ul class="list-group list-group-flush">
         <li v-for="(item, index) in results" :key="index" class="list-group-item">
            <a :href="item.link" v-text="item.title"></a>
         </li>
      </ul>
   </div>
</template>

<style lang="scss" scoped>
@import '../assets/css/colors.scss';
.card {
   width: 600px;
   margin: 0 auto;
   ul {
      li {
         a {
            text-decoration: none;
            color: #000;
         }
         &:hover {
            background-color: $colorTwo;
            cursor: pointer;
         }
      }
   }
}
</style>

<script>
export default {
   props: {
      results: {
         type: Array,
         default: () => [],
      },
   },
   //  data: () => ({
   //     results: [
   //        {
   //           title: 'Cras justo odio',
   //           link: '#1',
   //        },
   //        {
   //           title: 'Dapibus ac facilisis in',
   //           link: '#2',
   //        },
   //     ],
   //  }),
};
</script>
