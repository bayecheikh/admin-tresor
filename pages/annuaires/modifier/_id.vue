A<template>
   <div>
  <!-- <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div>  -->
  <div class="custom-container mt-5">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
     <form-update-annuaire></form-update-annuaire>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateAnnuaire from '@/components/annuaires/modifier/FormUpdateAnnuaire';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateAnnuaire
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-annuaires')){
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
          text: 'Annuaire',
          disabled: false,
          to: '/annuaires',
          exact: true
        },
        {
          text: 'Modification membre',
          disabled: true,
          to: '/annuaires/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
