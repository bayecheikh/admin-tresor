<template>
<div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-beneficiaire></list-beneficiaire>      
    </v-card>
  </div> 
</div>
  

  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListBeneficiaire from '@/components/beneficiaires/ListBeneficiaire'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-beneficiaires')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListBeneficiaire
    },
    mounted: function() {
      /* this.$store.dispatch('beneficiaires/getList',1) */
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Ajouter un beneficiaire', icon: 'mdi-account-plus-outline',link:'/beneficiaires/addUser',position:0 },
          { text: 'Liste des beneficiaires', icon: 'mdi-account-group-outline',link:'/beneficiaires',position:1  },
          /* { text: 'Liste des roles', icon: 'mdi-lock',link:'/roles',position:1  }, */
          /* { text: 'Liste des permissions', icon: 'mdi-lock',link:'/permissions',position:1  } */
        ],
        headerItems: [
          {
            text: 'Liste des beneficiaires',
            disabled: true,
            to: '/beneficiaires',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>
</style>
