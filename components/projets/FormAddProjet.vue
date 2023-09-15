<template>
<div>
  <v-form class="text-sm-center" v-model="valid" ref="form" enctype="multipart/form-data"
    >
    <v-row>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Référence projet"
          outlined dense
          v-model="model.reference_projet"
          :rules="rules.textfieldRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Titre du projet"
          outlined dense
          v-model="model.titre_projet"
          :rules="rules.textfieldRules"
        ></v-text-field>
      </v-col>
      <v-col lg="4" md="4" sm="12">
        <v-autocomplete
          v-model="region"
          :rules="rules.selectRules"
          :items="listregions"
          outlined
          dense
          label="Région"
          item-text="nom_region"
          item-value="id"
          return-object
          @change="changeRegion"
        >
        </v-autocomplete>
      </v-col>
      <v-col lg="4" md="4" sm="12">
        <v-autocomplete
          v-model="departement"
          :rules="rules.selectRules"
          :items="listdepartements"
          outlined
          dense
          label="Departement"
          item-text="nom_departement"
          item-value="id"
          return-object
          @change="changeDepartement"
        >
        </v-autocomplete>
      </v-col>
      <v-col lg="4" md="4" sm="12">
        <v-autocomplete
          v-model="commune"
          :rules="rules.selectRules"
          :items="listcommunes"
          outlined
          dense
          label="Commune"
          item-text="nom_commune"
          item-value="id"
          return-object
          @change="changeCommune"
        >
        </v-autocomplete>
      </v-col>
      <v-col lg="4" md="4" sm="12">
        <v-autocomplete
          v-model="model.beneficiaire"
          :rules="rules.selectRules"
          :items="listbeneficiaires"
          hide-no-data
          :filter="() => true"
          outlined
          dense
          label="Bénéficiaire (Téléphone ou CNI)"
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
    </v-row>

    <v-btn
      :loading="loading"
      :disabled="!valid"
      class="mr-4 text-white" color="primary"
      @click="controleValidation"
    >
      Enregistrer
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
      this.getRegions()
    },
    computed: {
    },
    data: () => ({
      loading: false,
      valid: true,

      listcommunes:[],
      listdepartements:[],
      listregions:[],
      listbeneficiaires:[],

      commune:null,
      departement:null,
      region:null,
      beneficiaire:null,

      model: {
        titre_projet:'',
        reference_projet:'',
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
      submitForm () {
        let validation = this.$refs.form.validate()
        this.loading = true;
    
        console.log('Données formulaire +++++',{...this.model,commune:[this.commune],departement:[this.departement],region:[this.region]})

        validation && this.$msasApi.post('/projets',{...this.model,beneficiaire:[this.beneficiaire],commune:[this.commune],departement:[this.departement],region:[this.region]})
          .then((res) => {           
            console.log('Donées reçus ++++++: ',res.data)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
            this.$router.push('/projets');
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
        }); 
      },
      async controleValidation(){
        this.textfieldRules = [v => !!v || 'Champ obligatoire']
        this.submitForm()
      },
      async changeRegion(value) {
        this.departement= null
        this.commune = null

        this.listcommunes = []
        this.listdepartements = value?.departements 
        this.region = value.id
        
      },
       async changeDepartement(value) {    
        this.commune = null  
        this.listcommunes = value?.communes 
        this.departement = value.id
      },
      async changeCommune(value) {   
        this.commune = value.id  
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
        this.beneficiaire = value.id
        value && value.id &&  this.$msasApi.$get('/beneficiaires/'+value.id)
        .then(async (response) => {
            console.log('Detail commune++++++++++',response.data)
            this.listprojets = response.data.projets
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
