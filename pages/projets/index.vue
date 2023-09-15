<template>
<div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-projet></list-projet>      
    </v-card>
  </div> 
</div>
  

  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListProjet from '@/components/projets/ListProjet'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-projets')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListProjet
    },
    mounted: function() {
      /* this.$store.dispatch('projets/getList',1) */
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Ajouter un projet', icon: 'mdi-account-plus-outline',link:'/projets/addUser',position:0 },
          { text: 'Liste des projets', icon: 'mdi-account-group-outline',link:'/projets',position:1  },
          /* { text: 'Liste des roles', icon: 'mdi-lock',link:'/roles',position:1  }, */
          /* { text: 'Liste des permissions', icon: 'mdi-lock',link:'/permissions',position:1  } */
        ],
        headerItems: [
          {
            text: 'Liste des projets',
            disabled: true,
            to: '/projets',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>
</style>
