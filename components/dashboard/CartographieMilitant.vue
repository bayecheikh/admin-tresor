<template>
  <v-card class="mx-auto mb-5 pl-10 pt-0 pr-10 pb-5 my-5 border-grey">
    <div class="custom-container mt-0">
      <v-row class="row pt-6">
        <div class="col-lg-4 col-md-4 col-sm-12 m-0 pt-0 pb-30 d-flex flex-column">
              <div class="bg-marron-2 mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center mb-auto">
                <h4 class="">Nombre total de bénéficiaires</h4>
                <h2 class="text-primary mt-2">
                  <template v-if="isNTBloading">
                <!-- Afficher le loader lorsque nombretotal est nul -->
                <div class="loader"></div>
              </template>
              <template v-else>
                {{ nombretotal }}
              </template>
                </h2>
              </div>                
        </div> 
        <div class="col-lg-4 col-md-4 col-sm-12 m-0 pt-0 pb-30 d-flex flex-column">
         
              <div class="bg-marron-2 mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center mb-5 mb-auto">
                <h4 class="">Nombre de transactions Wave</h4>
                <h2 class="text-primary mt-2">
                  <template v-if="isNTWloading">
                <!-- Afficher le loader lorsque nombretotal est nul -->
                <div class="loader"></div>
              </template>
              <template v-else>
                {{ nombretransactionswave?nombretransactionswave:0 }}
              </template>
                </h2>
              </div>             
        </div> 
        <div class="col-lg-4 col-md-4 col-sm-12 m-0 pt-0 pb-30 d-flex flex-column">        
              <div class="bg-marron-2 mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center mb-5 mb-auto">
                <h4 class="">Nombre de transactions Orange Money</h4>
                <h2 class="text-primary mt-2">
                  <template v-if="isNTOloading">
                <!-- Afficher le loader lorsque nombretotal est nul -->
                <div class="loader"></div>
              </template>
              <template v-else>
                {{ nombretransactionsom?nombretransactionsom:0 }}
              </template>
                </h2>
              </div>              
        </div>        
      </v-row>             
    </div>
  </v-card>
</template>
  
  <script>
  import {mapGetters } from 'vuex'
    import Notification from '@/components/Notification'
    export default {
      components: {
        Notification
      },
      mounted: function() {
        this.$msasApi.get('/beneficiaires')
          .then(async (response) => {
            this.nombretotal = response.data.data.data.length
            this.isNTBloading = false
          })
          this.$msasApi.get('/transactions')
          .then(async (response) => {
            console.log("DDDFF++", response.data.data.data)
            this.nombretransactionswave = await response.data.data.data.filter(transaction => transaction.slug_operateur === "wave").length;
            this.isNTWloading = false
            this.nombretransactionsom = await response.data.data.data.filter(transaction => transaction.slug_operateur === "om").length;
            this.isNTOloading = false
            
          })
        /* this.$store.dispatch('structures/getList')
        this.$store.dispatch('fournisseurs/getList') */
      },
      computed: {
        ...mapGetters({
        /* listfournisseurs: 'fournisseurs/selectlistfournisseurs',
        liststructures: 'structures/selectliststructures', */
        
      })},
      data: () => ({
        isNTBloading : true,
        isNTWloading : true,
        isNTOloading : true,
        nombretotal:null,
      }),
 
      metaInfo () {
        return {
          items: this.items,
        }
      }
    }
  </script>
  <style>
  .custom-card-grey .border-grey{
    background: #f1f3f5d9 !important;
  }
  .v-text-field fieldset{
    background-color: #fff !important;
  }
  #chartdiv {
  width: 100%;
  height: 400px;
 }

 .loader {
  border: 2px solid #f3f3f3;
  border-top: 1px solid #d79b06;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

  </style>
  