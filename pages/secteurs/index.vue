<template>
<div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-secteur></list-secteur>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListSecteur from '@/components/secteurs/ListSecteur'
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
      ListSecteur
    },
    mounted: function() {
      this.$store.dispatch('secteurs/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Secteurs', icon: 'mdi-lock',link:'/secteurs',position:1  },
          { text: 'secteurs', icon: 'mdi-lock',link:'/secteurs',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des Composantes',
            disabled: true,
            to: '/secteurs',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
