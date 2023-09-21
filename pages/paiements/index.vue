<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-paiement></list-paiement>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListPaiement from '@/components/paiements/ListPaiement'
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
      ListPaiement
    },
    mounted: function() {
      this.$store.dispatch('paiements/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Rôles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'Paiements', icon: 'mdi-lock',link:'/paiements',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des paiements',
            disabled: true,
            to: '/paiements',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
