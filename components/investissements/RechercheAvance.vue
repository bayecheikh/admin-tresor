<template>
  <div>
    <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col lg="2" md="2" sm="12">
            <v-autocomplete
            ref="inputRef"
              v-model="selectedAnnee"
              :items="listannees"
              outlined
              dense
              label="Année"
              item-text="libelle"
              item-value="id"
              return-object
              @change="changeAnnee"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="2" md="2" sm="12">
            <v-autocomplete
            ref="inputRef"
              v-model="SelectedMonnaie"
              :items="listmonnaies"
              outlined
              dense
              label="Monnaie"
              item-text="libelle"
              item-value="id"
              return-object
              @change="changeMonnaie"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="2" md="2" sm="12">
            <v-autocomplete
            ref="inputRef"
              v-model="SelectedRegions"
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
              ref="inputRef"
                v-model="selectedPiliers"
                :items="listpiliers"
                
                outlined
                dense
                label="Piliers"
                item-text="nom_pilier"
                item-value="id"
                return-object
                @change="(event) => changePilier(event)"
              >
              </v-autocomplete>
          </v-col>
          <v-col lg="2" md="2" sm="12" v-if="showAxes">
            <v-autocomplete
            ref="inputRef"
              v-model="selectedAxes"
              :items="listAxes0"
              outlined
              dense
              label="Axe"
              item-text="nom_axe"
              item-value="id"
              return-object
              @change="(event) => changeAxe(event)"
            >
            </v-autocomplete>
          </v-col>
          <v-col md="12" lg="12" sm="12">
            <v-radio-group
            ref="inputRef"
              :v-model="selectedDimension"
              @change="changeDimension"
              row
            >
              <v-radio
                v-for="item in listdimensions"
                :key="item.id"
                :label="item.libelle_dimension"
                :value="item.id"
              ></v-radio>
            </v-radio-group>
          </v-col>          
          <v-col lg="2" md="2" sm="12" class="d-flex">
            <v-btn :loading="loading" depressed class="mr-4 text-white" color="primary" @click="submitForm">
            Lancer la recherche
            </v-btn>
            <v-btn text @click="onClearClicked" rounded color="red">Réinitialiser</v-btn>
          </v-col>
        </v-row>
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
      this.$store.dispatch('annees/getList')
      this.$store.dispatch('monnaies/getList')
      this.$store.dispatch('dimensions/getList')
      this.$store.dispatch('regions/getList')
      this.$store.dispatch('structures/getList')
      this.$store.dispatch('modefinancements/getList')
      this.$store.dispatch('piliers/getList')
      this.listPiliers=this.listpiliers
    },
    computed: {
      ...mapGetters({
      listannees: 'annees/listannees',
      listmonnaies: 'monnaies/listmonnaies',
      listdimensions: 'dimensions/listdimensions',
      listregions: 'regions/listregions',
      listmodefinancements: 'modefinancements/listmodefinancements',
      listpiliers: 'piliers/listpiliers',
      listaxes: 'axes/axes',
      
    })},
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      progress:true,
      items:[],
      page: 1,
      totalPages:1,
      inputfichiers:[],
      libelle_fichiers:[],
      fichiers:[],
      counterrow:1,
      counterrow_fichier:1,
      filename : '',
      loading: false,
      message:null,
      color:null,
      valid: true,
      showFournisseur: false,
      showAutreMode: false,
      showNumAutorisation: false,
      showAccordSiege: false,
      showNumAgrement: false,
      showAdresseStructure: false,
      showRegion: false,
      showAxes:false,
      message:null,
      autreMode:false,
      devise:'',
      listPiliers:[],
      listAxes:[],
      modeFinanceInputs:[{
        id:1,
        libelle:'Subvention',
        description:'Le montant de la subvention'
      },
      {
        id:2,
        libelle:'Transfert',
        description:'Le montant du transfert'
      },
      {
        id:3,
        libelle:'Recette',
        description:'Le montant de la recette'
      },
      {
        id:4,
        libelle:'Don',
        description:'Le montant du don'
      }],
      LigneModeFinancement:[],
      LigneFinancementInputs:[],
      selectedPiliers0:[],
      selectedAxes0:[],
      montantBienServicePrevus0:'',
      montantBienServiceMobilises0:'',
      montantBienServiceExecutes0:'',
      montantInvestissementPrevus0:'',
      montantInvestissementMobilises0:'',
      montantInvestissementExecutes0:'',

      selectedPiliers:[],
      selectedAxes:[],
      montantBienServicePrevus:[],
      montantBienServiceMobilises:[],
      montantBienServiceExecutes:[],
      montantInvestissementPrevus:[],
      montantInvestissementMobilises:[],
      montantInvestissementExecutes:[],

      selectedAnnee: [],
      selectedMonnaie: [],
      selectedDimension: [],
      selectedRegions: [],
      selectedModeFinancements: [],
      selectedStructure: [],
      slectedDepartement:[],
      selectedType_source:[],
      selectedSource:[],
      model: {
        libAutreModeFinance:'',
        montantAutreModeFinance:''
      },
      rules:{
        nom_structureRules: [
          v => !!v || 'Dénomination est obligatoire'
        ],
        nameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        firstnameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        lastnameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        emailRules: [
          v => !!v || 'l\'E-mail est obligatoire',
          v => /.+@.+\..+/.test(v) || 'E-mail mdoit etre valide',
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
        selectRules: [
          v => (v && v== 0) || 'Ce obligatoire',
        ],
        structure_idRules: [
          v => (!!v) || 'Structure est obligatoire',
        ],
        adresseRules: [
          v => !!v || 'Adresse est obligatoire',
          v => (v && v.length >= 1) || 'Adresse doit etre inférieur à 50 caratères',
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
      date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      imageData:null,
    }),
    methods: {
      handleFileUpload(e){
        //Recupère le fichier
        const input = this.$refs.file
        const files = input.files

        //Recupère l'extension
        let idxDot = files[0]?.name.lastIndexOf(".") + 1;
        let extFile = files[0]?.name.substr(idxDot, files[0].name.length).toLowerCase();
        let size = files[0]?.size/1024/1024 //La taille en Mbit
        console.log('Size-------------- ',size)
        if(files.length!=0){
          if (size <= 5 && (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="pdf" || extFile=="doc" || extFile=="docx")){
            this.model.accord_siege = files[0];
            this.filename = files[0].name
          }else{
            alert("Seul les fichiers jpg/jpeg/png/pdf/doc/docx et de taille inférieur à 5Mb sont acceptés!");
          }
        }
      },
      submitForm () {
        this.loading = true

        let validation = this.$refs.form.validate()

        let annee = this.selectedAnnee?.id || null
        let monnaie = this.selectedMonnaie?.id || null
        let region = this.selectedRegion?.id || null
        let dimension = this.selectedDimension || null
        let piliers = this.selectedPiliers?.id || null
        let axes = this.selectedAxes?.id || null
        let departement = this.slectedDepartement?.id || null
        let structure = this.selectedStructure?.id || null
        let type_source = this.selectedType_source?.id || null
        let source = this.selectedSource?.id || null 

        let data = {
          page:1,
          annee : annee,
          monnaie : monnaie,
          dimension : dimension,
          region : region,
          pilier: piliers,
          axe: axes ,
          departement: departement,
          structure : structure,
          type_source: type_source,
          source: source         
        }

        this.$store.commit('ligneinvestissements/initdatasearch',{...data})

        console.log('Donées formulaire recherche ++++++: ',data)
        validation && this.getResult(data)
      },
      getResult(param){
         this.progress=true
       
         this.$msasFileApi.post('/recherche_avance_investissements',param)
          .then(async (response) => {
            console.log('Données reçus++++++++++++',response.data.data.data)
            await this.$store.dispatch('ligneinvestissements/getList',response.data.data.data)
            let totalPages = Math.ceil(response.data.data.total / response.data.data.per_page)
            this.$store.dispatch('ligneinvestissements/getTotalPage',totalPages)
            this.$store.dispatch('ligneinvestissements/getPerPage',response.data.data.per_page)
            
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
      submitLigne () {
        this.counterrow += 1;
        this.selectedPiliers.push(this.selectedPiliers0)
        this.selectedAxes.push(this.selectedAxes0)
        this.montantBienServicePrevus.push(this.montantBienServicePrevus0)
        this.montantBienServiceMobilises.push(this.montantBienServiceMobilises0)
        this.montantBienServiceExecutes.push(this.montantBienServiceExecutes0)
        this.montantInvestissementPrevus.push(this.montantInvestissementPrevus0)
        this.montantInvestissementMobilises.push(this.montantInvestissementMobilises0)
        this.montantInvestissementExecutes.push(this.montantInvestissementExecutes0)

        this.LigneFinancementInputs.push({
          id:this.counterrow,
          pilier:this.selectedPiliers0,
          axe:this.selectedAxes0,
          montantBienServicePrevus:this.montantBienServicePrevus0,
          montantBienServiceMobilises:this.montantBienServiceMobilises0,
          montantBienServiceExecutes:this.montantBienServiceExecutes0,
          montantInvestissementPrevus:this.montantInvestissementPrevus0,
          montantInvestissementMobilises:this.montantInvestissementMobilises0,
          montantInvestissementExecutes:this.montantInvestissementExecutes0
        })

        console.log('Donées LigneFinancementInputs ++++++: ',this.LigneFinancementInputs)
      },
      deleteFind: function(index) {
        console.log('Index---- ',index);
        console.log('LigneFinancementInputs---- ',this.LigneFinancementInputs);
        this.LigneFinancementInputs.splice(index,1);
        this.selectedPiliers.splice(index,1);
        this.selectedAxes.splice(index,1);
        this.montantBienServicePrevus.splice(index,1);
        this.montantBienServiceExecutes.splice(index,1);
        this.montantInvestissementPrevus.splice(index,1);
        this.montantInvestissementMobilises.splice(index,1);
        this.montantInvestissementExecutes.splice(index,1);
      },
      deleteFindFichier: function(index) {
        console.log('Index---- ',index);
        console.log('LigneFinancementInputs---- ',this.fichiers);
        this.fichiers.splice(index,1);
        this.libelle_fichiers.splice(index,1);
        this.inputfichiers.splice(index,1);

      },
      submitLigneFichier () {
        this.counterrow_fichier += 1;
        this.fichiers.push({id:this.counterrow_fichier,libelle_fichier:this.libelle_fichiers[this.counterrow_fichier],input_fichier:this.inputfichiers[this.counterrow_fichier]})
        console.log('Donées fichier row ++++++: ',this.fichiers)
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
      async changeAutreMode(value) {
        this.showAutreMode=value?true:false
      },
      async changeAnnee(annee) {
        //this.showAutreMode=true
        this.selectedAnnee = annee
        //this.selectedType_sources = source.type_sources
        console.log('************',annee)
      },
      async changeRegion(region) {
        //this.showAutreMode=true
        this.selectedRegion = region
        //this.selectedType_sources = source.type_sources
        console.log('************',region)
      },
      async changeMonnaie(monnaie) {
        //this.showAutreMode=true
        this.selectedMonnaie = monnaie
        this.devise = monnaie.libelle
        //this.selectedType_sources = source.type_sources
        console.log('************',monnaie)
      },
      async changeDimension(e) {
        console.log('************',e)
        this.selectedDimension = e
        
      },
      async changePilier(value) {
        this.showAxes=true
        this.selectedPiliers0= value
        this.listAxes0 = value.axes         
        console.log('************',value)
        //console.log('************',i)
      },
      async changeAxe(value) {
        this.selectedAxes0 = value         
        console.log('************',value)

      },
      onClearClicked () {
        this.selectedAnnee = []
        this.SelectedMonnaie= []
        this.SelectedRegions= []
        this.selectedDimension= []
        this.selectedPiliers= []
        this.selectedAxes= []
        this.slectedDepartement= []
        this.selectedStructure= []
        this.selectedType_source= []
        this.selectedSource= []

        let data = {
          page:1,
          annee : null,
          monnaie : null,
          dimension : null,
          region : null,
          pilier: null,
          axe: null ,
          departement: null,
          structure : null,
          type_source: null,
          source: null         
        }

       this.$store.commit('investissements/initdatasearch',data)
       this.getResult(data)
      },
    },
    metaInfo () {
      return {
        items: this.items,
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
</style>
