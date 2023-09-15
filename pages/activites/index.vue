<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-activite></list-activite>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListActivite from '@/components/activites/ListActivite'
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
      ListActivite
    },
    mounted: function() {
      this.$store.dispatch('activites/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'activites', icon: 'mdi-lock',link:'/activites',position:1  },
          { text: 'activites', icon: 'mdi-lock',link:'/activites',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des activites',
            disabled: true,
            to: '/activites',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
