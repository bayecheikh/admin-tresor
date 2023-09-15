<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-financementactivite></list-financementactivite>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListFinancementactivite from '@/components/financement_activites_resultats/ListFinancementactivite'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-sectoriels')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListFinancementactivite
    },
    mounted: function() {
      this.$store.dispatch('financement_activites_resultats/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'financement_activites_resultats', icon: 'mdi-lock',link:'/financement_activites_resultats',position:1  },
          { text: 'financement_activites_resultats', icon: 'mdi-lock',link:'/financement_activites_resultats',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des financements par activité',
            disabled: true,
            to: '/financement_activites_resultats',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
