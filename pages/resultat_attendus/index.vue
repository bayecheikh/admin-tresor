<template>
<div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-resultatattendu></list-resultatattendu>      
    </v-card>
  </div> 
</div>
  

  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListResultatattendu from '@/components/resultat_attendus/ListResultatattendu'
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
      ListResultatattendu
    },
    
    mounted: function() {
      this.$store.dispatch('resultat_attendus/getList') 
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Ajouter un resultat_attendu', icon: 'mdi-account-plus-outline',link:'/resultat_attendus/addUser',position:0 },
          { text: 'Liste des resultat_attendus', icon: 'mdi-account-group-outline',link:'/resultat_attendus',position:1  },
          /* { text: 'Liste des roles', icon: 'mdi-lock',link:'/roles',position:1  }, */
          /* { text: 'Liste des permissions', icon: 'mdi-lock',link:'/permissions',position:1  } */
        ],
        headerItems: [
          {
            text: 'Liste des donnees de bases',
            disabled: true,
            to: '/resultat_attendus',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>
</style>
