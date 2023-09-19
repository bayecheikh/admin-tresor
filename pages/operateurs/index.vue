<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-operateur></list-operateur>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListOperateur from '@/components/operateurs/ListOperateur'
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
      ListOperateur
    },
    mounted: function() {
      this.$store.dispatch('operateurs/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Rôles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'Opérateurs', icon: 'mdi-lock',link:'/operateurs',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des opérateurs de paiement',
            disabled: true,
            to: '/operateurs',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
