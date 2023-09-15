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
              <info-resultatattendu></info-resultatattendu>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-resultatattendu></actions-resultatattendu>
            </v-col>
          </v-row>      
    </v-card>
  </div> 
</div>
  
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoResultatattendu from '@/components/resultat_attendus/detail/InfoResultatattendu';
import ActionsResultatattendu from '@/components/resultat_attendus/detail/ActionsResultatattendu';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoResultatattendu,
      ActionsResultatattendu
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Ajouter un resultat_attendu', icon: 'mdi-account-plus-outline',link:'/resultat_attendus/addUser',position:0 },
          { text: 'Liste des resultat_attendus', icon: 'mdi-account-group',link:'/resultat_attendus',position:1  }
        ],
        headerItems: [
          {
            text: 'Données de base',
            disabled: false,
            to: '/resultat_attendus',
            exact: true
          },
          {
            text: 'Detail donnée de base',
            disabled: true,
            to: '/resultat_attendus/94',
            exact: true
          }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
