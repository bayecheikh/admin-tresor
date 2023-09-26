<template>
  <div >
    <div class="custom-container mt-5">

      <v-row class="d-flex justify-content-between">
        <v-col md="4" sm="12" lg="4">
          <div class="custom-stat-boxes mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
            <h4 class="custom-stat-boxes-title">Nombre total de bénéficiaires</h4>
            <div class="custom-stat-boxes-bloc mt-5">
              <h1 v-if="nombretotal" class="custom-stat-boxes-number">
                {{
                  nombretotal
                }}
              </h1>
              <h1 v-show="isNTBloading" class="custom-stat-boxes-number">
                <svg class="custom-svg" width="50" height="50" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"
                  stroke="#999999">
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                      <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                      <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s"
                          repeatCount="indefinite" />
                      </path>
                    </g>
                  </g>
                </svg>
              </h1>
             
              <h1 class="mdi mdi-account-group-outline custom-icon-wave"></h1>
              
            </div>
          </div>
        </v-col>
        <v-col md="4" sm="12" lg="4">
          <div class="custom-stat-boxes mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
            <h4 class="custom-stat-boxes-title">Nombre de transactions Wave</h4>
            <div class="custom-stat-boxes-bloc mt-5">
              <h1 v-if="nombretransactionswave" class="custom-stat-boxes-number">
                {{
                  nombretransactionswave
                }}
              </h1>
              <h1 v-show="isNTWloading" class="custom-stat-boxes-number">
                <svg class="custom-svg" width="50" height="50" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"
                  stroke="#999999">
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                      <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                      <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s"
                          repeatCount="indefinite" />
                      </path>
                    </g>
                  </g>
                </svg>
              </h1>
             
              <h1 class="mdi mdi-cash-check custom-icon-wave"></h1>
              
            </div>
          </div>
        </v-col>
        <v-col md="4" sm="12" lg="4">
          <div class="custom-stat-boxes mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
            <h4 class="custom-stat-boxes-title">Nombre de transactions OM</h4>
            <div class="custom-stat-boxes-bloc mt-5">
              <h1 v-if="nombretransactionsom" class="custom-stat-boxes-number">
                {{
                  nombretransactionsom
                }}
              </h1>
              <h1 v-show="isNTOloading" class="custom-stat-boxes-number">
                <svg class="custom-svg" width="50" height="50" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"
                  stroke="#999999">
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                      <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                      <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s"
                          repeatCount="indefinite" />
                      </path>
                    </g>
                  </g>
                </svg>
              </h1>
             
              <h1 class="mdi mdi-cash-check custom-icon-wave"></h1>
              
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- <div class="custom-container mt-5 mr-8 ml-8 pl-4 pr-1 pt-5 pb-5">
      <list-chart></list-chart>
    </div> -->
  </div>
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
 .custom-color-h4{
  color: #ddaa2c !important;
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
.custom-bloc{
  height: 120px !important;
  width: 320px !important;
}

.custom-bg-color{
  background-color: #faf2df !important;
}


  </style>
  <style >

  .custom-icon-wave{
    font-size : 50px;
    color: #d89f11; 
  }
.custom-stat-boxes{
  background-color: #faf2df ;
  border-radius: 2%;  

  
}

  .custom-stat-boxes:hover .custom-icon-taux svg path {
    fill: #fff;
  }
  
  .custom-stat-boxes:hover .custom-icon-traites svg path {
    stroke: #fff;
  }
  
  .custom-stat-boxes:hover .custom-icon-organismes svg path:first-child {
    fill: #fff;
  }
  
  .custom-stat-boxes:hover .custom-icon-organismes svg path:nth-child(2) {
    fill: #0a3764;
  }
  
  .custom-stat-boxes:hover .custom-icon-recus svg rect {
    stroke: #fff;
  }
  
  .custom-stat-boxes:hover .custom-icon-recus svg path {
    stroke: #fff;
  }
  
  .custom-stat-boxes:hover .custom-icon-recus svg line {
    stroke: #fff;
  }
  
  .custom-stat-boxes-bloc {
    display: flex;
    align-items: center;
    padding-top: 50px
  }
  
  .custom-stat-boxes {
    height: 210px;
  }
  
  .custom-stat-boxes:hover,
  .custom-stat-boxes:hover h1,
  .custom-stat-boxes:hover svg {
    color: #ffffff;
    background-color: #d89f11;
  }
  
  .custom-stat-boxes:hover>h1 {
    color: #ffffff;
  }
  
  .custom-stat-boxes-title {
    color: #d89f11;
    font-size: 18px;
    font-weight: 700;
    text-align: left;
  }
  .custom-stat-boxes:hover>.custom-stat-boxes-title{
    color: #ffffff;
    
  }
  
  .custom-stat-boxes-number {
    padding-top: 20px;
    flex: 1;
    font-size: 34px;
    color: #d89f11;
    font-weight: 700;
    text-align: left;
  }
  
  .bg-marron {
    border-radius: 5px;
    padding: 30px;
    color: #7d7e80;
    min-height: 110px;
    background-color: #ffffff;
  }
  
  .bg-marron:hover {
    background-color: #ffffff;
    color: #d89f11 ;
  }
  
  .bg-white {
    border-radius: 5px;
    background-color: #fff;
    margin-left: 0.3px;
    margin-right: 0.3px;
  }
  </style>
    