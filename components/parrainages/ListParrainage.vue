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
        @click="goToAddparrainage"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Ajouter des parrainages
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-parrainage :tab="item.value"></table-parrainage> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableParrainage from '@/components/parrainages/TableParrainage'
  export default {
    components: {
      TableParrainage
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}, {title:'Actifs',value:'actif'}, {title:'Inactifs',value:'innactif'}
      ],
      selected: []
    }),
    methods:{
      goToAddparrainage() {      
        this.$router.push('/parrainages/addParrainage');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>