<template>
<div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-transaction></list-transaction>      
    </v-card>
  </div> 
</div>
  

  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListTransaction from '@/components/transactions/ListTransaction'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-transactions')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListTransaction
    },
    mounted: function() {
      /* this.$store.dispatch('transactions/getList',1) */
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Ajouter un transaction', icon: 'mdi-account-plus-outline',link:'/transactions/addUser',position:0 },
          { text: 'Liste des transactions', icon: 'mdi-account-group-outline',link:'/transactions',position:1  },
          /* { text: 'Liste des roles', icon: 'mdi-lock',link:'/roles',position:1  }, */
          /* { text: 'Liste des permissions', icon: 'mdi-lock',link:'/permissions',position:1  } */
        ],
        headerItems: [
          {
            text: 'Liste des transactions',
            disabled: true,
            to: '/transactions',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>
</style>
