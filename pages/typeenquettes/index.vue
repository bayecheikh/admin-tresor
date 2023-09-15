<template>

  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container row">
    <v-card class="pl-10 pt-10 pb-10 pr-10 col-md-3 col-lg-3 col-sm-12 text-sm-center mb-4 mr-4 ml-4 mt-4" v-for="(item,i) in layoutenquette" :key="i">  
      <nuxt-link class="customTopNav" :to="item.href? item.href : null">
          <v-icon :color="$route.path==item.href?'primary':''">{{ item.icon }}</v-icon>
          <div :class="$route.path==item.href?'text-primary':''">{{ item.title }}</div>  
      </nuxt-link>
    </v-card>
  </div> 
</div>
</template>

<script>
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      /* if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      } */
    },
    components: {
    },
    mounted: function() {
      //this.layoutenquette= this.$getParametreMenu()
    },
    data:  function () {      
      return {
        layoutenquette:[
        {
          "icon": "mdi-cog-outline",
          "href": "/enquetes",
          "title": "Enquette point focal",
          "name": "enquette-point-focal"
        },
        {
          "icon": "mdi-cog-outline",
          "href": "/analyserisques",
          "title": "Analyse risques environnementaux et sociaux",
          "name": "analyse-risques"
        },
        {
          "icon": "mdi-cog-outline",
          "href": "/analysegenres",
          "title": "Analyse genre",
          "name": "analyse-genre"
        }
      ],
        headerItems: [
          {
            text: 'Paramétrage',
            disabled: false,
            to: '/parametres',
            exact: true
          }
        ]    
      }
    },

  }
</script>

<style scoped>

</style>
