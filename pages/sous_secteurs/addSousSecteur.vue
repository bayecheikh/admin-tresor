<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container mt-5">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
      <form-add-sous-secteur></form-add-sous-secteur>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddSousSecteur from '@/components/sous_secteurs/FormAddSousSecteur';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormAddSousSecteur
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'sous_secteurs', icon: 'mdi-lock',link:'/sous_secteurs',position:1  },
          { text: 'sous_secteurs', icon: 'mdi-lock',link:'/sous_secteurs',position:2  }
        ],
        headerItems: [
        {
          text: 'Secteurs',
          disabled: false,
          to: '/sous_secteurs',
          exact: true
        },
        {
          text: 'Nouveau Secteur',
          disabled: true,
          to: '/sous_secteurs/addsous_secteur',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
