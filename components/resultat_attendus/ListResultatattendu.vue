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
        @click="goToAddResultatattendu"
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
          <table-resultatattendu :tab="item.value"></table-resultatattendu> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableResultatattendu from '@/components/resultat_attendus/TableResultatattendu'
  export default {
    components: {
      TableResultatattendu
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}, {title:'Actifs',value:'actif'}, {title:'Inactifs',value:'inactif'},
      ],
      selected: []
    }),
    methods:{
      goToAddResultatattendu() {      
        this.$router.push('/resultat_attendus/addResultatattendu');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>