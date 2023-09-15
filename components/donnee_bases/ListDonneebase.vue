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
        @click="goToAddDonnebase"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Ajouter
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-donneebase :tab="item.value"></table-donneebase> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableDonneebase from '@/components/donnee_bases/TableDonneebase'
  export default {
    components: {
      TableDonneebase
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}, {title:'Actifs',value:'actif'}, {title:'Inactifs',value:'inactif'},
      ],
      selected: []
    }),
    methods:{
      goToAddDonnebase() {      
        this.$router.push('/donnee_bases/addDonneebase');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>