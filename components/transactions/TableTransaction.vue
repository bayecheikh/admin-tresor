
<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" @click="changeTab('')"> Tout</v-tab>
          <v-tab class="text-normal" @click="changeTab('brouillon')" > Brouillons</v-tab>
          <v-tab class="text-normal" @click="changeTab('soumis')"> En attente de validation</v-tab>
          <v-tab class="text-normal" @click="changeTab('rejete')"> Rejetés</v-tab>
          <v-tab class="text-normal" @click="changeTab('valide')"> Validés</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <v-btn
        depressed
        rounded
        color="primary"
        @click="goToAddTransaction"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouvelle transaction
        </v-btn>
      </div>
    </div>
 
        <template>
          <div>
            <v-card-title class="col-12">
              <template>
                <v-form class=" mt-5 row" v-model="valid" ref="form" enctype="multipart/form-data"
                  >
                    <v-col md="6" lg="6" sm="12" class="mb-0 pb-0 d-flex">
                      <v-text-field  
                        ref="inputRef"
                        label="Rechercher une transaction"
                        outlined dense
                        v-model="model.dataSearch"
                        :rules="rules.dataSearchRules"
                        placeholder="Référence, Prénom, Nom, Téléphone"
                        clearable
                        :clear-icon-cb="onClearClicked"
                        rounded
                      ></v-text-field>
                      
                    </v-col>
                    <v-col
                      lg="3"
                      md="3"
                      sm="12"
                      class="d-flex"
                    >
                      <v-btn
                        :loading="loading"
                        :disabled="!valid"
                        class="mr-4 text-white" color="#1B73E8"
                        @click="submitForm"
                        depressed
                        rounded
                      >
                        Rechercher
                      </v-btn>
                      <v-btn text @click="onClearClicked" rounded color="red">Réinitialiser</v-btn>
                    </v-col>    
                </v-form>
              </template>

            </v-card-title>
            <v-data-table
            v-model="selected"
              :headers="headers"
              :items="listtransactions"
              :single-select="singleSelect"
              item-key="id"
              :items-per-page="perpage"
              class="flat pt-4"
              :loading="progress"
              loading-text="Loading... Please wait"
              hide-default-footer
              :search="search"
            >
              <template v-slot:top="{}">
                <v-row class="mb-1 border-bottom-small d-flex">
                  <v-col md="6" sm="12" lg="6" class="pb-0 pt-4">
                    <div class="row">
                
                    </div>
                  </v-col>
                  <v-col md="6" sm="12" lg="6" class="pt-0 pb-2 align-right-pagination">
                    <v-pagination
                      v-model="page"
                      :length="totalpage"
                      total-visible="6"
                      next-icon="mdi-menu-right"
                      prev-icon="mdi-menu-left"
                      @input="handlePageChange"
                    ></v-pagination>
                  </v-col>
                  <div class="text-center">
              <v-dialog v-model="dialog" width="500">
                <v-card>
                  <v-card-title class="text-h5"> Confirmation </v-card-title>
                  <v-card-text>Voulez-vous supprimer cet élément ?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary darken-1"
                      text
                      @click="dialog = false"
                      outlined
                    >
                      Annuler
                    </v-btn>
                    <v-btn color="red darken-1" text @click="deleteItem" outlined>
                      Supprimer définitivement
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
                </v-row>
              </template>

              <template v-slot:[`item.beneficiaire`]="{ item }">
                <v-chip
                  color="primary"
                  small
                  outlined
                  class="my-1 mr-1"
                  v-for="beneficiaire in item.beneficiaire"
                  :key="beneficiaire.id"
                >
                  {{ beneficiaire.prenom_beneficiaire +' '+beneficiaire.nom_beneficiaire}}
                </v-chip>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list shaped>
                    <v-item-group>
                      <v-list-item @click="visualiserItem(item)" link class="custom-v-list-action pl-2 pr-1">
                        <v-list-item-title>
                          <v-icon
                            small
                            class="mr-2"
                            
                          >
                            mdi-information-outline
                          </v-icon>Détail
                        </v-list-item-title>
                      </v-list-item>
                      <!-- <v-list-item @click="editItem(item)" link class="custom-v-list-action pl-2 pr-1">
                        <v-list-item-title> 
                          <v-icon small class="mr-2"> mdi-pencil-outline </v-icon
                          >Modifier
                        </v-list-item-title>
                      </v-list-item> -->
                      <v-list-item @click="opendialog(item)" class="custom-v-list-action pl-2 pr-1">
                        <v-list-item-title>
                          <v-icon small class="mr-2" v-bind="attrs" v-on="on">
                            mdi-delete-outline </v-icon
                          >Supprimer
                        </v-list-item-title>
                      </v-list-item>
                    </v-item-group>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
            
          </div>
        </template>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import RechercheTransaction from '@/components/transactions/RechercheTransaction';
  export default {
    components: {
      RechercheTransaction
    },
    mounted: function() {
      this.getList(1,'')
    },
    computed: mapGetters({
      listtransactions: 'transactions/listtransactions',
      headers: 'transactions/headertransactions',
      totalpage: 'transactions/totalpage',
      perpage: 'transactions/perpage',
      datasearch: 'transactions/datasearch',
    }),
    metaInfo () {
      return {
        tab: this.tab,
      }
    },
    methods: {
      getList(page,status){
          this.progress=true
          this.$msasApi.$get('/transactions?status='+status+'&page='+page)
        .then(async (response) => {
            console.log('Données reçu transactions ++++++: ', response.data.data)
            let totalPages = Math.ceil(response.data.total / response.data.per_page)
            this.$store.dispatch('transactions/getTotalPage',totalPages)
            this.$store.dispatch('transactions/getPerPage',response.data.per_page)
            this.$store.dispatch('transactions/getList',response.data.data)
            console.log('total page ++++++++++',response.data.total / response.data.per_page)
        }).catch((error) => {
            /* this.$toast.global.my_error().goAway(1500) */ //Using custom toast
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
            this.progress=false
        });
        //console.log('total items++++++++++',this.paginationUtilisateur)
      },
       getResult(page,param,status){
         this.progress=true
         this.$msasApi.get('/transaction-multiple-search/'+param+'?status='+status+'&page='+page)
          .then(async (response) => {
            console.log('Données reçus++++++++++++',response.data.data.data)
            await this.$store.dispatch('transactions/getList',response.data.data.data)
            let totalPages = Math.ceil(response.data.data.total / response.data.data.per_page)
            this.$store.dispatch('transactions/getTotalPage',totalPages)
            this.$store.dispatch('transactions/getPerPage',response.data.data.per_page)
            
        }).catch((error) => {
             /* this.$toast.global.my_error().goAway(1500) */ //Using custom toast
           // this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé')
             this.progress=false;
             this.loading=false
        });
      },
      onClearClicked () {
       this.$refs.inputRef.clearableCallback()
       this.page=1
       this.getList(1,'')
      },
      submitForm () {
        let validation = this.$refs.form.validate()
        this.loading = true;
        console.log('donnee envoyées++++++++++++++',this.model.dataSearch)
        this.$store.commit('transactions/initdatasearch',this.model.dataSearch)
        validation && this.getResult(1,this.model.dataSearch)
      },
      handlePageChange(value){
        console.log('-------------datasearch est',this.datasearch)
        if(this.datasearch ==null)
        this.getList(value,this.status)
        else
        this.getResult(value,this.datasearch,this.status)
        
      },
      visualiserItem (item) {
        this.$store.dispatch('transactions/getDetail',item)
        this.$router.push('/transactions/detail/'+item.id);
      },
      editItem (item) {
        this.$store.dispatch('transactions/getDetail',item)
        this.$router.push('/transactions/modifier/'+item.id);
      },
      async deleteItem () {
        this.dialog=false   
        this.$store.dispatch('toast/getMessage',{type:'processing',text:'Traitement en cours ...'})  
        this.$msasApi.$delete('/transactions/'+this.activeItem.id)
        .then(async (response) => {             
            this.$store.dispatch('transactions/deletetransaction',this.activeItem.id)
            this.$store.dispatch('toast/getMessage',{type:'success',text:response.data.message || 'Suppression réussie'})
            }).catch((error) => {
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de la suppression'})
              console.log('Code error ++++++: ',error)
            }).finally(() => {              
            console.log('Requette envoyé ')
        });
      },
       opendialog (item) {
        this.dialog=true
        this.activeItem=item
      },
      exporterItem (item) {
        alert('Exporter '+item.id)
      },
      visualiser(){
        if(this.selected.length!=1)
        alert('Veuillez selectionner un element')
        else{
          let transaction = this.selected.map(function(value){ return value})[0]
          this.$store.commit('transactions/initdetail',transaction)
          this.$router.push('/transactions/detail/'+transaction.id);
        }
      },
      modifier(){
        if(this.selected.length!=1)
        alert('Veuillez selectionner un element')
        else{
          let transaction = this.selected.map(function(value){ return value})[0]
          this.$store.commit('transactions/initdetail',transaction)
          this.$router.push('/transactions/modifier/'+transaction.id);
        }
      },
      supprimer(){
        if(this.selected.length>=1)
        alert('Supprimer '+this.selected.map(function(value){ return value.id}))
        else
        alert('Veuillez selectionner un element')
      },
      exporter(){
        if(this.selected.length>=1)
        alert('Exporter '+this.selected.map(function(value){ return value.id}))
        else
        alert('Veuillez selectionner un element')
      },
      goToAddTransaction() {      
        this.$router.push('/transactions/addTransaction');
      },
     changeTab(param){
        this.status=param
        this.getList(1,param)
      },
    },
    data: () => ({
      tab:'',
      status:'',
      dialog: false,
      progress:true,
      valid: true,
      loading: false,
      selected: [],
      search:'',
      items:[],
      page: 1,
      totalPages:1,
      pageCount: '',
      itemsPerPage:'',
      path:'',
      totalItems:0,
      options: {},
      selectedItem:0,
      activeItem:{},
      model: {

        dataSearch:'',
      },
      rules:{
         dataSearchRules: [
          v => /^[a-zA-Z0-9-_ @.+]+$/.test(v) || 'Champ obligatoire pour la recherche'
        ]
      },

    })
  }
</script>
<style scoped>
.border-bottom-small {
  border-bottom: solid 1px #80808052;
}

</style>
