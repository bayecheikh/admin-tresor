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
import ListFinancementsource from '@/components/financement_sources/ListFinancementsource'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListFinancementsource
    },
    mounted: function() {
      this.$store.dispatch('financement_sources/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'financement_sources', icon: 'mdi-lock',link:'/financement_sources',position:1  },
          { text: 'financement_sources', icon: 'mdi-lock',link:'/financement_sources',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des financements par source',
            disabled: true,
            to: '/financement_sources',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
