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
              <info-paiement></info-paiement>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-paiement></actions-paiement>
            </v-col>
          </v-row>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoPaiement from '@/components/paiements/detail/InfoPaiement';
import ActionsPaiement from '@/components/paiements/detail/ActionsPaiement';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoPaiement,
      ActionsPaiement
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'Paiements', icon: 'mdi-lock',link:'/paiements',position:2  }
        ],
        headerItems: [
        {
          text: 'Paiement',
          disabled: false,
          to: '/paiements',
          exact: true
        },
        {
          text: 'Detail paiement',
          disabled: true,
          to: '/paiements/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
