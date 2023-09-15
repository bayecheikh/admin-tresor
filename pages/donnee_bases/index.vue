<template>
<div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-donneebase></list-donneebase>      
    </v-card>
  </div> 
</div>
  

  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListDonneebase from '@/components/donnee_bases/ListDonneebase'
import { mapActions} from 'vuex'
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
      ListDonneebase
    },
    mounted: function() {
      /* this.$store.dispatch('donnee_bases/getList',1) */
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Ajouter un donnee_base', icon: 'mdi-account-plus-outline',link:'/donnee_bases/addUser',position:0 },
          { text: 'Liste des donnee_bases', icon: 'mdi-account-group-outline',link:'/donnee_bases',position:1  },
          /* { text: 'Liste des roles', icon: 'mdi-lock',link:'/roles',position:1  }, */
          /* { text: 'Liste des permissions', icon: 'mdi-lock',link:'/permissions',position:1  } */
        ],
        headerItems: [
          {
            text: 'Cibles annuelles',
            disabled: true,
            to: '/donnee_bases',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>
</style>
