<template>
   <div class="navbar">
      <ul class="nav nav-pills">
         <li class="nav-item">
            <router-link class="nav-link " to="/">Speeches</router-link>
         </li>
         <li class="nav-item">
            <router-link class="nav-link" to="/create">Create New</router-link>
         </li>
      </ul>
   </div>
</template>

<style lang="scss" scoped>
@import '../assets/css/colors.scss';
.navbar {
   background-color: $primaryColor;
   margin-bottom: 40px;

   .nav {
      margin-bottom: 0;
      padding: 5px 0;
      a {
         color: #000;

         &.active {
            font-weight: 500;
         }
      }
   }
}
</style>
