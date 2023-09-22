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
              <info-operateur></info-operateur>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-operateur></actions-operateur>
            </v-col>
          </v-row>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoOperateur from '@/components/operateurs/detail/InfoOperateur';
import ActionsOperateur from '@/components/operateurs/detail/ActionsOperateur';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoOperateur,
      ActionsOperateur
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Rôles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'Opérateurs', icon: 'mdi-lock',link:'/operateurs',position:2  }
        ],
        headerItems: [
        {
          text: 'Opérateurs',
          disabled: false,
          to: '/operateurs',
          exact: true
        },
        {
          text: 'Detail opérateur',
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
