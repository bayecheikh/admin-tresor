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
              <info-donneebase></info-donneebase>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-donneebase></actions-donneebase>
            </v-col>
          </v-row>      
    </v-card>
  </div> 
</div>
  
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoDonneebase from '@/components/cible_fin_projets/detail/InfoDonneebase';
import ActionsDonneebase from '@/components/cible_fin_projets/detail/ActionsDonneebase';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoDonneebase,
      ActionsDonneebase
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Ajouter un cible_fin_projet', icon: 'mdi-account-plus-outline',link:'/cible_fin_projets/addUser',position:0 },
          { text: 'Liste des cible_fin_projets', icon: 'mdi-account-group',link:'/cible_fin_projets',position:1  }
        ],
        headerItems: [
          {
            text: 'Données de base',
            disabled: false,
            to: '/cible_fin_projets',
            exact: true
          },
          {
            text: 'Detail donnée de base',
            disabled: true,
            to: '/cible_fin_projets/94',
            exact: true
          }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
