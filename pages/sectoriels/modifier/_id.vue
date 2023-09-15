<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
      <form-update-sectoriel></form-update-sectoriel>     
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormUpdateSectoriel from '@/components/sectoriels/modifier/FormUpdateSectoriel';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormUpdateSectoriel
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-sectoriels')){
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
          { text: 'Ajouter un sectoriel', icon: 'mdi-account-plus-outline',link:'/sectoriel/addUser',position:0 },
          { text: 'Liste des sectoriel', icon: 'mdi-account-group',link:'/sectoriel',position:1  }
        ],
        headerItems: [
        {
          text: 'Sectoriels',
          disabled: false,
          to: '/sectoriels',
          exact: true
        },
        {
          text: 'Detail sectoriel',
          disabled: true,
          to: '/sectoriels/94',
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
