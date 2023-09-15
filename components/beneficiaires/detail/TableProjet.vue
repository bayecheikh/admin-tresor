<template>
<div>
  <v-card-title class="py-2 col-6">
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filtrer"
          outlined
          rounded
          dense
          hide-details
        ></v-text-field>
  </v-card-title>
  <v-data-table
        :headers="headers"
        :items="detailBeneficiaire && detailBeneficiaire.projets"
        :single-select="singleSelect"
        item-key="id"
        class="flat pt-4"
        :loading="detailBeneficiaire.projets?false:true"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <template v-slot:top="{}">
          <v-row class="mb-1 border-bottom-small d-flex">
        <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h5"> Confirmation </v-card-title>
            <v-card-text>Voulez-vous supprimer cet element ?</v-card-text>
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
              </v-item-group>
            </v-list>
          </v-menu>
        </template>
  </v-data-table>
</div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    mounted: function() {
      //this.getList()
    },
    computed: mapGetters({
      listprojets: 'projets/listprojetsByUsager',
      headers: 'projets/headerprojets2',
      detailBeneficiaire: 'beneficiaires/detailbeneficiaire'
    }),
     data: () => ({
    }),
    props: ['tab'],
    metaInfo () {
      return {
        tab: this.tab,
      }
    },
    methods: {
      async getList(){
        this.progress=true
        let idUsager = this.$route.params.id
        console.log('ID usager ++***********+++ : ', idUsager)   
        await this.$essApi.$get('/ess/dossiersByUser/'+idUsager )
        .then(async (response) => {
          console.log('Reponse données projets reçu by usager +++++ : ', response.data)
          this.$store.dispatch('projets/getListByUsager',response.data)
        }).catch((error) => {
             /* this.$toast.global.my_error().goAway(1500) */ //Using custom toast
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
            this.progress=false
        });
      },
      handlePageChange(value){
        this.getList(value)
      },
      visualiserItem (item) {   
        //this.$store.dispatch('usagers/getDetail',item)
        this.$router.push('/projets/detail/'+item.id);
      },
      visualiserUser (item) {   
        //this.$store.dispatch('usagers/getDetail',item)
        this.$router.push('/usagers/detail/'+item.id);
      },
      editItem (item) {   
        this.$store.dispatch('projets/getDetail',item)
        this.$router.push('/projets/modifier/'+item.id);
      },
      async deleteItem () {
        this.$toast.show('Supression en cours ...')
        this.dialog=false   
        this.$store.dispatch('toast/getMessage',{type:'processing',text:'Traitement en cours ...'}) 
        this.$essApi.$delete('/projets/'+this.activeItem.id)
        .then(async (response) => { 
            this.$store.dispatch('projets/deleteprojetByUsager',this.activeItem.id)
            this.$store.dispatch('toast/getMessage',{type:'success',text:response || 'Suppression réussie'})
            }).catch((error) => {
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de la suppression'})
              console.log('Code error ++++++: ', error)
            }).finally(() => {
              
            console.log('Requette envoyé ')
        });
      },
      opendialog (item) {
        this.dialog=true
        this.activeItem=item
      },
      exporterItem (item) {
        alert('Exporter '+item.username)
      },
      visualiser(){
        if(this.selected.length!=1)
        alert('Veuillez selectionner un element')
        else{
          let projet = this.selected.map(function(value){ return value})[0]
          this.$store.commit('projets/initdetail',projet)
          this.$router.push('/projets/detail/'+projet.name);
        }
      },
      modifier(){
        if(this.selected.length!=1)
        alert('Veuillez selectionner un element')
        else{
          let projet = this.selected.map(function(value){ return value})[0]
          this.$store.commit('projets/initdetail',projet)
          this.$router.push('/projets/modifier/'+projet.name);
        }
      },
      supprimer(){
        if(this.selected.length>=1)
        alert('Supprimer '+this.selected.map(function(value){ return value.name}))
        else
        alert('Veuillez selectionner un element')
      },
      exporter(){
        if(this.selected.length>=1)
        alert('Exporter '+this.selected.map(function(value){ return value.name}))
        else
        alert('Veuillez selectionner un element')
      }
    },
    data: () => ({
      dialog: false,
      progress:true,
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
      activeItem:{}
    })
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>