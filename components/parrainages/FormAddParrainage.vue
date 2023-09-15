<template>
  <div>
    <v-form class="" ref="form" enctype="multipart/form-data">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col md="4" lg="4" sm="12" class="py-0 my-0">
            <v-text-field
              label="Prénom du Responsable"
              ref="prenom_responsable"
              outlined dense
              v-model="model.prenom_responsable"
              :rules="rules.prenom_responsableRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12" class="py-0 my-0">
            <v-text-field
              label="Nom du Responsable"
              outlined dense
              v-model="model.nom_responsable"
              :rules="rules.nom_responsableRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12" class="py-0 my-0">
            <v-text-field
              label="Téléphone du Responsable"
              outlined dense
              v-model="model.telephone_responsable"
              :rules="rules.telephone_responsableRules"
            ></v-text-field>
          </v-col>
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
      <h2 class="mb-5 primary custom-title-h2">INFORMATIONS DE L'ELECTEUR</h2>
      <v-card class="mx-auto mb-5 pl-7 pt-7 pr-7 pb-5">
        <div class="custom-ligne-bloc">       
            
            <v-row>
              <v-col md="12" lg="12" sm="2" class="py-0 my-0">
                <h4>Numéro CEDEAO</h4>
              </v-col>
              <v-col md="1" lg="1" sm="1" class="py-0 my-0">
                <v-text-field
                  ref="sexe_cedeao"
                  placeholder="*"
                  
                  v-model="modelCedeao.sexe"
                  :rules="sexe_cedeaoRules"
                  maxlength="1"
                  @input="moveToCodeRegion_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="2" lg="2" sm="2" class="py-0 my-0">
                <v-text-field
                  ref="codeRegion_cedeao"
                  placeholder="**"
                  
                  v-model="modelCedeao.codeRegion"
                  :rules="codeRegion_cedeaoRules"
                  maxlength="2"
                  @input="moveToAnnee_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="3" lg="3" sm="3" class="py-0 my-0">
                <v-text-field
                  ref="annee_cedeao"
                  placeholder="****"
                  
                  v-model="modelCedeao.annee"
                  :rules="annee_cedeaoRules"
                  maxlength="4"
                  @input="moveToMois_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="1" lg="1" sm="1" class="py-0 my-0">
                <v-text-field
                  ref="mois_cedeao"
                  placeholder="**"
                  
                  v-model="modelCedeao.mois"
                  :rules="mois_cedeaoRules"
                  maxlength="2"
                  @input="moveToJour_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="1" lg="1" sm="1" class="py-0 my-0">
                <v-text-field
                  ref="jour_cedeao"
                  placeholder="**"
                 
                  v-model="modelCedeao.jour"
                  :rules="jour_cedeaoRules"
                  maxlength="2"
                  @input="moveToCodeGenere_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="4" class="py-0 my-0">
                <v-text-field
                  ref="codeGenere_cedeao"
                  placeholder="******"
                  
                  v-model="modelCedeao.codeGenere"
                  :rules="codeGenere_cedeaoRules"
                  maxlength="6"
                  @input="moveToCodeControle_cedeao($event)"
                ></v-text-field>
              </v-col>
              <!-- <v-col md="1" lg="1" sm="1" class="py-0 my-0">
                <v-text-field
                  ref="codeControle_cedeao"
                  placeholder="*"
                  
                  v-model="modelCedeao.codeControle"
                  :rules="codeControle_cedeaoRules"
                  maxlength="1"
                ></v-text-field>
              </v-col> -->
            </v-row>
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
              <v-col md="12" lg="12" sm="12">
                
                <v-row>
                  <v-col md="12" lg="12" sm="12" class="py-0 my-0">
                    <h4>Date de naissance</h4>
                  </v-col>
                  <v-col md="1" lg="1" sm="1" class="py-0 my-0">
                    <v-text-field
                      ref="jour_naissance"
                      placeholder="JJ"
                      
                      v-model="modelNaissance.jour"
                      :rules="jour_naissanceRules"
                      maxlength="2"
                      @input="moveToMois_naissance($event)"
                    ></v-text-field>
                  </v-col>
                  <v-col md="1" lg="1" sm="1" class="py-0 my-0">
                    <v-text-field
                      ref="mois_naissance"
                      placeholder="MM"
                      
                      v-model="modelNaissance.mois"
                      :rules="mois_naissanceRules"
                      maxlength="2"
                      @input="moveToAnnee_naissance($event)"
                    ></v-text-field>
                  </v-col>
                  <v-col md="4" lg="4" sm="4" class="py-0 my-0">
                    <v-text-field
                      ref="annee_naissance"
                      placeholder="AAAA"
                      
                      v-model="modelNaissance.annee"
                      :rules="annee_naissanceRules"
                      maxlength="4"
                    ></v-text-field>
                  </v-col>
                  
                </v-row>

              </v-col>
              
              <v-col md="6" lg="6" sm="12" class="py-0 my-0">
                    <v-text-field
                      label="Lieu de naissance"
                      outlined dense
                      v-model="model.lieu_naissance"
                      :rules="rules.lieu_naissanceRules"
                    ></v-text-field>
                  </v-col>
              <v-col md="3" lg="3" sm="12" class="py-0 my-0">
                <v-text-field
                  label="Taille"
                  outlined dense
                  v-model="model.taille"
                  :rules="tailleRules"
                  maxlength="3"
                ></v-text-field>
              </v-col>
              <v-col md="3" lg="3" sm="12" class="py-0 my-0">
                <v-text-field
                  label="Sexe"
                  outlined dense
                  placeholder="M ou F"
                  v-model="model.sexe"
                  :rules="sexeRules"
                  maxlength="1"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="12" class="py-0 my-0">
                <v-text-field
                  label="Numéro Electeur"
                  ref="numero_electeur"
                  outlined dense
                  v-model="model.numero_electeur"
                  :rules="numero_electeurRules"
                  maxlength="9"
                ></v-text-field>
              </v-col>
              
              <v-col md="4" lg="4" sm="12" class="py-0 my-0">
                <v-text-field
                  label="Centre de vote"
                  outlined dense
                  v-model="model.centre_vote"
                  :rules="rules.centre_voteRules"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="12" class="py-0 my-0">
                <v-text-field
                  label="Bureau de vote"
                  outlined dense
                  v-model="model.bureau_vote"
                  :rules="bureau_voteRules"
                  maxlength="2"
                ></v-text-field>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col md="12" lg="12" sm="12" class="py-0 my-0">
                <h4>Numéro CIN</h4>
              </v-col>
              <v-col md="1" lg="1" sm="1" class="py-0 my-0">
                <v-text-field
                  ref="sexe_cin"
                  placeholder="*"
               
                  v-model="modelCin.sexe"
                  :rules="sexe_cinRules"
                  maxlength="1"
                  @input="moveToCodeCentre_cin($event)"
                ></v-text-field>
              </v-col>
              <v-col md="3" lg="3" sm="3" class="py-0 my-0">
                <v-text-field
                  ref="codeCentre_cin"
                  placeholder="***"
                 
                  v-model="modelCin.codeCentre"
                  :rules="codeCentre_cinRules"
                  maxlength="3"
                  @input="moveToAnnee_cin($event)"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="4" class="py-0 my-0">
                <v-text-field
                  ref="annee_cin"
                  placeholder="****"
                 
                  v-model="modelCin.annee"
                  :rules="annee_cinRules"
                  maxlength="4"
                  @input="moveToCodeGenere_cin($event)"
                ></v-text-field>
              </v-col>
  
              <v-col md="4" lg="4" sm="4" class="py-0 my-0">
                <v-text-field
                  ref="codeGenere_cin"
                  placeholder="*****"
                
                  v-model="modelCin.codeGenere"
                  :rules="codeGenere_cinRules"
                  maxlength="6"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="12" lg="12" sm="12" class="py-4 my-0">
                <v-text-field
                  label="Téléphone"
                  outlined dense
                  v-model="model.telephone"
                  :rules="telephoneRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn depressed :loading="loading" class="mr-4" color="" @click="resetInfoElecteur">
            Annuler
          </v-btn>
          <v-btn :disabled="!valid" depressed :loading="loading" class="mr-4 text-white" color="primary" @click="submitForm">
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
      this.$refs.prenom_responsable.focus()
    },
    computed: {
      ...mapGetters({
      listregions: 'regions/listregions',    
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
           // if (parseFloat(v) >= 2005) return "Veuillez verifier le chiffre";                  
            if ( v.length != 4) return "Veuillez verifier le chiffre";                  
           // if ( this.modelCin.annee!='' && v!= this.modelCin.annee) return "Veuillez verifier le CIN";                  
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
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 6) return true;                  
                                              
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
      //Date de naissance rules
      annee_naissanceRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            //if (!isNaN(parseFloat(v)) && parseFloat(v) <= 2005 && v.length == 4) return true;                  
            if (isNaN(parseFloat(v))) return "Veuiilez saisir un chiffre";                  
            if (parseFloat(v) >= 2006) return "Veuillez verifier le chiffre";                  
            if ( v.length != 4) return "Veuillez verifier le chiffre";                  
          //  if ( this.modelCin.annee!='' && v!= this.modelCin.annee) return "Veuillez verifier le CIN";                  
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
            //if (parseFloat(v) >= 2005) return "Veuillez verifier le chiffre";                  
            if ( v.length != 4) return "Veuillez verifier le chiffre";                  
           // if ( this.modelCedeao.annee!='' && v!= this.modelCedeao.annee) return "Veuillez verifier le numéro CEDEAO";                  
           // if ( this.modelNaissance.annee!='' && v!= this.modelNaissance.annee) return "Veuillez verifier la date de naissance";                  
                                              
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
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && (v.length == 5 || v.length == 6)) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      tailleRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) <= 215 && v.length == 3) return true;                  
                                              
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
          this.$msasApi.$post('parrainageByNumCedeao',formData)
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
          this.$msasApi.$post('parrainageByNumCin',formData)
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
          this.$msasApi.$post('parrainageByNumElecteur',formData)
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
        

        let validation = this.$refs.form.validate()

        this.model.numero_cedeao = this.modelCedeao.sexe+this.modelCedeao.codeRegion+this.modelCedeao.annee+this.modelCedeao.mois+this.modelCedeao.jour+this.modelCedeao.codeGenere
        this.model.date_naissance = this.modelNaissance.jour+'/'+this.modelNaissance.mois+'/'+this.modelNaissance.annee
        this.model.numero_cin= this.modelCin.sexe+this.modelCin.codeCentre+this.modelCin.annee+this.modelCin.codeGenere
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

        if(validation && this.model.region!='' && this.model.departement!='' && this.model.commune!=''){
          this.loading = true
            this.$msasApi.post('/parrainages',formData)
            .then((res) => {
              console.log('Donées reçus ++++++: ',res)
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
        }
        else{
          alert("veuillez verifier tous les champs du formulaire avant de soumettre")
        }

        
      },
      resetInfoElecteur () {
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

        this.modelCedeao.sexe=""
        this.modelCedeao.codeRegion =""
        this.modelCedeao.annee =""
        this.modelCedeao.mois =""
        this.modelCedeao.jour =""
        this.modelCedeao.codeGenere =""
        this.modelCedeao.codeControle =""

        this.modelNaissance.annee =""
        this.modelNaissance.mois =""
        this.modelNaissance.jour =""

        this.modelCin.sexe=""
        this.modelCin.codeCentre =""
        this.modelCin.annee =""
        this.modelCin.codeGenere =""
        this.$refs.sexe_cedeao.focus()

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
