<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-sous-secteur></list-sous-secteur>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListSousSecteur from '@/components/sous_secteurs/ListSousSecteur'
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
      ListSousSecteur
    },
    mounted: function() {
      this.$store.dispatch('sous_secteurs/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'sous_secteurs', icon: 'mdi-lock',link:'/sous_secteurs',position:1  },
          { text: 'sous_secteurs', icon: 'mdi-lock',link:'/sous_secteurs',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des Secteurs',
            disabled: true,
            to: '/sous_secteurs',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
