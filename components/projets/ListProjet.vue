<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value"> {{item.title}}</v-tab>
        </v-tabs>
      </div>
      <!--<div class="ml-auto p-2">
        <v-btn
        depressed
        rounded
        color="primary"
        @click="goToAddProjet"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouveau projet
        </v-btn>
      </div>-->
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-projet :tab="item.value"></table-projet> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableProjet from '@/components/projets/TableProjet'
  export default {
    components: {
      TableProjet
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}, {title:'Actifs',value:'actif'}, {title:'Inactifs',value:'inactif'},
      ],
      selected: []
    }),
    methods:{
      goToAddProjet() {      
        this.$router.push('/projets/addProjet');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>