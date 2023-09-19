A<template>
  
 <div>
  <!-- <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> --> 
  <div class="custom-container mt-5">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
     <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-annuaire></info-annuaire>
            </v-col>          
          </v-row>
    </v-card>
  </div> 
</div> 
</template>

<script>
import PageHeader from '@/components/PageHeader';
import InfoAnnuaire from '@/components/annuaires/detail/InfoAnnuaire';

  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      InfoAnnuaire
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-annuaires')){
       return redirect('/')
      }
    },
    mounted: function() {
      
    },
    data () {
      return {
        id : this.$nuxt._route.params.id,
        headerItems: [
        {
          text: 'Annuaire',
          disabled: false,
          to: '/annuaires',
          exact: true
        },
        {
          text: 'Detail annuaire',
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
