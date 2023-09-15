<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
      <form-add-financementactivite></form-add-financementactivite>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddFinancementactivite from '@/components/financement_activites_resultats/FormAddFinancementactivite';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormAddFinancementactivite
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-sectoriels')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'financement_activites_resultats', icon: 'mdi-lock',link:'/financement_activites_resultats',position:1  },
          { text: 'financement_activites_resultats', icon: 'mdi-lock',link:'/financement_activites_resultats',position:2  }
        ],
        headerItems: [
        {
          text: 'Financement par activites',
          disabled: false,
          to: '/financement_activites_resultats',
          exact: true
        },
        {
          text: 'Nouveau financement par activite',
          disabled: false,
          to: '/financement_activites_resultats/addFinancementactivite',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
