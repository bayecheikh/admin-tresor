<template>
  
   <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
    <form-update-activite></form-update-activite>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateActivite from '@/components/activites/modifier/FormUpdateActivite';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateActivite
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'activites', icon: 'mdi-lock',link:'/activites',position:1  },
          { text: 'activites', icon: 'mdi-lock',link:'/activites',position:2  }
        ],
        headerItems: [
        {
          text: 'Activites',
          disabled: false,
          to: '/activites',
          exact: true
        },
        {
          text: 'Detail activite',
          disabled: true,
          to: '/activites/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
