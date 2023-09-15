<template>
  <v-form class=" mt-5 row" v-model="valid" ref="form" enctype="multipart/form-data"
    >
      <v-col md="6" lg="6" sm="12" class="mb-0 pb-0 d-flex">
        <v-text-field  
          ref="inputRef"
          label="Recherche"
          outlined dense
          v-model="model.dataSearch"
          :rules="rules.dataSearchRules"
          placeholder="Année, Trimestre"
          clearable
          :clear-icon-cb="onClearClicked"
          rounded
        ></v-text-field>
        
      </v-col>
      <v-col
        lg="3"
        md="3"
        sm="12"
        class="d-flex"
      >
        <v-btn
          :loading="loading"
          :disabled="!valid"
          class="mr-4 text-white" color="#1B73E8"
          @click="submitForm"
          depressed
          rounded
        >
          Rechercher
        </v-btn>
        <v-btn text @click="onClearClicked" rounded color="red">Réinitialiser</v-btn>
      </v-col>    
  </v-form>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  import Notification from '@/components/Notification'
  export default {
    components: {
      Notification
    },
    mounted: function() {
      //this.$store.dispatch('profils/getList')
    },
    /* computed: {
      ...mapGetters({
      listprofils: 'profils/selectlistprofils',
    })}, */
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      progress:true,
      items:[],
      page: 1,
      totalPages:1,
     typeProfils: [{
          text: "Citoyen",
          value: 1,
          selected: true,
        },
        {
          text: "Entreprise",
          value: 2,
        } 
      ],
      typePieces: [{
          text: "Cni",
          value: "cni",
          selected: true,
        },
        {
          text: "Passeport",
          value: "passeport",
        } 
      ],
      model: {
        avatar:'',
        sexe:'Masculin',
        dataSearch:'',
        firstname: '',
        lastname: '',
        email: 'tesdddddddddt@adie.sn',
        sectorielname: '',
        type_profil_id: 'citoyen',
        telephone: '0554525152',
        address: 'dakar',
        nationality: 'senegalaise',
        date_of_birth: '1988-09-24',
        place_of_birth: 'Dakar',
        type_identification: 'cin',
        numero_identification: '',
        fonction: 'Devops',
        structure_id:JSON.parse(localStorage.getItem('loggedInUser')).id
      },
       rules:{
         dataSearchRules: [
          v => /^[a-zA-Z0-9-_ @.+]+$/.test(v) || 'Champ obligatoire'
        ],
        firstnameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        lastnameRules: [
          v => !!v || 'Nom est obligatoire',
          v => /^[a-zA-Z0-9-_ ]+$/.test(v) || 'Nom incorrecte',
        ],
        emailRules: [
          v => !!v || 'E-mail est obligatoire',
          v => /.+@.+\..+/.test(v) || 'E-mail mdoit etre valide',
        ],
        sectorielnameRules: [
          v => !!v || 'Login est obligatoire',
          v => /^[a-zA-Z0-9-_]+$/.test(v) || 'Nom incorrecte',
        ],
        type_profil_idRules: [
          v => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ || 'Type profile incorrecte',
        ],
        telephoneRules: [
          v => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ || 'Téléphone incorrecte',
        ],
        addressRules: [
          v => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ || 'Adresse incorrecte',
        ],
        nationalityRules: [
          v => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ || 'Nationalité incorrecte',
        ],
        date_of_birthRules: [
          v => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ || 'Date de naissance incorrecte',
        ],
        place_of_birthRules: [
          v => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ || 'Lieu de naissance incorrecte',
        ],
        type_identificationRules: [
          v => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ || 'Type d\'identification incorrecte',
        ],
        numero_identificationRules: [
          v => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/|| 'Numéro d\'identification incorrecte',
        ],
        fonctionRules: [
          v => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ || 'Fonction incorrecte',
        ],
        structure_idRules: [
         v => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ || 'Structure incorrecte',
        ]
      },
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      imageData:null,
    }),
    methods: {
      onClearClicked () {
       this.$refs.inputRef.clearableCallback()
       this.page=1
       this.getList()
      },
      submitForm () {
        let validation = this.$refs.form.validate()
        this.loading = true;
        console.log('donnee envoyées++++++++++++++',this.model.dataSearch)
        this.$store.commit('sectoriels/initdatasearch',this.model.dataSearch)
        validation && this.getResult(1,this.model.dataSearch)
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
      getList(){
        this.page=1
        this.progress=true
        this.$store.dispatch('sectoriels/getDataSearch',null)
         this.$msasApi.$get('/sectoriels?page=1')
        .then(async (response) => {
          this.page=1
            let totalPages = Math.ceil(response.data.data.total / response.data.data.per_page)
            this.$store.dispatch('sectoriels/getTotalPage',totalPages)
            this.$store.dispatch('sectoriels/getPerPage',response.data.data.per_page)
            this.$store.dispatch('sectoriels/getList',response.data.data)
        }).catch((error) => {
            /* this.$toast.global.my_error().goAway(1500) */ //Using custom toast
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
            this.progress=false
        });
        console.log('total items++++++++++',this.paginationUtilisateur)
      },
      getResult(page,param){
        this.page=1
         this.progress=true
         this.$msasApi.get('/sectoriels-multiple-search/'+param+'?page='+page)
          .then(async (response) => {
            console.log('Données reçus++++++++++++',response.data.data.data)
            await this.$store.dispatch('sectoriels/getList',response.data.data.data)
            let totalPages = Math.ceil(response.data.data.total / response.data.data.per_page)
            this.$store.dispatch('sectoriels/getTotalPage',totalPages)
            this.$store.dispatch('sectoriels/getPerPage',response.data.data.per_page)
            
        }).catch((error) => {
             /* this.$toast.global.my_error().goAway(1500) */ //Using custom toast
            this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé')
             this.progress=false;
             this.loading = false;
        });
      },
    },
    metaInfo () {
      return {
        items: this.items,
      }
    }
  }
</script>
