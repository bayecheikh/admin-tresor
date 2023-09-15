<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value"> {{item.title}}</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <v-dialog
          v-model="dialog"
          max-width="1200px"
          scrollable
          persistent
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            v-bind="attrs"
                v-on="on"
              depressed
              rounded
              color="primary"
              >
              <v-icon left>
                mdi-plus
              </v-icon>
              Enquette point focal
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-container>
                <form-add-enquette></form-add-enquette>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Fermer
          </v-btn>
        </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-enquete :tab="item.value"></table-enquete> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableEnquete from '@/components/analyserisques/TableEnquete'
import FormAddAnalyseRisque from '@/components/projets/detail/FormAddAnalyseRisque'
  export default {
    components: {
      TableEnquete,
      FormAddAnalyseRisque
    },
    data: () => ({
      dialog:false,
      tab: null,
      tabItems: [
        {title:'Tous les enquetes',value:'tout'}, {title:'Investissement à valider',value:true}
      ],
      selected: []
    }),
    methods:{
      goToAddenquete() {      
        this.$router.push('/enquetes/addInvestissement');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>