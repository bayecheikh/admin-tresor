<template>
   <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
     <form-update-enquete></form-update-enquete>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateEnquete from '@/components/analyserisques/modifier/FormUpdateEnquete';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateEnquete
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-enquetes')){
        return redirect('/')
      }
    },
    mounted: function() {
      //this.$store.dispatch('roles/getList')
      /* this.$store.dispatch('enquetes/getList')
      this.$store.dispatch('fournisseurs/getList') */
      this.$store.dispatch('type-zones/getList')
      this.$store.dispatch('typesources/getList')
      this.$store.dispatch('sources/getList')
      this.$store.dispatch('regions/getList')
      this.$store.dispatch('departements/getList')
      this.$store.dispatch('dimensions/getList')
    },
    data () {
      return {
        headerItems: [
        {
          text: 'Analyses risques',
          disabled: false,
          to: '/analyserisques',
          exact: true
        },
        {
          text: 'Detail analyserisque',
          disabled: true,
          to: '/analyserisques/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
