<template>
   <div>
  <!-- <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div>  -->
  <div class="custom-container mt-5">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
     <form-update-parrainage></form-update-parrainage>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateParrainage from '@/components/parrainages/modifier/FormUpdateParrainage';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateParrainage
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parrainages')){
        return redirect('/')
      }
    },
    mounted: function() {

      this.$store.dispatch('regions/getList')

      
    },
    data () {
      return {
        headerItems: [
        {
          text: 'Parrainages',
          disabled: false,
          to: '/parraianages',
          exact: true
        },
        {
          text: 'Modification parraianage',
          disabled: true,
          to: '/parraianages/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
