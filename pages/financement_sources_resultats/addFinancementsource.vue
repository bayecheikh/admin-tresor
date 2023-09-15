<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
      <form-add-financementsource></form-add-financementsource>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddFinancementsource from '@/components/financement_sources_resultats/FormAddFinancementsource';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormAddFinancementsource
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
          text: 'Financements par source',
          disabled: false,
          to: '/financement_sources_resultats',
          exact: true
        },
        {
          text: 'Nouveau financement par source',
          disabled: false,
          to: '/financement_sources_resultats/addFinancementsource',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
