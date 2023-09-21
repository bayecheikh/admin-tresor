<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
      <form-update-operateur></form-update-operateur>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormUpdateOperateur from '@/components/operateurs/modifier/FormUpdateOperateur';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormUpdateOperateur
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
          { text: 'Opérateurs', icon: 'mdi-lock',link:'/operateurs',position:2  }
        ],
        headerItems: [
        {
          text: 'Opérateur',
          disabled: false,
          to: '/operateurs',
          exact: true
        },
        {
          text: 'Modifier opérateur',
          disabled: true,
          to: '/operateurs/94',
          exact: true
        }
        
        ],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date3: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false,
        menu2: false,
        menu3: false,
        modal: false,
        operateurs: ['Sperviseur national'],
        localisations: ['Thiès','Dakar'],

      }
    }

  }
</script>

<style scoped>

</style>
