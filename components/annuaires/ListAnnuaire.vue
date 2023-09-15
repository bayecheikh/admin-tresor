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
        @click="goToAddannuaire"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Ajouter des contacts
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-annuaire :tab="item.value"></table-annuaire> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableAnnuaire from '@/components/annuaires/TableAnnuaire'
  export default {
    components: {
      TableAnnuaire
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}
      ],
      selected: []
    }),
    methods:{
      goToAddannuaire() {      
        this.$router.push('/annuaires/addAnnuaire');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>