<template>
<div>
  <v-form class="text-sm-center" v-model="valid" ref="form" enctype="multipart/form-data"
    >
    <v-row>
      <v-col lg="12" md="12" sm="12">
        <v-autocomplete
          v-model="beneficiaire"
          :rules="rules.selectRules"
          :items="listbeneficiaires"
          hide-no-data
          :filter="() => true"
          outlined
          dense
          label="Rechercher un bénéficiaire (Téléphone ou CNI)"
          item-text="nom_beneficiaire"
          item-value="id"
          return-object
          @keyup="(event) => UpdateBeneficiaire(event, index)"
          @change="changeBeneficiaire"
        >
          <template v-slot:selection="data">
            <h5>{{ data.item.prenom_beneficiaire+' '+data.item.nom_beneficiaire }}</h5>
          </template>
          <template v-slot:item="data">
            <div class="mt-4">
              <h5>{{ data.item.prenom_beneficiaire+' '+data.item.nom_beneficiaire }}</h5>
              <p>Tel: {{ data.item.telephone_beneficiaire}}</p>
            </div>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col md="6" lg="6" sm="12">
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
      </v-col>
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
      class="mr-4 text-white" color="black"
      @click="enregistrerBrouillon"
      depressed
    >
      Enregistrer comme brouillon 
    </v-btn>
    <v-btn
      :loading="loadingsoumettre"
      :disabled="!validSoumettre"
      class="mr-4 text-white" color="primary"
      @click="soumettreDemande"
      depressed
    >
      Soumettre la demande
    </v-btn>
  </v-form>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  import Notification from '@/components/Notification'
  export default {
    components: {
      Notification
    },
    mounted: function() {
      this.$msasApi.get('/paiements')
          .then((res) => {           
            this.listlibellespaiements = res.data.data
            console.log ('LLP+++++++++++++++++', this.listlibellespaiements)
          })
          this.$msasApi.get('/operateurs')
          .then((res) => {           
            this.listlibellesoperateurs = res.data.data
            console.log ('LL0+++++++++++++++++', this.listlibellesoperateurs)
          })
      this.loggedInUser = this.$getUser() 
      console.log("AAAAA6+++++++++++", this.$route.query.beneficiaire)
      if(this.$route.query.beneficiaire){
       this.changeBeneficiaire(this.$route.query.beneficiaire)
      }

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
     
      submitForm () {
        let validation = this.$refs.form.validate()
       
        this.model.user_id = parseInt(this.loggedInUser?.id)
        this.model.montant = parseInt(this.model?.montant)
        this.model.id_operateur = this.objet_libelle_operateur?.id
        this.model.libelle_operateur = this.objet_libelle_operateur?.libelle
        this.model.slug_operateur = this.objet_libelle_operateur?.slug
        this.model.id_paiement = this.objet_libelle_paiement?.id
        this.model.libelle_paiement = this.objet_libelle_paiement?.libelle
        this.model.slug_paiement = this.objet_libelle_paiement?.slug

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
    
      // async changeRegion(value) {
      //   this.departement= null
      //   this.commune = null
      //   this.listcommunes = []
      //   this.listdepartements = value?.departements 
      //   this.region = value.id
      // },
       async changeLibellePaiement(value) {    
        this.libelle_paiement = value.id
        this.objet_libelle_paiement = value
      },
      async changeLibelleOperateur(value) {   
        this.libelle_operateur = value.id  
        this.objet_libelle_operateur = value
      }, 
      UpdateBeneficiaire(event,index){
        if((/.+@.+\..+/.test(event.target.value))){
          console.log('Données change ++++++++++++',event.target.value)
          this.getBenefByTerm(event.target.value)
        }
        if(event.target.value.length==9 & (/^[0-9]+$/.test(event.target.value))){
          console.log('Données change ++++++++++++',event.target.value)
          this.getBenefByTerm(event.target.value)
        }
      },
      getBenefByTerm(param){
         this.$msasApi.get('/beneficiaire-by-term/'+param)
          .then(async (response) => {
            console.log('Données reçus++++++++++++',response.data.data)
            this.listbeneficiaires = response?.data?.data         
        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
             this.loadingUsager = false;
        });
      },  
      async changeBeneficiaire(value) {      
        this.beneficiaire = value?.id
        value && value?.id &&  this.$msasApi.$get('/beneficiaires/'+value?.id)
        .then(async (response) => {
            console.log('Detail commune++++++++++',response.data)
            this.model.id_beneficiaire = response.data.id
            this.model.prenom_beneficiaire = response.data.prenom_beneficiaire
            this.model.nom_beneficiaire = response.data.nom_beneficiaire
            this.model.telephone_beneficiaire = response.data.telephone_beneficiaire
            this.model.cni_beneficiaire = response.data.numero_cin
            this.model.adresse_beneficiaire = response.data.adresse_beneficiaire
           
        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationenquete)
      }, 
      
    },
    metaInfo () {
      return {
        items: this.items,
      }
    }
  }
</script>
