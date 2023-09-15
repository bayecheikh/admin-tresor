<template>
<div>
  <v-form class="text-sm-center" v-model="valid" ref="form" enctype="multipart/form-data"
    >
    <v-row>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Prénom"
          outlined dense
          v-model="model.prenom_beneficiaire"
          :rules="rules.textfieldRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Nom"
          outlined dense
          v-model="model.nom_beneficiaire"
          :rules="rules.textfieldRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Téléphone"
          outlined dense
          v-model="model.telephone_beneficiaire"
          :rules="rules.textfieldRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Numéro CNI"
          outlined dense
          v-model="model.numero_cin"
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
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Adresse"
          outlined dense
          v-model="model.adresse_beneficiaire"
          :rules="rules.adresse_beneficiaireRules"
        ></v-text-field>
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
  export default {
    components: {
    },
    mounted: async function() {
      await this.getRegions()
          
    },
    computed: {
    },
    data: () => ({
      loading: false,
      valid: true,

      listcommunes:[],
      listdepartements:[],
      listregions:[],

      commune:null,
      departement:null,
      region:null,

      model: {
        id:'',
        numero_cin:'',
        nom_beneficiaire:'',
        prenom_beneficiaire:'',
        adresse_beneficiaire:'',
        telephone_beneficiaire:''
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
          this.getDetail(this.$nuxt._route.params.id)
          }).catch((error) => {
              console.log('Code error ++++++: ', error?.response?.data?.message)
          }).finally(() => {
          console.log('Requette envoyé ')
        });
      },
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/beneficiaires/'+id)
        .then(async (response) => {
            console.log('Detail beneficiaire ++++++++++',response.data)
            this.$store.dispatch('beneficiaires/getDetail',response.data)

            this.model.id= response.data.id
            this.model.numero_cin = response.data.numero_cin,
            this.model.nom_beneficiaire = response.data.nom_beneficiaire,
            this.model.prenom_beneficiaire = response.data.prenom_beneficiaire,
            this.model.adresse_beneficiaire = response.data.adresse_beneficiaire,
            this.model.telephone_beneficiaire = response.data.telephone_beneficiaire

            this.region = response.data.region.length!=0?response.data.region[0].id:null
            this.departement = response.data.departement.length!=0?response.data.departement[0].id:null
            this.commune = response.data.commune.length!=0?response.data.commune[0].id:null

            this.listdepartements = this.listregions.filter(region => (region.id == this.region))[0]?.departements
            this.listcommunes = this.listdepartements.filter(departement => (departement.id == this.departement))[0]?.communes

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
        this.loading = true;
    
        console.log('Données formulaire +++++',{...this.model,commune:[this.commune],departement:[this.departement],region:[this.region]})

        validation && this.$msasApi.put('/beneficiaires/'+this.model.id,{...this.model,commune:[this.commune],departement:[this.departement],region:[this.region]})
          .then((res) => {
            console.log('Donées reçus ++++++: ',res.data)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
            this.$router.push('/beneficiaires');
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de la modification '})
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
    }
  }
</script>