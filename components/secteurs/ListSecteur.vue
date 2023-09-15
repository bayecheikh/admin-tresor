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
        @click="goToAddsecteur"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouveau Composante
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-secteur :tab="item.value"></table-secteur> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableSecteur from '@/components/secteurs/TableSecteur'
  export default {
    components: {
      TableSecteur
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}, {title:'Actifs',value:'actif'}, {title:'Inactifs',value:'innactif'}
      ],
      selected: []
    }),
    methods:{
      goToAddsecteur() {      
        this.$router.push('/secteurs/addsecteur');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>