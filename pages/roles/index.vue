<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-role></list-role>  
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListRole from '@/components/roles/ListRole'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-roles')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListRole
    },
    mounted: function() {
      this.$store.dispatch('roles/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Rôles', icon: 'mdi-lock-outline',link:'/roles',position:1  },
          { text: 'Permissions', icon: 'mdi-lock-outline',link:'/permissions',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des rôles',
            disabled: true,
            to: '/roles',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
