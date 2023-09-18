<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-typemilitant></list-typemilitant>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListTypemilitant from '@/components/operateurs/ListTypemilitant'
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
      ListTypemilitant
    },
    mounted: function() {
      this.$store.dispatch('type_militants/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'type_militants', icon: 'mdi-lock',link:'/operateurs',position:2  }
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
