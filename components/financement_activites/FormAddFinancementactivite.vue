<template>
  <div>
    <v-form class="text-sm-left" v-model="valid" ref="form">
      <v-row>
        <!--<v-col
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
          </v-col>-->
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
        class="mr-4 text-white" color="primary"
        @click="submitForm"
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
      this.$store.dispatch('activites/getList')
      this.$store.dispatch('annees/getList')
      this.$store.dispatch('monnaies/getList')
    },
    computed: {
      ...mapGetters({
      listactivites: 'activites/listactivites',
      listannees: 'annees/listannees',
      listmonnaies: 'monnaies/listmonnaies',
    })},
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      selectedItem: 0,
      valid: true,
      selectedactivite:'',
      model: {
        montant: '',
        libelle_activite:'',
        annee:'',
        trimestre:'',
        type:'cible',
        id_activite:null
      },
      rules:{
        libelleRules: [
          v => !!v || 'Libelle est obligatoire',
          v => (v && v.length <= 50) || 'Prénom doit etre inférieur à 20 caratères',
        ],
        descriptionRules: [
          v => !!v || 'Description est obligatoire'
        ],
      },
    }),
    methods: {
      submitForm () {
        this.loading = true;
        let validation = this.$refs.form.validate()
        console.log('Donées formulaire ++++++ : ',{...this.model})
        
        validation && this.$msasApi.post('/financement_activites', {...this.model})
          .then((res) => {    
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Ajout réussi'})
            this.$router.push('/financement_activites');
            
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