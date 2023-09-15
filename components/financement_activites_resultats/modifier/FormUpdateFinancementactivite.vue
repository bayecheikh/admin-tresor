<template>
  <div>
    <v-form class="text-sm-left" v-model="valid" ref="form">
      <v-row>
        <v-col
            lg="6"
            md="6"
            sm="12"
          >
          <v-autocomplete
                  v-model="model.annee"
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
          <v-col lg="6" md="6" sm="12">
              <v-autocomplete
                v-model="model.trimestre"
                :items="listmonnaies"
                :rules="rules.fournisseur_services_idRules"
                outlined
                dense
                label="Trimestre"
                item-text="libelle"
                item-value="libelle"
                
                @change="changeTrimestre"
                >
              </v-autocomplete>
          </v-col>
        <v-col
        lg="6"
        md="6"
        sm="12"
      >
      <v-autocomplete
              v-model="model.id_activite"
              :items="listactivites"
              :rules="rules.fournisseur_services_idRules"
              outlined
              dense
              label="Activité"
              item-text="libelle"
              item-value="id"
              return-object
              @change="changeactivite"
            >
        </v-autocomplete>
      </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Montant"
            outlined dense
            v-model="model.montant"
            :rules="rules.numberRules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
      :loading="loading"
        :disabled="!valid"
        depressed
        class="mr-4 text-white" color="#1B73E8"
        @click="submitForm"
      >
        Enregistrer
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
      Notification
    },
    mounted: function() {
      this.getDetail(this.$nuxt._route.params.id)
      this.$store.dispatch('activites/getList')
      this.$store.dispatch('annees/getList')
      this.$store.dispatch('monnaies/getList')
      
      
    },
    computed: mapGetters({
      detailfinancement_activite:'financement_activites_resultats/detailfinancement_activite',
      listactivites: 'activites/listactivites',
      listannees: 'annees/listannees',
      listmonnaies: 'monnaies/listmonnaies',
    }),
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      selectedItem: 0,
      valid: true,
      model: {
        montant: '',
        libelle_activite:'',
        annee:'',
        trimestre:'',
        type:'resultat',
        id_activite:null
      },
      rules:{
        libelleRules: [
          v => !!v || 'Libellé est obligatoire',
          v => (v && v.length <= 50) || 'Libelle doit etre inférieur à 20 caratères',
        ]
      },
    }),
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/financement_activites/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('financement_activites_resultats/getDetail',response.data)
            this.model.id = this.detailfinancement_activite.id
            this.model.id_activite = this.detailfinancement_activite.activites[0]?this.detailfinancement_activite.activites[0].id:null
            this.model.libelle_activite= this.detailfinancement_activite.libelle_activite
            this.model.montant = this.detailfinancement_activite.montant
            this.model.annee = this.detailfinancement_activite.annee
            this.model.trimestre = this.detailfinancement_activite.trimestre
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationanalyserisque)
      },
      submitForm () {
        this.loading = true;
        let validation = this.$refs.form.validate()
        console.log('Donées formulaire ++++++ : ',{...this.model})
        this.loading = false;
        
        validation && this.$msasApi.put('/financement_activites/'+this.model.id, {...this.model})
          .then((res) => {    
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Ajout réussi'})
            this.$router.push('/financement_activites_resultats');
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
      async changeactivite(value) {
          //resumé
          this.model.libelle_activite = value.libelle     
          this.model.id_activite = value.id    
      },
      async changeAnnee(value) {
          //resumé
          this.model.annee = value     
      },
      async changeTrimestre(value) {
          //resumé
          console.log('trimestre -------- ',value)
          this.model.trimestre = value     
      },
    }
  }
</script>