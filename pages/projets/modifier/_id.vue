<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
      <form-update-projet></form-update-projet>     
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormUpdateProjet from '@/components/projets/modifier/FormUpdateProjet';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormUpdateProjet
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-projets')){
        return redirect('/')
      }
    },
    mounted: function() {
      this.$store.dispatch('roles/getList')
      /* this.$store.dispatch('structures/getList')
      this.$store.dispatch('fournisseurs/getList') */
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Ajouter un projet', icon: 'mdi-account-plus-outline',link:'/projets/addUser',position:0 },
          { text: 'Liste des projets', icon: 'mdi-account-group',link:'/projets',position:1  }
        ],
        headerItems: [
        {
          text: 'Projets',
          disabled: false,
          to: '/projets',
          exact: true
        },
        {
          text: 'Detail projet',
          disabled: true,
          to: '/projets/94',
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
