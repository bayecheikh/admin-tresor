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
        @click="goToAddPaiement"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouveau paiement
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-paiement :tab="item.value"></table-paiement> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TablePaiement from '@/components/paiements/TablePaiement'
  export default {
    components: {
      TablePaiement
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}
      ],
      selected: []
    }),
    methods:{
      goToAddPaiement() {      
        this.$router.push('/paiements/addPaiement');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>