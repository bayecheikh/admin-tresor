<template>
<div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
      <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-transaction></info-transaction>
            </v-col>
            <!-- <v-col cols="12" md="12" lg="12" sm="12">
              <actions-transaction></actions-transaction>
            </v-col> -->
          </v-row>      
    </v-card>
  </div> 
</div>
  
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoTransaction from '@/components/transactions/detail/InfoTransaction';
import ActionsTransaction from '@/components/transactions/detail/ActionsTransaction';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoTransaction,
      ActionsTransaction
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-transactions')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Ajouter une transaction', icon: 'mdi-account-plus-outline',link:'/transactions/addUser',position:0 },
          { text: 'Liste des transactions', icon: 'mdi-account-group',link:'/transactions',position:1  }
        ],
        headerItems: [
        {
          text: 'Transactions',
          disabled: false,
          to: '/transactions',
          exact: true
        },
        {
          text: 'Détail transaction',
          disabled: true,
          to: '/transactions/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
