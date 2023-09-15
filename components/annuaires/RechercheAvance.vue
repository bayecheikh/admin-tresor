<template>
  <div class="mx-auto mb-5 pl-4 pt-6 pr-4 pb-0">
    <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">

        <v-row>
          <!-- <v-col md="4" lg="4" sm="12">
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
          </v-col> -->
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
          <v-col lg="4" md="4" sm="12" class="py-0 my-0">
            <v-autocomplete
              v-model="model.type_militant"
              :rules="rules.communeRules"
              :items="listtype_militants"
              outlined
              dense
              label="Type de membre"
              item-text="libelle"
              item-value="libelle"
              return-object
              @change="changeTypeMilitant"
            >
            </v-autocomplete>
          </v-col>
          <v-col md="4" lg="4" sm="12" class="py-0 my-0">
            <v-text-field
              label="Téléphone"
              outlined dense
              v-model="model.telephone"
              :rules="telephoneRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12" class="py-0 my-0">
                <v-text-field
                  label="Nom"
                  outlined dense
                  v-model="model.nom"
                  :rules="rules.nomRules"
                ></v-text-field>
              </v-col>
        </v-row>
        <v-dialog v-model="dialog" width="500">
            
            <v-card>
              <v-card-title class=""> {{ listannuaires.length }} contact(s) selectionn(és)</v-card-title>
              <v-card-text>
              <v-col md="12" lg="12" sm="12">
                <v-text-field
                  label="Expéditeur"
                  outlined dense
                  v-model="expediteur"
                  :rules="rules.prenomRules"
                  readonly
                ></v-text-field>
              </v-col>
                <v-col md="12" lg="12" sm="12">
                    <v-textarea
                      label="Message"
                      outlined
                      dense
                      v-model="message"
                    ></v-textarea>
                  </v-col>
              </v-card-text>
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
                <v-btn :loading="loadingSms" color="green" text @click="sendSMS" outlined>
                  Envoyer le message
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> 
        <v-row class="d-flex justify-content-between">
          
          <v-col md="3" lg="3" sm="12">
            <v-btn :loading="loadingRecherche" color="primary" depressed  outlined @click="submitForm">
              <v-icon>mdi-magnify</v-icon> Lancer la recherche
            </v-btn>
          </v-col>
          <v-col md="3" lg="3" sm="12">
            <v-btn color="primary" depressed  @click="dialog=true">
              <v-icon>mdi-cellphone-message</v-icon> Envoyer un message
            </v-btn>
          </v-col>
          <v-col md="3" lg="3" sm="12">
            <v-btn :loading="loadingExport" depressed  color="blue" outlined @click="ExportCSV">
              <v-icon>mdi-application-export</v-icon> Exporter tout en excel
            </v-btn>
          </v-col>
          <v-col md="3" lg="3" sm="12">
            <v-btn :loading="loadingTout" text @click="resetInfoElecteur" color="green">Afficher toute la liste</v-btn>
          </v-col>
          
          <!-- <v-col md="3" lg="3" sm="12">
            <v-btn depressed class="mr-4 text-white" color="green" @click="GotoAddannuaire">
              Ajouter des contacts
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
  export default {
    components: {
      
    },
    mounted: function() {
      this.getRegions()
      this.getTypeMilitant()
    },
    computed: {
      ...mapGetters({
      listregions: 'regions/listregions', 
      listannuaires: 'annuaires/listannuaires',   
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
      },
      messageRules() {
          return [
          v  => {
            if (!v.trim()) return true;                                                              
            return 'Veuillez saisir un message';
          },
        ]
      }

      

    },
    data: () => ({
      dialog:false,
     loadingSms:false,
      listcommunes:[],
      listdepartements:[],
      listregions:[],
      listtype_militants:[],

      commune:null,
      departement:null,
      region:null,

      message:'',
      expediteur:'PARTI REWMI',

      valid: true,
      loading:false,
      loadingRecherche:false,
      loadingTout:false,
      loadingExport:false,
      
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
      async changeTypeMilitant(value) {   
        this.model.type_militant = value.libelle
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
        formData.append("prenom",this.model.prenom)
        formData.append("nom",this.model.nom)      
        formData.append("telephone",this.model.telephone)
        formData.append("type_militant",this.model.type_militant)
        formData.append("region",this.model.region?this.model.region:'')
        formData.append("departement",this.model.departement)
        formData.append("commune",this.model.commune)

       validation && this.$msasApi.post('/recherche_avance_annuaires',formData)
          .then((response) => {
            console.log('Donées reçus ++++++: ',response.data.data)
           // this.listannuaires=response.data.data
            this.$store.commit('annuaires/initlist',response.data.data)
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

        formData.append("prenom",this.model.prenom)
        formData.append("nom",this.model.nom)
        formData.append("telephone",this.model.telephone)
        formData.append("type_militant",this.model.type_militant)
        formData.append("region",this.model.region)
        formData.append("departement",this.model.departement)
        formData.append("commune",this.model.commune)

       validation && this.$msasApi.post('/export_csv_annuaires',formData)
          .then((response) => {
            console.log('Donées reçus ++++++: ',response.data.data)
           // this.listannuaires=response.data.data
            //this.$store.commit('annuaires/initlist',response.data.data)
            console.log('Données reçus++++++++++++',response.data)
            var fileURL = window.URL.createObjectURL(new Blob(["\ufeff",response.data]));
            var fileLink = document.createElement('a');
          
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'annuaires.csv');
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
      sendSMS () {
        if(this.listannuaires.length){
          this.loadingSms=true

          let validation = this.$refs.form.validate()

          //this.model.numero_cedeao = this.modelCedeao.sexe+this.modelCedeao.codeRegion+this.modelCedeao.annee+this.modelCedeao.mois+this.modelCedeao.jour+this.modelCedeao.codeGenere+this.modelCedeao.codeControle
          console.log('FormData ++++++ : ',this.model)

          let formData = new FormData();

          formData.append("prenom",this.model.prenom)
          formData.append("nom",this.model.nom)
          formData.append("telephone",this.model.telephone)
          formData.append("type_militant",this.model.type_militant)
          formData.append("region",this.model.region)
          formData.append("departement",this.model.departement)
          formData.append("commune",this.model.commune)
          formData.append("expediteur",this.expediteur)
          formData.append("message",this.message)

        validation && this.$msasApi.post('/sendSms',formData)
            .then((response) => {
              console.log('Donées reçus ++++++: ',response.data.data)
            
              this.$store.dispatch('toast/getMessage',{type:'success',text:'Votre message a été envoyé avec succès'})
            })
            .catch((error) => {
                console.log('Code error ++++++: ', error)
                this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
            }).finally(() => {
              this.loadingSms = false
              this.dialog = false;
              console.log('Requette envoyé ')
          });
        }
        else{
          alert("Vous ne pouvez pas envoyer un message car la liste est vide")
        }
        
        
      },
      resetInfoElecteur () {
        this.loadingTout = true
        this.model.prenom = ""
        this.model.nom = ""
        
        this.model.telephone = ""
        this.model.type_militant = ""
        this.model.region = ""
        this.model.departement= ""
        this.model.commune = ""
        this.submitForm()
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
      GotoAddannuaire() {
        this.$router.push('/annuaires/addAnnuaire');
      }
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
