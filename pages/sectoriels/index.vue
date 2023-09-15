<template>
<div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <table-sectoriel></table-sectoriel>      
    </v-card>
  </div> 
</div>
  

  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import TableSectoriel from '@/components/sectoriels/TableSectoriel'
import { mapActions} from 'vuex'
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
      TableSectoriel
    },
    mounted: function() {
      /* this.$store.dispatch('sectoriels/getList',1) */
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Ajouter un sectoriel', icon: 'mdi-account-plus-outline',link:'/sectoriels/addUser',position:0 },
          { text: 'Liste des sectoriels', icon: 'mdi-account-group-outline',link:'/sectoriels',position:1  },
          /* { text: 'Liste des roles', icon: 'mdi-lock',link:'/roles',position:1  }, */
          /* { text: 'Liste des permissions', icon: 'mdi-lock',link:'/permissions',position:1  } */
        ],
        headerItems: [
          {
            text: 'Liste des sectoriels',
            disabled: true,
            to: '/sectoriels',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>
</style>
