<template>

  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container mt-5">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
     <form-update-secteur></form-update-secteur>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateSecteur from '@/components/secteurs/modifier/FormUpdateSecteur';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateSecteur
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
     mounted: function() {
      this.$store.dispatch('sous_secteurs/getList')
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'secteurs', icon: 'mdi-lock',link:'/secteurs',position:1  },
          { text: 'secteurs', icon: 'mdi-lock',link:'/secteurs',position:2  }
        ],
        headerItems: [
        {
          text: 'Composantes',
          disabled: false,
          to: '/secteurs',
          exact: true
        },
        {
          text: 'Modifier Composante',
          disabled: true,
          to: '/secteurs/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
