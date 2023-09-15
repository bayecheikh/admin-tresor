<template>
  
   <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
    <form-update-financementactivite></form-update-financementactivite>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateFinancementactivite from '@/components/financement_activites/modifier/FormUpdateFinancementactivite';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateFinancementactivite
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'financement_activites', icon: 'mdi-lock',link:'/financement_activites',position:1  },
          { text: 'financement_activites', icon: 'mdi-lock',link:'/financement_activites',position:2  }
        ],
        headerItems: [
        {
          text: 'Financement par activité',
          disabled: false,
          to: '/financement_activites',
          exact: true
        },
        {
          text: 'Detail financement par activité',
          disabled: true,
          to: '/financement_activites/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
