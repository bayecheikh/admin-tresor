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
        @click="goToAddoperateur"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouvel opérateur de paiement
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-operateur :tab="item.value"></table-operateur> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableOperateur from '@/components/operateurs/TableOperateur'
  export default {
    components: {
      TableOperateur
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}
      ],
      selected: []
    }),
    methods:{
      goToAddoperateur() {      
        this.$router.push('/operateurs/addOperateur');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>