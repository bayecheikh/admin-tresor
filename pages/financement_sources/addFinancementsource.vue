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
import FormAddFinancementsource from '@/components/financement_sources/FormAddFinancementsource';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormAddFinancementsource
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'financement_sources', icon: 'mdi-lock',link:'/financement_sources',position:1  },
          { text: 'financement_sources', icon: 'mdi-lock',link:'/financement_sources',position:2  }
        ],
        headerItems: [
        {
          text: 'Financement par sources',
          disabled: false,
          to: '/financement_sources',
          exact: true
        },
        {
          text: 'Nouveau financement par source',
          disabled: false,
          to: '/financement_sources/addFinancementsource',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
