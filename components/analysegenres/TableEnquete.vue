<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="(item,i) in tabItems" :key="i">
            {{item.title}}</v-tab
          >
        </v-tabs>
      </div>
      <div class="ml-auto p-2" v-if="$hasPermission('ajouter_enquete')">
        <v-dialog
          v-model="dialog2"
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
              Nouvelle Analyse genre
            </v-btn>
          </template>
          <v-card>
            <v-card-title >Analyse genre</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <form-add-analyse-genre></form-add-analyse-genre>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="dialog2 = false"
          >
            Fermer
          </v-btn>
        </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
        <div>
          <v-card-title class="col-12">
            <recherche-enquete></recherche-enquete>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="listanalysegenres"
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
                    <!-- <v-btn icon class="col-3" v-on:click="visualiser()">
            <v-icon left class="font-small">
              mdi-file-document-outline
            </v-icon>
            <span class="font-small">Visualiser</span>
          </v-btn> 
          <v-btn icon class="col-3" v-on:click="modifier()">
            <v-icon left class="font-small">
              mdi-square-edit-outline
            </v-icon>
            <span class="font-small">Modifier</span>
          </v-btn>  -->
                    <!--<v-btn icon class="col-3" v-on:click="supprimer()">
                <v-icon left class="font-small"> mdi-trash-can-outline </v-icon>
                <span class="font-small">Supprimer</span>
              </v-btn> -->
                    <!--<v-btn icon class="col-3" v-on:click="exporter()">
            <v-icon left class="font-small">
              mdi-file-export-outline
            </v-icon>
            <span class="font-small">Exporter</span>
          </v-btn>-->
                  </div>
                </v-col>
                <v-col
                  md="6"
                  sm="12"
                  lg="6"
                  class="pt-0 pb-2 align-right-pagination"
                >
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
                      <v-card-title class="text-h5">
                        Confirmation
                      </v-card-title>
                      <v-card-text
                        >Voulez-vous supprimer cet element ?</v-card-text
                      >
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
                        <v-btn
                          color="red darken-1"
                          text
                          @click="deleteItem"
                          outlined
                        >
                          Supprimer définitivement
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-row>
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
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import RechercheEnquete from '@/components/analysegenres/RechercheEnquete';
import RechercheAvance from '@/components/analysegenres/RechercheAvance';
import FormAddAnalyseGenre from '@/components/projets/detail/FormAddAnalyseGenre'
  export default {
    components: {
      RechercheEnquete,
      RechercheAvance,
      FormAddAnalyseGenre
    },
    mounted: function() {    
      this.$hasPermission('brouillon') && this.tabItems.push({title:'Brouillons',value:'brouillon'})
      this.$hasPermission('a_valider') && this.tabItems.push({title:'A valider',value:'a_valider'})
      this.$hasPermission('rejete') && this.tabItems.push({title:'Rejetés',value:'rejete'})
      this.$hasPermission('publie') && this.tabItems.push({title:'Publiés',value:'publie'})
      
      let data = {
          page:1,
          annee : null,
          monnaie : null,
          dimension : null,
          region : null,
          pilier: null,
          axe: null ,
          departement: null,
          structure : null,
          type_source: null,
          source: null         
        }
        this.$store.commit('analysegenres/initdatasearch',data)
      this.getList(1)

    },
    computed: mapGetters({
      listanalysegenres: 'analysegenres/listanalysegenres',
      headers: 'analysegenres/headeranalysegenres',
      totalpage: 'analysegenres/totalpage',
      perpage: 'analysegenres/perpage',
      datasearch: 'ligneanalysegenres/datasearch',
    }),
    methods: {
      getList(page){
          this.progress=true
          this.$msasApi.$get('/analysegenres?page='+page)
        .then(async (response) => {
            console.log('list analysegenre ++++++++++',response)
            let totalPages = Math.ceil(response.data.total / response.data.per_page)
            this.$store.dispatch('analysegenres/getTotalPage',totalPages)
            this.$store.dispatch('analysegenres/getPerPage',response.data.per_page)
            this.$store.dispatch('analysegenres/getList',response.data.data)
            console.log('total page ++++++++++',response.data.total / response.data.per_page)
        }).catch((error) => {
            /* this.$toast.global.my_error().goAway(1500) */ //Using custom toast
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
            this.progress=false
        });
        //console.log('total items++++++++++',this.paginationanalysegenre)
      },
      getResult(param){
         this.progress=true
       
         this.$msasFileApi.post('/recherche_avance_analysegenres',param)
          .then(async (response) => {
            console.log('Données reçus++++++++++++',response.data.data.data)
            await this.$store.dispatch('analysegenres/getList',response.data.data.data)
            let totalPages = Math.ceil(response.data.data.total / response.data.data.per_page)
            this.$store.dispatch('analysegenres/getTotalPage',totalPages)
            this.$store.dispatch('analysegenres/getPerPage',response.data.data.per_page)
            
        }).catch((error) => {
             /* this.$toast.global.my_error().goAway(1500) */ //Using custom toast
            this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé')
             this.progress=false;
             this.loading = false;
        });
      },
      handlePageChange(value){
        console.log('-------------datasearch est',this.datasearch)
        let data = {...this.datasearch,page:value}
        this.$store.commit('analysegenres/initdatasearch',data)
        this.getResult(data)
        this.getList(value)

      },
      visualiserItem (item) {
        this.$store.dispatch('analysegenres/getDetail',item)
        this.$router.push('/analysegenres/detail/'+item.id);
      },
      editItem (item) {
        this.$store.dispatch('analysegenres/getDetail',item)
        this.$router.push('/analysegenres/modifier/'+item.id);
      },
      async deleteItem () {
        this.dialog=false
        this.$store.dispatch('toast/getMessage',{type:'processing',text:'Traitement en cours ...'})
        this.$msasApi.$delete('/analysegenres/'+this.activeItem.id)
        .then(async (response) => {
            this.$store.dispatch('analysegenres/deleteanalysegenre',this.activeItem.id)
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
          let analysegenre = this.selected.map(function(value){ return value})[0]
          this.$store.commit('analysegenres/initdetail',analysegenre)
          this.$router.push('/analysegenres/detail/'+analysegenre.id);
        }
      },
      modifier(){
        if(this.selected.length!=1)
        alert('Veuillez selectionner un element')
        else{
          let analysegenre = this.selected.map(function(value){ return value})[0]
          this.$store.commit('analysegenres/initdetail',analysegenre)
          this.$router.push('/analysegenres/modifier/'+analysegenre.id);
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
      goToAddanalysegenre() {
        this.$router.push('/analysegenres/addEnquete');
      },
    },
    data: () => ({
      tab: 'tout',
      tabItems: [],
      selected: [],
      dialog: false,
      dialog2: false,
      progress:true,
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
      activeItem:{}
    })
  }
</script>
<style scoped>
.border-bottom-small {
  border-bottom: solid 1px #80808052;
}
</style>
