<template>
  
   <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
    <form-update-financementsource></form-update-financementsource>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateFinancementsource from '@/components/financement_sources_resultats/modifier/FormUpdateFinancementsource';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateFinancementsource
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-sectoriels')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'financement_sources_resultats', icon: 'mdi-lock',link:'/financement_sources_resultats',position:1  },
          { text: 'financement_sources_resultats', icon: 'mdi-lock',link:'/financement_sources_resultats',position:2  }
        ],
        headerItems: [
        {
          text: 'Financement par source',
          disabled: false,
          to: '/financement_sources_resultats',
          exact: true
        },
        {
          text: 'Detail financement par source',
          disabled: true,
          to: '/financement_sources_resultats/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
