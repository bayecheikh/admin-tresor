<template>
<div>
  <v-form class="text-sm-center" v-model="valid" ref="form" enctype="multipart/form-data"
    >
    <div class="custom-container">
      <v-row>
        <v-col
            lg="6"
            md="6"
            sm="12"
          >
          <v-autocomplete
                  v-model="resume.annee"
                  :items="listannees"
                  :rules="rules.fournisseur_services_idRules"
                  outlined
                  dense
                  label="Année"
                  item-text="libelle"
                  item-value="libelle"
                  
                  @change="changeAnnee"
                >
            </v-autocomplete>
        </v-col>
        <!--<v-col lg="6" md="6" sm="12">
            <v-autocomplete
              v-model="SelectedMonnaie"
              :items="listmonnaies"
              :rules="rules.fournisseur_services_idRules"
              outlined
              dense
              label="Trimestre"
              item-text="libelle"
              item-value="id"
              return-object
              @change="changeTrimestre"
              >
            </v-autocomplete>
        </v-col>-->
      </v-row>
    </div>
    <div class="custom-container">
      <v-tabs v-model="tab">
          <v-tab class="text-normal"> Résultats attendus</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <div class="custom-card-grey">
            <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey">
              <v-row>
                <v-col lg="12" md="12" sm="12">
                  <v-text-field
                    label="Initiatives entreprenariales financées"
                    outlined dense
                    v-model="model.Ind_1_2"
                    :rules="rules.numberRules"
                  ></v-text-field>
                </v-col>
                <v-col lg="12" md="12" sm="12">
                  <v-text-field
                    label="Entrepreneurs formalisés"
                    outlined dense
                    v-model="model.Ind_R_1_2_1"
                    :rules="rules.numberRules"
                  ></v-text-field>
                </v-col>
                <v-col lg="12" md="12" sm="12">
                  <v-text-field
                    label="Emplois direst et indirect créés dont 60% destinés aux femmes"
                    outlined dense
                    v-model="model.Ind_R_1_1_2"
                    :rules="rules.numberRules"
                  ></v-text-field>
                </v-col>
                <v-col lg="12" md="12" sm="12">
                  <v-text-field
                    label="Entrepreneur formés dont plus de 15 000 femmes"
                    outlined dense
                    v-model="model.Ind_R_1_1_1"
                    :rules="rules.numberRules"
                  ></v-text-field>
                </v-col>
                <v-col lg="12" md="12" sm="12">
                  <v-text-field
                    label="Entreprises accompagnées à la transformation digitale dont 50% détenus par des femmes"
                    outlined dense
                    v-model="model.Ind_2_2"
                    :rules="rules.numberRules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-tab-item>          
      </v-tabs-items>
      <v-btn
        :loading="loading"
        :disabled="!valid"
        class="mr-4 text-white" color="primary"
        @click="submitForm"
      >
        Enregistrer
      </v-btn>
    </div>
  </v-form>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
    },
    mounted: function() {
      this.getDetail(this.$nuxt._route.params.id)
      this.$store.dispatch('annees/getList')
      this.$store.dispatch('monnaies/getList')
    },
    computed: 
      mapGetters({
      detailresultat_attendu:'resultat_attendus/detailresultat_attendu',
      listannees: 'annees/listannees',
      listmonnaies: 'monnaies/listmonnaies',
      /* listfournisseurs: 'fournisseurs/selectlistfournisseurs',
      liststructures: 'structures/selectliststructures', */
    }),
    data: () => ({
      tab: null,
      loading: false,
      message:null,
      color:null,
      valid: true,
      showFournisseur: false,
      message:null,
      
      
      model: {      
        Ind_1 : '',
        Ind_2 : '',
        Ind_1_1 : '',
        Ind_2_1 :'',
        Ind_R_3_1_1 :'',
        Ind_R_3_1_2 : '',
        Ind_R_3_2_1 : '',
        Ind_R_3_2_2 :'',

        Ind_1_2 :'',
        Ind_R_1_2_1 :'',
        Ind_R_1_1_2 :'',
        Ind_R_1_1_1 :'',
        Ind_2_2 :'',
        Ind_R_1_2_2 : '',
        Ind_R_2_2_2 : '',
        Ind_R_2_2_1 :'', 	
        Ind_R_1_1_1 :'', 
        Ind_R_2_1_1 :'', 
      },
      resume:{
        annee:'',
        trimestre:''
      },
      rules:{
        firstnameRules: [
          v => !!v || 'Prénom est obligatoire',
          v => (v && v.length <= 50) || 'Prénom doit etre inférieur à 20 caratères',
        ],
        lastnameRules: [
          v => !!v || 'Nom est obligatoire',
          v => (v && v.length <= 50) || 'Nom doit etre inférieur à 10 caratères',
        ],
        emailRules: [
          v => !!v || 'E-mail est obligatoire',
          v => /.+@.+\..+/.test(v) || 'E-mail mdoit etre valide',
        ],
        resultat_attendunameRules: [
          v => !!v || 'Login est obligatoire',
          v => (v && v.length <= 10) || 'Nom doit etre inférieur à 10 caratères',
        ],
        rolesRules: [
          v => (v && !!v.length) || 'Role est obligatoire',
        ],
        telephoneRules: [
          v => !!v || 'Téléphone est obligatoire',
        ],
        country_codeRules: [
          v => !!v || 'L\'indicatif du pays est obligatoire',
        ],
        fournisseur_services_idRules: [
          v => (!!v) || 'Fournisseur est obligatoire',
        ],
        structure_idRules: [
          v => (!!v) || 'Structure est obligatoire',
        ],
        adresseRules: [
          v => !!v || 'Adresse est obligatoire',
          v => (v && v.length <= 100) || 'Adresse doit etre inférieur à 50 caratères',
        ],
        nationalityRules: [
          v => !!v || 'Nationalité est obligatoire',
          v => (v && v.length <= 50) || 'Nationalité doit etre inférieur à 15 caratères',
        ],
        date_of_birthRules: [
          v => !!v || 'Date de naissance est obligatoire',
        ],
        place_of_birthRules: [
          v => !!v || 'Lieu de naissance est obligatoire',
          v => (v && v.length <= 50) || 'Lieu de naissance doit etre inférieur à 20 caratères',
        ],
        /* sexeRules: [
          v => !!v || 'Civilité est obligatoire',
        ], */
        type_identificationRules: [
          v => !!v || 'Type d\'identification est obligatoire',
        ],
        numero_identificationRules: [
          v => !!v || 'Numéro d\'identification est obligatoire'
        ],
        fonctionRules: [
          v => !!v || 'Fonction est obligatoire'
        ]
      },

      imageData:null,
    }),
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/resultat_attendus/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('resultat_attendus/getDetail',response.data)
            this.model = JSON.parse(response.data?.questionnaire)
            this.resume.annee = response.data.annee
            this.resume.trimestre = response.data.trimestre
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationanalyserisque)
      },
      handleFileUpload(e){         
        //Recupère le fichier
        const input = this.$refs.file
        const files = input.files

        //Recupère l'extension
        let idxDot = files[0].name.lastIndexOf(".") + 1;
        let extFile = files[0].name.substr(idxDot, files[0].name.length).toLowerCase(); 
        let size = files[0].size/1024/1024 //La taille en Mbit
        console.log('Size-------------- ',size)

        if (size <= 2 && (extFile=="jpg" || extFile=="jpeg" || extFile=="png")){
          //Affecté le fichier image au model avatar
          this.model.avatar = e.target.files[0];

          //Prévisualise l'image
          if (files && files[0]) {
            const reader = new FileReader
            reader.onload = e => {
              this.imageData = e.target.result
            }
            reader.readAsDataURL(files[0])
            this.$emit('input', files[0])
          }
        }else{
          alert("Seul les images jpg/jpeg png et de taille inférieur à 2Mb sont acceptés!");
        }  
      },
      submitForm () {
        let validation = this.$refs.form.validate()
          this.loading = true;
  
          let formData = new FormData();

          formData.append("id", this.model.id);
          formData.append("_method", "put");
          formData.append("annee", this.resume.annee);
          formData.append("trimestre", this.resume.trimestre);
          formData.append("questionnaire", JSON.stringify(this.model));
          
          validation && this.$msasFileApi.post('/resultat_attendus/'+this.$nuxt._route.params.id,formData)
            .then((res) => {           
              console.log('Donées modif reçus ++++++: ',res.data)
              this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
             this.$router.push('/resultat_attendus');
            })
            .catch((error) => {
                console.log('Code error ++++++: ', error)
                this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
            }).finally(() => {
              this.loading = false;
              console.log('Requette envoyé ')
          });
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
      async changeRole(role) {

        let checkRole = this.model.roles.filter(item => item.name === 'agent_structure').length;
        if(checkRole==1)
        this.showFournisseur=true
        else
        this.showFournisseur=false
        console.log('************',checkRole)
      },
      async changeAnnee(value) {
          //resumé
          this.resume.annee = value     
      },
      async changeTrimestre(value) {
          //resumé
          console.log('trimestre -------- ',value)
          this.resume.trimestre = value.libelle      
      },
    },
    metaInfo () {
      return {
        items: this.items,
      }
    }
  }
</script>