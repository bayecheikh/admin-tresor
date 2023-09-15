<template>

  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container mt-5">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
      <form-add-secteur></form-add-secteur>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddSecteur from '@/components/secteurs/FormAddSecteur';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormAddSecteur
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
          { text: 'Secteurs', icon: 'mdi-lock',link:'/secteurs',position:1  },
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
          text: 'Nouveau Composante',
          disabled: true,
          to: '/secteurs/addsecteur',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
