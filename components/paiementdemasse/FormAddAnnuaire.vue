<template>
  <div>
    <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col lg="4" md="4" sm="12" class="py-0 my-0">
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
          <v-col lg="4" md="4" sm="12" class="py-0 my-0">
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
          <v-col lg="4" md="4" sm="12" class="py-0 my-0">
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
        </v-row>
      </v-card>
      <v-card class="mx-auto mb-5 pl-7 pt-7 pr-7 pb-5">
        <div class="custom-ligne-bloc">       
            <v-row>
              <v-col md="6" lg="6" sm="12" class="py-0 my-0">
                <v-text-field
                  label="Prénom"
                  outlined dense
                  v-model="model.prenom"
                  :rules="rules.prenomRules"
                ></v-text-field>
              </v-col>
              <v-col md="6" lg="6" sm="12" class="py-0 my-0">
                <v-text-field
                  label="Nom"
                  outlined dense
                  v-model="model.nom"
                  :rules="rules.nomRules"
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12" class="py-0 my-0">
                <v-autocomplete
                  v-model="model.type_militant"
                  :rules="rules.communeRules"
                  :items="listtype_militants"
                  outlined
                  dense
                  label="Type de membre"
                  item-text="libelle"
                  item-value="libelle"
                  multiple
                >
                </v-autocomplete>
              </v-col>
              <v-col md="6" lg="6" sm="12" class="py-0 my-0">
                <v-text-field
                  label="Téléphone"
                  outlined dense
                  v-model="model.telephone"
                  :rules="telephoneRules"
                ></v-text-field>
              </v-col>
            </v-row>

          <v-btn depressed :loading="loading" class="mr-4 text-white" color="primary" @click="submitForm">
            Enregistrer
          </v-btn>
        </div>     
      </v-card>
      
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
      //this.$refs.prenom_responsable.focus()
    },
    computed: {
      ...mapGetters({
      listregions: 'regions/listregions',    
      listtype_militants: 'type_militants/listtype_militants',    
      }),
      sexe_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            //if (!isNaN(parseFloat(v)) && v <= 2 && v >= 1) return true;                  
            
            if ((parseFloat(this.modelCin.sexe)==1) && v=='2') return 'Veuillez vérifier le numéro CIN';                  
            if ((parseFloat(this.modelCin.sexe)==2) && v=='1') return 'Veuillez vérifier le numéro CIN';    
            if (this.model.sexe=='M' && v=='2') return 'Veuillez vérifier le sexe';                  
            if (this.model.sexe=='F' && v=='1') return 'Veuillez vérifier le sexe';                                         
            if (v!='1' && v!='2') return 'Le chiffre commence par 1 ou 2';
            return true;
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
            //if (!isNaN(parseFloat(v)) && parseFloat(v) <= 2005 && v.length == 4) return true;                  
            if (isNaN(parseFloat(v))) return "Veuiilez saisir un chiffre";                  
            if (parseFloat(v) >= 2005) return "Veuillez verifier le chiffre";                  
            if ( v.length != 4) return "Veuillez verifier le chiffre";                  
            if ( this.modelCin.annee!='' && v!= this.modelCin.annee) return "Veuillez verifier le CIN";                  
            if ( this.modelNaissance.annee!='' && v!= this.modelNaissance.annee) return "Veuillez verifier la date de naissance";                  
                                              
            return true;
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
        try{
          this.verifyNumCedeao()
        }catch(e){
          console.log(e)
        }
        
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 1) return true;                                             
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      //Date de naissance rules
      annee_naissanceRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            //if (!isNaN(parseFloat(v)) && parseFloat(v) <= 2005 && v.length == 4) return true;                  
            if (isNaN(parseFloat(v))) return "Veuiilez saisir un chiffre";                  
            if (parseFloat(v) >= 2005) return "Veuillez verifier le chiffre";                  
            if ( v.length != 4) return "Veuillez verifier le chiffre";                  
            if ( this.modelCin.annee!='' && v!= this.modelCin.annee) return "Veuillez verifier le CIN";                  
            if ( this.modelCedeao.annee!='' && v!= this.modelCedeao.annee) return "Veuillez verifier le CEDEAO";                                   
                                              
            return true;
          },
        ]
      },
      mois_naissanceRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (isNaN(parseFloat(v))) return "Veuiilez saisir un chiffre"; 
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 1 && parseFloat(v) <= 12 && v.length == 2 && (parseFloat(this.modelCedeao.mois)==parseFloat(v) || this.modelCedeao.mois=='' )) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide ou vérifier le numéro CEDEAO';
          },
        ]
      },
      jour_naissanceRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (isNaN(parseFloat(v))) return "Veuiilez saisir un chiffre"; 
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 1 && parseFloat(v) <= 31 && v.length == 2 && (parseFloat(this.modelCedeao.jour)==parseFloat(v) ||  this.modelCedeao.jour=='')) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide ou vérifier le numéro CEDEAO';
          },
        ]
      },
      sexeRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            //if (!isNaN(parseFloat(v)) && v <= 2 && v >= 1) return true;                  
            if ((parseFloat(this.modelCin.sexe)==1) && v=='F') return 'Veuillez vérifier le numéro CIN';                  
            if ((parseFloat(this.modelCedeao.sexe)==1) && v=='F') return 'Veuillez vérifier le numéro CEDEAO';    
            if ((parseFloat(this.modelCin.sexe)==2) && v=='M') return 'Veuillez vérifier le numéro CIN';                  
            if ((parseFloat(this.modelCedeao.sexe)==2) && v=='M') return 'Veuillez vérifier le numéro CEDEAO';              
            if (v!='F' && v!='M') return 'Veuillez saisir M ou F';                
            return true;
          },
        ]
      },
      //CIN RULES
      sexe_cinRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            //if (!isNaN(parseFloat(v)) && v <= 2 && v >= 1) return true;                  
            if ((parseFloat(this.modelCedeao.sexe)==1) && v=='2') return 'Veuillez vérifier le numéro CEDEAO';                  
            if ((parseFloat(this.modelCedeao.sexe)==2) && v=='1') return 'Veuillez vérifier le numéro CEDEAO';    
            if (this.model.sexe=='M' && v=='2') return 'Veuillez vérifier le sexe';                  
            if (this.model.sexe=='F' && v=='1') return 'Veuillez vérifier le sexe';                                         
            if (v!='1' && v!='2') return 'Le chiffre commence par 1 ou 2';
            return true;
          },
        ]
      },
      codeCentre_cinRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 3) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      annee_cinRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
           // if (!isNaN(parseFloat(v)) && parseFloat(v) <= 2005 && v.length == 4) return true;                  
            if (isNaN(parseFloat(v))) return "Veuiilez saisir un chiffre";                  
            if (parseFloat(v) >= 2005) return "Veuillez verifier le chiffre";                  
            if ( v.length != 4) return "Veuillez verifier le chiffre";                  
            if ( this.modelCedeao.annee!='' && v!= this.modelCedeao.annee) return "Veuillez verifier le numéro CEDEAO";                  
            if ( this.modelNaissance.annee!='' && v!= this.modelNaissance.annee) return "Veuillez verifier la date de naissance";                  
                                              
            return true;
          },
        ]
      },
      codeGenere_cinRules() {
        try{
          this.verifyNumCin()
        }catch(e){
          console.log(e)
        }
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 5) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      tailleRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) <= 250 && v.length == 3) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      numero_electeurRules() {
        try{
          this.verifyNumElecteur()
        }catch(e){
          console.log(e)
        }
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) &&  v.length == 9) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      bureau_voteRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 1) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      telephoneRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;                 
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 1) return true;  
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      getDateNaissance() {
          return this.modelCedeao.jour+'/'+this.modelCedeao.mois+'/'+this.modelCedeao.annee
      },  
      getSexe() {
          return this.modelCedeao.sexe==1?"M":"F"
      }

    },
    data: () => ({
      num_cedeao_exist:true,
      num_cin_exist:false,
      num_electeur_exist:false,
      listcommunes:[],
      listdepartements:[],
      listregions:[],
      listtype_militants:[],

      commune:null,
      departement:null,
      region:null,

      valid: true,
      loading: false,
      
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
      modelNaissance:{
        annee:"",
        mois:"",
        jour:""
      },
      modelCin:{
        sexe:"",
        codeCentre:"",
        annee:"",
        codeGenere:""
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
      async verifyNumCedeao(){
        console.log("request verify-----------------")
        if(this.modelCedeao.sexe!='' &&
        this.modelCedeao.codeRegion!='' &&
        this.modelCedeao.annee!='' &&
        this.modelCedeao.mois!='' &&
        this.modelCedeao.jour!='' &&
        this.modelCedeao.codeGenere!='' &&
        this.modelCedeao.codeControle){
          let numero_cedeao = this.modelCedeao.sexe+this.modelCedeao.codeRegion+this.modelCedeao.annee+this.modelCedeao.mois+this.modelCedeao.jour+this.modelCedeao.codeGenere+this.modelCedeao.codeControle
          let formData = new FormData();
          formData.append("numero_cedeao",numero_cedeao)
          this.$msasApi.$post('annuaireByNumCedeao',formData)
          .then(async (response) => { 
            console.log('Données cedeao reçu+++++++++++',response.data.length)
            this.num_cedeao_exist=response.data.length==0?true:false
            if(response.data.length!=0){
              this.modelCedeao.sexe=""
              this.modelCedeao.codeRegion =""
              this.modelCedeao.annee =""
              this.modelCedeao.mois =""
              this.modelCedeao.jour =""
              this.modelCedeao.codeGenere =""
              this.modelCedeao.codeControle =""
              this.$refs.sexe_cedeao.focus()
              alert("Ce numéro est déja enregistré sur la base de données. Veuillez saisir un autre")
            }
            //this.listregions=response.data.data
            }).catch((error) => {
                console.log('Code error ++++++: ', error?.response?.data?.message)
            }).finally(() => {
            console.log('Requette envoyé ')
            this.num_cedeao_exist=false
          });
        }
        
      },
      async verifyNumCin(){
        console.log("request verify-----------------",this.modelCin.codeGenere.length)
        if(this.modelCin.sexe!='' &&
        this.modelCin.codeCentre!='' &&
        this.modelCin.codeGenere.length==5 &&
        this.modelCin.annee!=''
        ){
          let numero_cin = this.modelCin.sexe+this.modelCin.codeCentre+this.modelCin.annee+this.modelCin.codeGenere
          let formData = new FormData();
          formData.append("numero_cin",numero_cin)
          this.$msasApi.$post('annuaireByNumCin',formData)
          .then(async (response) => { 
            console.log('Données cin reçu+++++++++++',response.data.length)
            this.num_cin_exist=response.data.length==0?true:false
            if(response.data.length!=0){
              this.modelCin.sexe=""
              this.modelCin.annee =""
              this.modelCin.codeGenere =""
              this.modelCin.codeCentre =""
              this.$refs.sexe_cin.focus()
              alert("Ce numéro est déja enregistré sur la base de données. Veuillez saisir un autre")
            }
            //this.listregions=response.data.data
            }).catch((error) => {
                console.log('Code error ++++++: ', error?.response?.data?.message)
            }).finally(() => {
            console.log('Requette envoyé ')
            this.num_cedeao_exist=false
          });
        }
        
      },
      async verifyNumElecteur(){
        console.log("request verify-----------------",this.modelCin.codeGenere.length)
        if(this.model.numero_electeur.length==9 
        ){
          let numero_electeur = this.model.numero_electeur
          let formData = new FormData();
          formData.append("numero_electeur",numero_electeur)
          this.$msasApi.$post('annuaireByNumElecteur',formData)
          .then(async (response) => { 
            console.log('Données cin reçu+++++++++++',response.data.length)
            this.num_cin_exist=response.data.length==0?true:false
            if(response.data.length!=0){
              alert("Ce numéro est déja enregistré sur la base de données. Veuillez saisir un autre")
              this.model.numero_electeur =""
              this.$refs.numero_electeur.focus()
              
            }
            //this.listregions=response.data.data
            }).catch((error) => {
                console.log('Code error ++++++: ', error?.response?.data?.message)
            }).finally(() => {
            console.log('Requette envoyé ')
            this.num_cedeao_exist=false
          });
        }
        
      },
      async changeRegion(value) {
        console.log(value?.departements)
        this.model.departement= ""
        this.model.commune = ""

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
        if (value.length == 1 && this.$refs.sexe_cedeao.validate()) {
          this.$refs.codeRegion_cedeao.focus()
        }
      },
      moveToAnnee_cedeao(value) {
        if (value.length == 2 && this.$refs.codeRegion_cedeao.validate()) {
          this.$refs.annee_cedeao.focus()
        }
      },
      moveToMois_cedeao(value) {
        if (value.length == 4 && this.$refs.annee_cedeao.validate()) {
          this.$refs.mois_cedeao.focus()
        }
      },
      moveToJour_cedeao(value) {
        if (value.length == 2 && this.$refs.mois_cedeao.validate()) {
          this.$refs.jour_cedeao.focus()
        }
      },
      moveToCodeGenere_cedeao(value) {
        if (value.length == 2 && this.$refs.jour_cedeao.validate()) {
          this.$refs.codeGenere_cedeao.focus()
        }
      },
      moveToCodeControle_cedeao(value) {
        if (value.length == 5 && this.$refs.codeGenere_cedeao.validate()) {
          this.$refs.codeControle_cedeao.focus()
        }
      },
      moveToAnnee_naissance(value) {
        if (value.length == 2 && this.$refs.mois_naissance.validate()) {
          this.$refs.annee_naissance.focus()
        }
      },
      moveToMois_naissance(value) {
        if (value.length == 2 && this.$refs.jour_naissance.validate()) {
          this.$refs.mois_naissance.focus()
        }
      },
      //CIN function move
      moveToCodeCentre_cin(value) {
        if (value.length == 1 && this.$refs.sexe_cin.validate()) {
          this.$refs.codeCentre_cin.focus()
        }
      },
      moveToAnnee_cin(value) {
        if (value.length == 3 && this.$refs.codeCentre_cin.validate()) {
          this.$refs.annee_cin.focus()
        }
      },
      moveToCodeGenere_cin(value) {
        if (value.length == 4 && this.$refs.annee_cin.validate()) {
          this.$refs.codeGenere_cin.focus()
        }
      },
      
      submitForm () {
        this.loading = true

        let validation = this.$refs.form.validate()

       
        console.log('FormData ++++++ : ',this.model)
        console.log("cccccc",this.model.type_militant)

        let formData = new FormData();

        formData.append("prenom",this.model.prenom)
        formData.append("nom",this.model.nom)
        
        formData.append("telephone",this.model.telephone)
        formData.append("type_militant",this.model.type_militant)
        
        formData.append("region",this.model.region)
        formData.append("departement",this.model.departement)
        formData.append("commune",this.model.commune)

       validation && this.$msasApi.post('/annuaires',formData)
          .then((res) => {
            console.log('Données reçus ++++++: ',res)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
            this.resetInfoElecteur()
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
        });
        
      },
      resetInfoElecteur () {

        this.model.prenom = ""
        this.model.nom = ""
       
        this.model.telephone = ""
        this.model.type_militant = ""

       

      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
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
