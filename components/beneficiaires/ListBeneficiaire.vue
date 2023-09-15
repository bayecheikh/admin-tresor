<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value"> {{item.title}}</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <!--<v-btn
        depressed
        rounded
        color="primary"
        @click="goToAddBeneficiaire"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouveau beneficiaire
        </v-btn>-->
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-beneficiaire :tab="item.value"></table-beneficiaire> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableBeneficiaire from '@/components/beneficiaires/TableBeneficiaire'
  export default {
    components: {
      TableBeneficiaire
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}, {title:'Actifs',value:'actif'}, {title:'Inactifs',value:'inactif'},
      ],
      selected: []
    }),
    methods:{
      goToAddBeneficiaire() {      
        this.$router.push('/beneficiaires/addBeneficiaire');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>