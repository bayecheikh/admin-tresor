<template>
<div>
  
<v-data-table
  :headers="headers"
  :items="listannuaires"
  :single-select="singleSelect"
  item-key="id"
  items-per-page="5"
  class="flat pt-4"
  :loading="progress"
  loading-text="Loading... Please wait"
  :rows-per-page-items="[10,20,30,40,50]"
  hide-default-footer
  :search="search"
>
  <template v-slot:top="{ pagination, options, updateOptions }">
    <v-row class="mb-1 border-bottom-small">
      <v-col md="6" sm="12" lg="6" class="pb-0">
        <v-card-title class="col-6">
          <p class="info-profil"><span>Total :</span>
            <v-chip
              :color="'green'"
              small
              outlined
              class="my-1 mr-1"
            >
            {{ listannuaires.length.toLocaleString() }}
            </v-chip>
          </p>
         <!--  <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Rechercher"
              outlined
              rounded
              dense
              hide-details
            ></v-text-field> -->
      </v-card-title>
      </v-col>
      <v-col md="6" sm="12" lg="6" class="pt-0">  
        <v-data-footer 
          :pagination="pagination" 
          :options="options"
          @update:options="updateOptions"
          items-per-page-text="$vuetify.dataTable.itemsPerPageText" class="border-top-none margin-none"
          itemsPerPageText= ''
        />
      </v-col>
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
  <template v-slot:[`item.type_militant`]="{ item }">
      <v-chip
        color="green"
        small
        outlined
        class="my-1 mr-1"
      >
        {{ item.type_militant }}
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
              <v-list-item @click="editItem(item)" link class="custom-v-list-action pl-2 pr-1">
                <v-list-item-title> 
                  <v-icon small class="mr-2"> mdi-pencil-outline </v-icon
                  >Modifier
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="$hasPermission('gerer-parrainages')" @click="opendialog(item)" class="custom-v-list-action pl-2 pr-1" >
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
<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    computed: mapGetters({
      listannuaires: 'annuaires/listannuaires',
      headers: 'annuaires/headerannuaires'
    }),
    mounted: function() {
      this.getRegions()

      let  data = {
        prenom:'',
        nom:'',     
        telephone:'',
        type_militant:'',
        region:'',
        departement:'',
        commune:''
      }
      this.getResult(data)
    },
    props: ['tab'],
    metaInfo () {
      return {
        tab: this.tab,
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
      activeItem:{},
      listcommunes:[],
      listdepartements:[],
      listregions:[],

      commune:null,
      departement:null,
      region:null,

      valid: true,
      loading:true,
      
      selectedregion:[],

      modelCedeao:{
        sexe:"",
        codeRegion:"",
        annee:"",
        mois:"",
        jour:"",
        codeGenere:"",
        codeControle:"",
      },
      model: {
        
        prenom:'',
        nom:'',       
        telephone:'',
        type_militant:'',
        region:'',
        departement:'',
        commune:''
      },
      rules:{
        numero_cedeaoRules: [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && v >= 0 ) return true;
            return 'Veuillez saisir un chiffre valide';
          },
        ],
        numberRules: [
          v  => {
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && v >= 0 ) return true;
            return 'Veuillez saisir un chiffre valide';
          },
        ],
        nationalityRules: [
          v => !!v || 'Nationalité est obligatoire',
          v => (v && v.length <= 50) || 'Nationalité doit etre inférieur à 15 caratères',
        ]
      }
    }),
    methods: {
      async getRegions(){
        this.$msasApi.$get('regions')
        .then(async (response) => { 
          console.log('Données région reçu+++++++++++',response)
          this.listregions=response.data
          }).catch((error) => {
              console.log('Code error ++++++: ', error?.response?.data?.message)
          }).finally(() => {
          console.log('Requette envoyé ')
        });
      },
      async getTypeMilitant(){
        this.$msasApi.$get('type_militants')
        .then(async (response) => { 
          console.log('Données type militant reçu+++++++++++',response)
          this.listtype_militants=response.data
          }).catch((error) => {
              console.log('Code error ++++++: ', error?.response?.data?.message)
          }).finally(() => {
          console.log('Requette envoyé ')
        });
      },
      async changeRegion(value) {
        console.log(value?.departements)
        this.model.departement= null
        this.model.commune = null

        this.listcommunes = []
        this.listdepartements = value?.departements 
        this.model.region = value?.nom_region
        
      },
      async changeDepartement(value) {    
        this.model.commune = null  
        this.listcommunes = value?.communes 
        this.model.departement = value?.nom_departement
      },
      async changeCommune(value) {   
        this.model.commune = value.nom_commune 
      },
      getResult(param) {
        this.loading = true
        this.progress=true

        //let validation = this.$refs.form.validate()

        //this.model.numero_cedeao = this.modelCedeao.sexe+this.modelCedeao.codeRegion+this.modelCedeao.annee+this.modelCedeao.mois+this.modelCedeao.jour+this.modelCedeao.codeGenere+this.modelCedeao.codeControle
        console.log('FormData ++++++ : ',this.model)

        let formData = new FormData();

        formData.append("prenom",param.prenom)
        formData.append("nom",param.nom)       
        formData.append("telephone",param.telephone)
        formData.append("type_militant",param.type_militant)
        formData.append("region",param.region)
        formData.append("departement",param.departement)
        formData.append("commune",param.commune)

       this.$msasApi.post('/recherche_avance_annuaires',formData)
          .then((response) => {
            console.log('Donées reçus ++++++: ',response.data.data)
           // this.listannuaires=response.data.data
            this.$store.commit('annuaires/initlist',response.data.data)
            this.loading = false;
            this.progress=false
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            this.progress = false;
            console.log('Requette envoyé ')
        });
        
      },
      resetInfoElecteur () {
        this.model.prenom = ""
        this.model.nom = ""
        this.model.telephone = ""

      },
      visualiserItem (item) {   
        this.$store.dispatch('annuaires/getDetail',item)
        this.$router.push('/annuaires/detail/'+item.id);
      },
      editItem (item) {   
        this.$store.dispatch('annuaires/getDetail',item)
        this.$router.push('/annuaires/modifier/'+item.id);
      },
       deleteItem (item) {
        this.dialog=false   
        this.$store.dispatch('toast/getMessage',{type:'processing',text:'Traitement en cours ...'}) 
        this.$msasApi.$delete('/annuaires/'+this.activeItem.id)
        .then(async (response) => { 
            this.$store.dispatch('annuaires/deleteannuaire',this.activeItem.id)
            this.$store.dispatch('toast/getMessage',{type:'success',text:response.data.message || 'Suppression réussie'})
            }).catch((error) => {
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de la suppression'})
              console.log('Code error ++++++: ', error)
            }).finally(() => {
              
            console.log('Requette envoyé ')
        });
        /* alert('Supprimer '+item.id) */
      },
      exporterItem (item) {
        alert('Exporter '+item.id)
      },
      visualiser(){
        if(this.selected.length!=1)
        alert('Veuillez selectionner un element')
        else{
          let annuaire = this.selected.map(function(value){ return value})[0]
          this.$store.commit('annuaires/initdetail',annuaire)
          this.$router.push('/annuaires/detail/'+annuaire.id);
        }
      },
      modifier(){
        if(this.selected.length!=1)
        alert('Veuillez selectionner un element')
        else{
          let annuaire = this.selected.map(function(value){ return value})[0]
          this.$store.commit('annuaires/initdetail',annuaire)
          this.$router.push('/annuaires/modifier/'+annuaire.id);
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
      opendialog (item) {
        this.dialog=true
        this.activeItem=item
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>