<template>
<div>
  <v-form class="text-sm-center" v-model="valid" ref="form" enctype="multipart/form-data"
    >
    <v-row>
      <!-- <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Prénom du bénéficiaire"
          outlined dense
          v-model="model.prenom_beneficiaire"
          :rules="rules.textfieldRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Nom du bénéficiaire"
          outlined dense
          v-model="model.nom_beneficiaire"
          :rules="rules.textfieldRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Téléphone du bénéficiaire"
          outlined dense
          v-model="model.telephone_beneficiaire"
          :rules="rules.textfieldRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Numéro CNI"
          outlined dense
          v-model="model.cni_beneficiaire"
          :rules="rules.textfieldRules"
        ></v-text-field>
      </v-col>
      <v-col md="12" lg="12" sm="12">
        <v-text-field
          label="Adresse du bénéficiaire"
          outlined dense
          v-model="model.adresse_beneficiaire"
          :rules="rules.textfieldRules"
        ></v-text-field>
      </v-col> -->
      <v-col lg="6" md="6" sm="12">
        <v-autocomplete
          v-model="libelle_paiement"
          :rules="rules.selectRules"
          :items="listlibellespaiements"
          outlined
          dense
          label="Libellé du paiement"
          item-text="libelle"
          item-value="id"
          return-object
          @change="changeLibellePaiement"
        >
        </v-autocomplete>
      </v-col>
      <v-col lg="6" md="6" sm="12">
        <v-autocomplete
          v-model="libelle_operateur"
          :rules="rules.selectRules"
          :items="listlibellesoperateurs"
          outlined
          dense
          label="Opérateur de paiement"
          item-text="libelle"
          item-value="id"
          return-object
          @change="changeLibelleOperateur"
        >
        </v-autocomplete>
      </v-col>
      <v-col md="12" lg="12" sm="12">
        <v-text-field
          label="Montant à payer (F CFA)"
          outlined dense
          v-model="model.montant"
          :rules="rules.textfieldRules"
        ></v-text-field>
      </v-col>
      <v-col md="12" lg="12" sm="12">
        <v-textarea
          label="Commentaire"
          outlined dense
          v-model="model.commentaire"
          :rules="rules.textfieldRules"
        ></v-textarea>
      </v-col>
     
     
    </v-row>

    <v-btn
      :loading="loadingbrouillon"
      :disabled="!validBrouillon"
      class="mr-4 text-white" color="blue"
      @click="enregistrerBrouillon"
    >
      Enregistrer comme brouillon 
    </v-btn>
    <v-btn
      :loading="loadingsoumettre"
      :disabled="!validSoumettre"
      class="mr-4 text-white" color="green"
      @click="soumettreDemande"
    >
      Soumettre la demande
    </v-btn>
  </v-form>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
    },
    mounted: async function() {
      await this.getDetail(this.$nuxt._route.params.id)
          
    },
    computed: {
    },
    data: () => ({
      loggedInUser:null,
      loadingbrouillon: false,
      loadingsoumettre: false,
      validBrouillon : true,
      validSoumettre : true,
      valid: true,
      listlibellesoperateurs:[],
      listlibellespaiements:[],
      listdepartements:[],
      listregions:[],
      listbeneficiaires:[],

      libelle_operateur:null,
      objet_libelle_operateur: null,
      objet_libelle_paiement: null,
      libelle_paiement:null,
      region:null,
      

      model: {
        id:'',
        id_beneficiaire: '',
        prenom_beneficiaire: '',
        nom_beneficiaire: '',
        cni_beneficiaire: '',
        telephone_beneficiaire: '',
        adresse_beneficiaire: '',
        id_paiement:'',
        libelle_paiement:'',
        slug_paiement:'',
        id_operateur:'',
        libelle_operateur:'',
        slug_operateur:'',
        montant:'',
        commentaire: '',
        motif_rejet: '',
        user_id: '',
        status : '',
        state : 'INIT',
      },
      rules:{
        textfieldRules: [],
        radioRules: [],
        selectRules: [],
        textareaRules: [],
        numberRules: [],
        emailRules: [],
        dateRules: [],
      }
    }),
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/transactions/'+id)
        .then(async (response) => {
          console.log('Detail transaction ++++++++++',response.data)
          this.$store.dispatch('transactions/getDetail',response.data)

          this.model.id= response.data.id
         
          // this.model.prenom_beneficiaire= response.data.beneficiaire.length!=0?response.data.beneficiaire[0].prenom_beneficiaire:null
          // this.model.nom_beneficiaire= response.data.beneficiaire.length!=0?response.data.beneficiaire[0].nom_beneficiaire:null
          // this.model.telephone_beneficiaire= response.data.beneficiaire.length!=0?response.data.beneficiaire[0].telephone_beneficiaire:null
          // this.model.cni_beneficiaire= response.data.beneficiaire.length!=0?response.data.beneficiaire[0].numero_cin:null
          // this.model.adresse_beneficiaire= response.data.beneficiaire.length!=0?response.data.beneficiaire[0].adresse_beneficiaire:null
         
          
          this.beneficiaire = response.data.beneficiaire.length!=0?response.data.beneficiaire[0].id:null

         

        }).catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(3000)
          console.log('Code error ++++++', error?.response?.data?.message)
        }).finally(() => {
          console.log('Requette envoyé ')
          this.progress=false
        });
      },
      async controleValidation(){
        this.textfieldRules = [v => !!v || 'Champ obligatoire']
        this.submitForm()
      },
     submitForm () {
       let validation = this.$refs.form.validate()
      
       this.model.user_id = parseInt(this.loggedInUser.id)
       this.model.montant = parseInt(this.model.montant)
       this.model.id_operateur = this.objet_libelle_operateur.id
       this.model.libelle_operateur = this.objet_libelle_operateur.libelle
       this.model.slug_operateur = this.objet_libelle_operateur.slug
       this.model.id_paiement = this.objet_libelle_paiement.id
       this.model.libelle_paiement = this.objet_libelle_paiement.libelle
       this.model.slug_paiement = this.objet_libelle_paiement.slug

       console.log('Données formulaire +++++',{...this.model})
    
       validation && this.$msasApi.post('/transactions',{...this.model})
         .then((res) => {           
           console.log('Données reçus ++++++: ',res.data)
           this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
           this.$router.push('/transactions');
         })
         .catch((error) => {
             console.log('Code error ++++++: ', error)
             this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
         }).finally(() => {
           this.loadingbrouillon = false
           this.loadingsoumettre = false
           console.log('Requête envoyée ')
       }); 
     },
     async enregistrerBrouillon(){
       this.loadingbrouillon = true;
       this.validSoumettre = false
       this.model.status = 'brouillon'
       await this.submitForm()

     },
     async soumettreDemande(){
       this.loadingsoumettre = true
       this.validBrouillon = false
       this.model.status = 'soumis'
       await this.submitForm()
     
     },
   
   
      async changeLibellePaiement(value) {    
       this.libelle_paiement = value.id
       this.objet_libelle_paiement = value
     },
     async changeLibelleOperateur(value) {   
       this.libelle_operateur = value.id  
       this.objet_libelle_operateur = value
     }, 
    
    
   },
 
  }
</script>