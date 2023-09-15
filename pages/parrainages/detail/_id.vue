<template>
  
 <div>
  <!-- <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> --> 
  <div class="custom-container mt-5">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
     <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-parrainage></info-parrainage>
            </v-col>    
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-parrainage></actions-parrainage>
            </v-col>      
          </v-row>
    </v-card>
  </div> 
</div> 
</template>

<script>
import PageHeader from '@/components/PageHeader';
import InfoParrainage from '@/components/parrainages/detail/InfoParrainage';
import ActionsParrainage from '@/components/parrainages/detail/ActionsParrainage';

  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      InfoParrainage,
      ActionsParrainage
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parrainages')){
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
          text: 'Liste des parrainages',
          disabled: false,
          to: '/parrainages',
          exact: true
        },
        {
          text: 'Detail parrainage',
          disabled: true,
          to: '/parrainages/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
