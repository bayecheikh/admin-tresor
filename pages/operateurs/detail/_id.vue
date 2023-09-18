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
              <info-typemilitant></info-typemilitant>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-typemilitant></actions-typemilitant>
            </v-col>
          </v-row>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoTypemilitant from '@/components/operateurs/detail/InfoTypemilitant';
import ActionsTypemilitant from '@/components/operateurs/detail/ActionsTypemilitant';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoTypemilitant,
      ActionsTypemilitant
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'type_militants', icon: 'mdi-lock',link:'/operateurs',position:2  }
        ],
        headerItems: [
        {
          text: 'Type militants',
          disabled: false,
          to: '/operateurs',
          exact: true
        },
        {
          text: 'Detail type militant',
          disabled: true,
          to: '/operateurs/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
