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
              v-model="model.id_source"
              :items="listsources"
              :rules="rules.fournisseur_services_idRules"
              outlined
              dense
              label="Source"
              item-text="libelle"
              item-value="id"
              return-object
              @change="changesource"
            >
        </v-autocomplete>
      </v-col>
      <v-col
        lg="6"
        md="6"
        sm="12"
      >
      <v-autocomplete
              v-model="model.id_secteur"
              :items="listsecteurs"
              :rules="rules.fournisseur_services_idRules"
              outlined
              dense
              label="Composante"
              item-text="libelle"
              item-value="id"
              return-object
              @change="changesecteur"
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
import { mapMutations, mapGetters } from 'vuex'
  import Notification from '@/components/Notification'
  export default {
    components: {
      Notification
    },
    mounted: function() {
      this.$store.dispatch('bailleurs/getList')
      this.$store.dispatch('secteurs/getList')
      this.$store.dispatch('annees/getList')
      this.$store.dispatch('monnaies/getList')
    },
    computed: {
      ...mapGetters({
      listsources: 'bailleurs/listbailleurs',
      listsecteurs: 'secteurs/listsecteurs',
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
      selectedsource:'',
      model: {
        montant: '',
        libelle_source:'',
        libelle_secteur:'',
        id_source:null,
        id_secteur:null,
        annee:'',
        trimestre:'',
        type:'resultat',
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
        
        validation && this.$msasApi.post('/financement_sources', {...this.model})
          .then((res) => {    
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Ajout réussi'})
            this.$router.push('/financement_sources_resultats');
            
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
      async changesource(value) {
          //resumé
          this.model.libelle_source = value.libelle     
          this.model.id_source = value.id    
      },
      async changesecteur(value) {
          //resumé
          this.model.libelle_secteur = value.libelle     
          this.model.id_secteur = value.id    
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