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
              <info-beneficiaire></info-beneficiaire>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <historique-beneficiaire></historique-beneficiaire>
            </v-col>
          </v-row>      
    </v-card>
  </div> 
</div>
  
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoBeneficiaire from '@/components/beneficiaires/detail/InfoBeneficiaire';
import ActionsBeneficiaire from '@/components/beneficiaires/detail/ActionsBeneficiaire';
import HistoriqueBeneficiaire from '@/components/beneficiaires/detail/HistoriqueBeneficiaire';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoBeneficiaire,
      ActionsBeneficiaire,
      HistoriqueBeneficiaire
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-beneficiaires')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Ajouter un beneficiaire', icon: 'mdi-account-plus-outline',link:'/beneficiaires/addUser',position:0 },
          { text: 'Liste des beneficiaires', icon: 'mdi-account-group',link:'/beneficiaires',position:1  }
        ],
        headerItems: [
        {
          text: 'Beneficiaires',
          disabled: false,
          to: '/beneficiaires',
          exact: true
        },
        {
          text: 'Detail beneficiaire',
          disabled: true,
          to: '/beneficiaires/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
