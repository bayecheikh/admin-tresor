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
          :rules="rules.prenomRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Nom"
          outlined dense
          v-model="model.nom_beneficiaire"
          :rules="rules.nomRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Téléphone"
          outlined dense
          v-model="model.telephone_beneficiaire"
          :rules="rules.telephoneRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Numéro CNI"
          outlined dense
          v-model="model.numero_cin"
          :rules="rules.numero_cinRules"
        ></v-text-field>
      </v-col>
      <!-- <v-col lg="4" md="4" sm="12">
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
      </v-col> -->
      <v-col md="12" lg="12" sm="12">
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

      commune:null,
      departement:null,
      region:null,

      model: {
        numero_cin:'',
        nom_beneficiaire:'',
        prenom_beneficiaire:'',
        adresse_beneficiaire:'',
        telephone_beneficiaire:''
      },
      rules:{
        prenomRules: [
          v => !!v || 'Le prénom du bénéficiaire est obligatoire',
        ],
        nomRules: [
          v => !!v || 'Le nom du bénéficiaire est obligatoire',
          // v => (v && v.length >= 2) || 'Le prénom doit contenir au moins 2 caracteres',
        ],
        telephoneRules: [
          v => !!v || 'Le numéro de téléphone est obligatoire',
          v => (v && /^\d+$/.test(v)) || 'Le numéro de téléphone doit contenir uniquement des chiffres',
          v => (v && v.length === 9) || 'Le numéro de téléphone doit contenir exactement 9 chiffres',
        ],
        numero_cinRules: [
            v => !!v || 'Le numéro CNI est obligatoire',
            v => (v && /^\d+$/.test(v)) || 'Le numéro CNI doit contenir uniquement des chiffres',
            v => (v && v.length === 13) || 'Le numéro CNI doit contenir exactement 13 chiffres',
        ],
       
       
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

        validation && this.$msasApi.post('/beneficiaires',{...this.model,commune:[this.commune],departement:[this.departement],region:[this.region]})
          .then((res) => {           
            console.log('Données reçus ++++++: ',res.data)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
            this.$router.push('/beneficiaires');
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
      
    },
    metaInfo () {
      return {
        items: this.items,
      }
    }
  }
</script>
