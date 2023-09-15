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
        @click="goToAddtype_militant"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouveau type militant
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-typemilitant :tab="item.value"></table-typemilitant> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableTypemilitant from '@/components/type_militants/TableTypemilitant'
  export default {
    components: {
      TableTypemilitant
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}
      ],
      selected: []
    }),
    methods:{
      goToAddtype_militant() {      
        this.$router.push('/type_militants/addTypemilitant');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>