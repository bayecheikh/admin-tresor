<template>
  <div class="mx-auto mb-5 pl-4 pt-6 pr-4 pb-0">
    <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">

        <v-row>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Prénom du Responsable"
              outlined dense
              v-model="model.prenom_responsable"
              :rules="rules.prenom_responsableRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Nom du Responsable"
              outlined dense
              v-model="model.nom_responsable"
              :rules="rules.nom_responsableRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Téléphone du Responsable"
              outlined dense
              v-model="model.telephone_responsable"
              :rules="rules.telephone_responsableRules"
            ></v-text-field>
          </v-col>
          <v-col lg="4" md="4" sm="12" class="pb-0 pt-0">
            <v-autocomplete
              v-model="model.region"
              :rules="rules.regionRules"
              :items="listregions"
              outlined
              dense
              label="Région"
              item-text="nom_region"
              item-value="nom_region"
              return-object
              @change="changeRegion"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12" class="pb-0 pt-0">
            <v-autocomplete
              v-model="model.departement"
              :rules="rules.departementRules"
              :items="listdepartements"
              outlined
              dense
              label="Departement"
              item-text="nom_departement"
              item-value="nom_departement"
              return-object
              @change="changeDepartement"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12" class="pb-0 pt-0">
            <v-autocomplete
              v-model="model.commune"
              :rules="rules.communeRules"
              :items="listcommunes"
              outlined
              dense
              label="Commune"
              item-text="nom_commune"
              item-value="nom_commune"
              return-object
              @change="changeCommune"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="3" sm="12" md="3" class="pb-0 pt-0">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="model.created_at"
                  label="Date d'ajout"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="model.created_at"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col md="3" lg="3" sm="12" class="pb-0 pt-0">
            <v-text-field
              label="Numéro CEDEAO"
              outlined dense
              v-model="model.numero_cedeao"
              :rules="numero_cedeaoRules"
            ></v-text-field>
          </v-col>
          <v-col md="3" lg="3" sm="12" class="pb-0 pt-0">
            <v-text-field
              label="Numéro CIN"
              outlined dense
              v-model="model.numero_cin"
              :rules="numero_cedeaoRules"
            ></v-text-field>
          </v-col>
          <v-col md="3" lg="3" sm="12" class="pb-0 pt-0">
            <v-text-field
              label="Numéro Electeur"
              outlined dense
              v-model="model.numero_electeur"
              :rules="numero_cedeaoRules"
            ></v-text-field>
          </v-col>
          
        </v-row>
        <v-row class="d-flex justify-content-between">
          <v-col md="2" lg="2" sm="12">
            <v-btn :loading="loadingRecherche" color="primary" depressed  outlined @click="submitForm">
              Rechercher
            </v-btn>
          </v-col>
          <v-col md="2" lg="2" sm="12">
            <v-btn :loading="loadingTout" text @click="resetInfoElecteur" outlined color="green">Afficher tout</v-btn>
          </v-col>
          <v-col md="2" lg="2" sm="12">
            <v-btn :loading="loadingCedeao" text @click="doublonCedeao" outlined color="blue">Doublons CEDEAO</v-btn>
          </v-col>
          <v-col md="2" lg="2" sm="12">
            <v-btn :loading="loadingCin" text @click="doublonCin" outlined color="blue">Doublons CNI</v-btn>
          </v-col>
          <v-col md="2" lg="2" sm="12">
            <v-btn :loading="loadingElecteur" text @click="doublonElecteur" outlined color="blue">Doublons Electeur</v-btn>
          </v-col>
          <!-- <v-col md="2" lg="2" sm="12">
            <v-btn :loading="loadingSansDoublon" text @click="sansDoublon" outlined color="green">Sans doublons</v-btn>
          </v-col> -->

          <!-- <v-col md="3" lg="3" sm="12">
            <v-btn :loading="loadingDuplicate" text @click="removeDuplicates" outlined color="blue">Cacher les doublons</v-btn>
          </v-col> -->
          <!-- <v-col md="3" lg="3" sm="12">
            <v-btn :loading="loadingDuplicate" text @click="showDuplicates" outlined color="red">Liste des doublons</v-btn>
          </v-col> -->
          <v-col md="2" lg="2" sm="12">
            <v-btn :loading="loadingExport" text @click="downloadExcel" outlined color="red">Expoter la liste</v-btn>
          </v-col>
          <!-- <v-col md="3" lg="3" sm="12">
            <v-btn :loading="loadingExport" text @click="downloadPDF" outlined color="red">Expoter en pdf</v-btn>
          </v-col> -->
          
          <!-- <v-col md="3" lg="3" sm="12">
            <v-btn depressed class="mr-4 text-white" color="green" @click="GotoAddParrainage">
              Ajouter des parrainages
            </v-btn>
          </v-col> -->
        </v-row>

      <!-- <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <div class="custom-ligne-bloc">       
            <p>Numéro CEDEAO</p>
            <v-row>
              <v-col md="1" lg="1" sm="1">
                <v-text-field
                  ref="sexe_cedeao"
                  outlined dense
                  v-model="modelCedeao.sexe"
                  :rules="sexe_cedeaoRules"
                  maxlength="1"
                  @input="moveToCodeRegion_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="2" lg="2" sm="2">
                <v-text-field
                  ref="codeRegion_cedeao"
                  outlined dense
                  v-model="modelCedeao.codeRegion"
                  :rules="codeRegion_cedeaoRules"
                  maxlength="2"
                  @input="moveToAnnee_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="3" lg="3" sm="3">
                <v-text-field
                  ref="annee_cedeao"
                  outlined dense
                  v-model="modelCedeao.annee"
                  :rules="annee_cedeaoRules"
                  maxlength="4"
                  @input="moveToMois_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="1" lg="1" sm="1">
                <v-text-field
                  ref="mois_cedeao"
                  outlined dense
                  v-model="modelCedeao.mois"
                  :rules="mois_cedeaoRules"
                  maxlength="2"
                  @input="moveToJour_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="1" lg="1" sm="1">
                <v-text-field
                  ref="jour_cedeao"
                  outlined dense
                  v-model="modelCedeao.jour"
                  :rules="jour_cedeaoRules"
                  maxlength="2"
                  @input="moveToCodeGenere_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="3" lg="3" sm="3">
                <v-text-field
                  ref="codeGenere_cedeao"
                  outlined dense
                  v-model="modelCedeao.codeGenere"
                  :rules="codeGenere_cedeaoRules"
                  maxlength="5"
                  @input="moveToCodeControle_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="1" lg="1" sm="1">
                <v-text-field
                  ref="codeControle_cedeao"
                  outlined dense
                  v-model="modelCedeao.codeControle"
                  :rules="codeControle_cedeaoRules"
                  maxlength="1"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Prénom"
                  outlined dense
                  v-model="model.prenom"
                  :rules="rules.prenomRules"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Nom"
                  outlined dense
                  v-model="model.nom"
                  :rules="rules.nomRules"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Date de naissance"
                  outlined dense
                  v-model="model.date_naissance"
                  :rules="rules.date_naissanceRules"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Lieu de naissance"
                  outlined dense
                  v-model="model.lieu_naissance"
                  :rules="rules.lieu_naissanceRules"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Taille"
                  outlined dense
                  v-model="model.taille"
                  :rules="rules.tailleRules"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Sexe"
                  outlined dense
                  v-model="model.sexe"
                  :rules="rules.sexeRules"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Numéro Electeur"
                  outlined dense
                  v-model="model.numero_electeur"
                  :rules="rules.numero_electeurRules"
                ></v-text-field>
              </v-col>
              
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Centre de vote"
                  outlined dense
                  v-model="model.centre_vote"
                  :rules="rules.centre_voteRules"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Bureau de vote"
                  outlined dense
                  v-model="model.bureau_vote"
                  :rules="rules.bureau_voteRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Numéro CIN"
                  outlined dense
                  v-model="model.numero_cin"
                  :rules="rules.numero_cinRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Téléphone"
                  outlined dense
                  v-model="model.telephone"
                  :rules="rules.telephoneRules"
                ></v-text-field>
              </v-col>
            </v-row>

          <v-btn class="mr-4 text-white" color="#1B73E8" @click="submitForm">
            Lancer la recherche
          </v-btn>
        </div>     
      </v-card> -->
      
    </v-form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import * as XLSX from 'xlsx'
import {jsPDF} from 'jspdf'
  export default {
    components: {
      
    },
    mounted: function() {
      this.getRegions()
      this.saved_list=this.listparrainages
    },
    computed: {
      ...mapGetters({
      listregions: 'regions/listregions',   
      listparrainages: 'parrainages/listparrainages', 
      }),
      sexe_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            //if (!isNaN(parseFloat(v)) && v <= 2 && v >= 1) return true;                  
            if ((this.model.sexe=='' || this.model.sexe=='M') && parseFloat(v)==1) return true;                  
            if ((this.model.sexe=='' || this.model.sexe=='F') && parseFloat(v)==2) return true;                  
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      codeRegion_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 2) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      annee_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) <= 2005 && v.length == 4) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      mois_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 1 && parseFloat(v) <= 12 && v.length == 2) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      jour_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 1 && parseFloat(v) <= 31 && v.length == 2) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      codeGenere_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 5) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      codeControle_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 1) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      }
      

    },
    data: () => ({
      date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,

      saved_list:[],

      listcommunes:[],
      listdepartements:[],
      listregions:[],

      commune:null,
      departement:null,
      region:null,

      valid: true,
      loading:false,
      loadingRecherche:false,
      loadingTout:false,
      loadingExport:false,
      loadingDuplicate:false,
      loadingCedeao:false,
      loadingCin:false,
      loadingElecteur:false,
      loadingSansDoublon:false,
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
        numero_cedeao:'',
        prenom:'',
        nom:'',
        date_naissance:'',
        lieu_naissance:'',
        taille:'',
        sexe:'',
        numero_electeur:'',
        centre_vote:'',
        bureau_vote:'',
        numero_cin:'',
        telephone:'',
        prenom_responsable:'',
        nom_responsable:'',
        telephone_responsable:'',
        region:'',
        departement:'',
        commune:'',
        created_at:'',
        user_id:''
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
      async changeRegion(value) {
        console.log(value?.departements)
        this.model.departement= ''
        this.model.commune = ''

        this.listcommunes = []
        this.listdepartements = value?.departements 
        this.model.region = value?.nom_region
        
      },
      async changeDepartement(value) {    
        this.model.commune = "" 
        this.listcommunes = value?.communes 
        this.model.departement = value?.nom_departement
      },
      async changeCommune(value) {   
        this.model.commune = value.nom_commune 
      },
      moveToCodeRegion_cedeao(value) {
        if (value.length == 1) {
          this.$refs.codeRegion_cedeao.focus()
        }
      },
      moveToAnnee_cedeao(value) {
        if (value.length == 2) {
          this.$refs.annee_cedeao.focus()
        }
      },
      moveToMois_cedeao(value) {
        if (value.length == 4) {
          this.$refs.mois_cedeao.focus()
        }
      },
      moveToJour_cedeao(value) {
        if (value.length == 2) {
          this.$refs.jour_cedeao.focus()
        }
      },
      moveToCodeGenere_cedeao(value) {
        if (value.length == 2) {
          this.$refs.codeGenere_cedeao.focus()
        }
      },
      moveToCodeControle_cedeao(value) {
        if (value.length == 5) {
          this.$refs.codeControle_cedeao.focus()
        }
      },
      submitForm () {
        this.loadingRecherche = true

        let validation = this.$refs.form.validate()

        //this.model.numero_cedeao = this.modelCedeao.sexe+this.modelCedeao.codeRegion+this.modelCedeao.annee+this.modelCedeao.mois+this.modelCedeao.jour+this.modelCedeao.codeGenere+this.modelCedeao.codeControle
        console.log('FormData ++++++ : ',this.model)

        let formData = new FormData();

        formData.append("numero_cedeao",this.model.numero_cedeao)
        formData.append("prenom",this.model.prenom)
        formData.append("nom",this.model.nom)
        formData.append("date_naissance",this.model.date_naissance)
        formData.append("lieu_naissance",this.model.lieu_naissance)
        formData.append("taille",this.model.taille)
        formData.append("sexe",this.model.sexe)
        formData.append("numero_electeur",this.model.numero_electeur)
        formData.append("centre_vote",this.model.centre_vote)
        formData.append("bureau_vote",this.model.bureau_vote)
        formData.append("numero_cin",this.model.numero_cin)
        formData.append("telephone",this.model.telephone)
        formData.append("prenom_responsable",this.model.prenom_responsable)
        formData.append("nom_responsable",this.model.nom_responsable)
        formData.append("telephone_responsable",this.model.telephone_responsable)
        formData.append("region",this.model.region?this.model.region:'')
        formData.append("departement",this.model.departement)
        formData.append("commune",this.model.commune)
        formData.append("created_at",this.model.created_at)
        formData.append("user_id",this.model.user_id)

       validation && this.$msasApi.post('/recherche_avance_parrainages',formData)
          .then((response) => {
            console.log('Donées reçus ++++++: ',response.data.data)
            this.saved_list=response.data.data
            this.$store.commit('parrainages/initlist',response.data.data)
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loadingRecherche = false;
            this.loadingTout = false;
            console.log('Requette envoyé ')
        });
        
      },
      ExportCSV () {
        this.loadingExport = true

        let validation = this.$refs.form.validate()

        //this.model.numero_cedeao = this.modelCedeao.sexe+this.modelCedeao.codeRegion+this.modelCedeao.annee+this.modelCedeao.mois+this.modelCedeao.jour+this.modelCedeao.codeGenere+this.modelCedeao.codeControle
        console.log('FormData ++++++ : ',this.model)

        let formData = new FormData();

        formData.append("numero_cedeao",this.model.numero_cedeao)
        formData.append("prenom",this.model.prenom)
        formData.append("nom",this.model.nom)
        formData.append("date_naissance",this.model.date_naissance)
        formData.append("lieu_naissance",this.model.lieu_naissance)
        formData.append("taille",this.model.taille)
        formData.append("sexe",this.model.sexe)
        formData.append("numero_electeur",this.model.numero_electeur)
        formData.append("centre_vote",this.model.centre_vote)
        formData.append("bureau_vote",this.model.bureau_vote)
        formData.append("numero_cin",this.model.numero_cin)
        formData.append("telephone",this.model.telephone)
        formData.append("prenom_responsable",this.model.prenom_responsable)
        formData.append("nom_responsable",this.model.nom_responsable)
        formData.append("telephone_responsable",this.model.telephone_responsable)
        formData.append("region",this.model.region)
        formData.append("departement",this.model.departement)
        formData.append("commune",this.model.commune)
        formData.append("created_at",this.model.created_at)
        formData.append("user_id",this.model.user_id)

       validation && this.$msasApi.post('/export_csv_parrainages',formData)
          .then((response) => {
            console.log('Donées reçus ++++++: ',response.data.data)
           // this.listparrainages=response.data.data
            //this.$store.commit('parrainages/initlist',response.data.data)
            console.log('Données reçus++++++++++++',response.data)
            var fileURL = window.URL.createObjectURL(new Blob(["\ufeff",response.data]));
            var fileLink = document.createElement('a');
          
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'parrainages.csv');
            document.body.appendChild(fileLink);
          
            fileLink.click();
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loadingExport = false;
            console.log('Requette envoyé ')
        });
        
      },
      resetInfoElecteur () {
        this.loadingTout = true
        this.model.numero_cedeao = ""
        this.model.prenom = ""
        this.model.nom = ""
        this.model.date_naissance = ""
        this.model.lieu_naissance = ""
        this.model.taille = ""
        this.model.sexe = ""
        this.model.numero_electeur = ""
        this.model.centre_vote = ""
        this.model.bureau_vote = ""
        this.model.numero_cin = ""
        this.model.telephone = ""
        this.model.region = ""
        this.model.departement= ""
        this.model.commune = ""
        this.model.created_at = ""

        this.modelCedeao.sexe=""
        this.modelCedeao.codeRegion =""
        this.modelCedeao.annee =""
        this.modelCedeao.mois =""
        this.modelCedeao.jour =""
        this.modelCedeao.codeGenere =""
        this.modelCedeao.codeControle =""

        this.submitForm()
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
      GotoAddParrainage() {
        this.$router.push('/parrainages/addParrainage');
      },
      showDuplicates() {
        let uniq = {};
        const uniqueItems = this.listparrainages.filter(obj => !uniq[obj.numero_cedeao] && (uniq[obj.numero_cedeao] = true))
        const duplicateItems = this.listparrainages.filter(o=> !uniqueItems.some(i=> i.id === o.id));
        this.$store.commit('parrainages/initlist',duplicateItems)
      },
      removeDuplicates() {
        this.loadingDuplicate=true
        let uniq = {};
        const uniqueItems = this.listparrainages.filter(obj => !uniq[obj.numero_cedeao] && (uniq[obj.numero_cedeao] = true))
        this.$store.commit('parrainages/initlist',uniqueItems)
        this.loadingDuplicate=false
      },
      downloadExcel : function() {
        this.loadingExport=true
        const data = XLSX.utils.json_to_sheet(this.listparrainages)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, data, 'data')
        XLSX.writeFile(wb,'parrainages.xlsx')
        this.loadingExport=false
      },
      downloadPDF : function() {
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();
        doc.text("Hello world!", 10, 10);
        doc.save("a4.pdf");
      },
      async doublonCedeao(){
        this.loading = true
        this.loadingCedeao = true
          let formData = new FormData();
          this.$msasApi.$post('doublonCedeao',formData)
          .then(async (response) => { 
            console.log('Données doublon reçu+++++++++++',response.data)
            this.$store.commit('parrainages/initlist',response.data)
            //this.listregions=response.data.data
            }).catch((error) => {
                console.log('Code error ++++++: ', error?.response?.data?.message)
            }).finally(() => {
            console.log('Requette envoyé ')
            this.loading=false
            this.loadingCedeao=false
          });
        
        
      },
      async doublonCin(){
        this.loading = true
        this.loadingCin = true
          let formData = new FormData();
          this.$msasApi.$post('doublonCin',formData)
          .then(async (response) => { 
            console.log('Données doublon reçu+++++++++++',response.data)
            this.$store.commit('parrainages/initlist',response.data)
            //this.listregions=response.data.data
            }).catch((error) => {
                console.log('Code error ++++++: ', error?.response?.data?.message)
            }).finally(() => {
            console.log('Requette envoyé ')
            this.loading=false
            this.loadingCin=false
          });
        
        
      },
      async doublonElecteur(){
        this.loading = true
        this.loadingElecteur = true
          let formData = new FormData();
          this.$msasApi.$post('doublonNumElecteur',formData)
          .then(async (response) => { 
            console.log('Données doublon reçu+++++++++++',response.data)
            this.$store.commit('parrainages/initlist',response.data)
            //this.listregions=response.data.data
            }).catch((error) => {
                console.log('Code error ++++++: ', error?.response?.data?.message)
            }).finally(() => {
            console.log('Requette envoyé ')
            this.loading=false
            this.loadingElecteur=false
          });
        
        
      },
      async sansDoublon(){
        this.loading = true
        this.loadingSansDoublon = true
          let formData = new FormData();
          this.$msasApi.$post('sansDoublon',formData)
          .then(async (response) => { 
            console.log('Données sans doublon reçu+++++++++++',response?.data)
            this.$store.commit('parrainages/initlist',response?.data)
            //this.listregions=response.data.data
            }).catch((error) => {
                console.log('Code error ++++++: ', error?.response?.data?.message)
            }).finally(() => {
            console.log('Requette envoyé ')
            this.loading=false
            this.loadingSansDoublon=false
          });
        
        
      },
    }
  }
</script>
<style>
#custom-input .v-text-field__slot{
  border-right: solid 1px #e3ebf3;
  margin-right: 7px;
  border-left: solid 1px #e3ebf3;
  padding-left: 25px;
  margin-left: 7px;
}
#custom-input-2 .v-text-field__slot{
  border-right: solid 1px #e3ebf3;
  margin-right: 7px;

  padding-left: 25px;
  margin-left: 7px;
}
.custom-ligne-bloc {
  border: solid 2px #e3ebf3;
  margin: 12px;
  padding: 34px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
.custom-ligne-bloc-2 {
  border: solid 2px #e3ebf3;
  margin: 12px;
  padding: 0px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding-top: 0px;
  margin-bottom: 8px;
  min-width: 300px;
}
</style>
