<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-financementsource></list-financementsource>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListFinancementsource from '@/components/financement_sources_resultats/ListFinancementsource'
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
      ListFinancementsource
    },
    mounted: function() {
      this.$store.dispatch('financement_sources_resultats/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'financement_sources_resultats', icon: 'mdi-lock',link:'/financement_sources_resultats',position:1  },
          { text: 'financement_sources_resultats', icon: 'mdi-lock',link:'/financement_sources_resultats',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des financements par source',
            disabled: true,
            to: '/financement_sources_resultats',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
