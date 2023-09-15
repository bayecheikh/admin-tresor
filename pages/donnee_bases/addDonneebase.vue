<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
      <form-add-donneebase></form-add-donneebase>      
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormAddDonneebase from '@/components/donnee_bases/FormAddDonneebase';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormAddDonneebase
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList')
      this.$store.dispatch('structures/getList')
      this.$store.dispatch('fournisseurs/getList') */
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Formulaire donnee_base', icon: 'mdi-account-plus-outline',link:'/donnee_base/addSectoriel',position:0 },
          { text: 'Liste des donnee_base', icon: 'mdi-account-group',link:'/donnee_base',position:1  }
        ],
        headerItems: [
        {
          text: 'Formulaire cible annuelle',
          disabled: false,
          to: '/donnee_bases',
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
        roles: ['Sperviseur national'],
        localisations: ['Thiès','Dakar'],

      }
    }

  }
</script>

<style scoped>

</style>
