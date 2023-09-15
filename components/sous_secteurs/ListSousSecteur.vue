<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value"> {{item.title}}</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <v-btn
        depressed
        rounded
        color="primary"
        @click="goToAddsous_secteur"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouveau Secteur
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-sous-secteur :tab="item.value"></table-sous-secteur> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableSousSecteur from '@/components/sous_secteurs/TableSousSecteur'
  export default {
    components: {
      TableSousSecteur
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}, {title:'Actifs',value:'actif'}, {title:'Inactifs',value:'innactif'}
      ],
      selected: []
    }),
    methods:{
      goToAddsous_secteur() {      
        this.$router.push('/sous_secteurs/addSousSecteur');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>