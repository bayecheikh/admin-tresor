<template>
  
 <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
     <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12" class="my-5">
              <actions-enquete></actions-enquete>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-enquete></info-enquete>
            </v-col>
            
          </v-row>
    </v-card>
  </div> 
</div> 
</template>

<script>
import PageHeader from '@/components/PageHeader';
import InfoEnquete from '@/components/analyserisques/detail/InfoEnquete';
import ActionsEnquete from '@/components/analyserisques/detail/ActionsEnquete';
import HistoriqueEnquete from '@/components/analyserisques/detail/HistoriqueEnquete';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      InfoEnquete,
      ActionsEnquete,
      HistoriqueEnquete,
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-enquetes')){
        return redirect('/')
      }
    },
    data () {
      return {
        id : this.$nuxt._route.params.id,
        headerItems: [
        {
          text: 'Analyses risques',
          disabled: false,
          to: '/analyserisques',
          exact: true
        },
        {
          text: 'Detail analyse risque',
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
