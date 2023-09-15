<template>
  <v-row
    align-item="center"
    justify="space-around"
  >
    <v-btn
      text
      color="primary"
      v-on:click="retour()"
    >
      <v-icon left>
        mdi-arrow-left
      </v-icon>
      Retour à la liste
    </v-btn>
    <v-btn
      flat
      outlined
      v-on:click="modifier()"
      v-if="detailenquete.status=='brouillon' || detailenquete.status=='rejete'"
    >
      <v-icon left>
        mdi-pencil
      </v-icon>
      Modifier
    </v-btn> 
    <div v-if="$hasPermission(detailenquete.state) && $hasPermission('rejet') && (detailenquete.status=='rejete' || detailenquete.status=='a_valider' || $hasRole('admin_dprs'))">
      <template>
        <v-row >
          <v-dialog
            v-model="dialog"
            max-width="800px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="error"
                  v-bind="attrs"
                  v-on="on"
                  depressed
                  outlined
                >
                <v-icon>mdi-check</v-icon>
                Rejeter
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-col lg="12" md="12" sm="12" class="pb-0 pt-10">
                   <v-textarea
                      v-model="model.motif"
                      label="Motif du rejet"
                      dense outlined
                    ></v-textarea>
                    <v-btn
                    :loading="loadingRejet"
                      flat
                      rounded
                      outlined
                      color="error"
                      v-on:click="rejeter()"
                      v-if="$hasPermission(detailenquete.state) && $hasPermission('rejet') && (detailenquete.status=='rejete' || detailenquete.status=='a_valider' || $hasRole('admin_dprs'))"
                    >
                      <v-icon left>
                        mdi-check
                      </v-icon>
                      Rejeter
                    </v-btn>
                  </v-col>
                  
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </div>
    <v-btn
    :loading="loadingValidation"
      flat
      outlined
      color="green"
      v-on:click="valider()"
      v-if="($hasPermission(detailenquete.state) || ($hasRole('point_focal') && detailenquete.state=='INITIER_INVESTISSEMENT')) && $hasPermission('validation')"
    >
      <v-icon left>
        mdi-check
      </v-icon>
      {{$hasRole('point_focal')?'Envoyer':'Valider'}}
    </v-btn>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    mounted: function() {
      this.state=this.detailenquete.state
      this.status=this.detailenquete.status
    },
    computed: mapGetters({
      detailenquete: 'enquetes/detailenquete'
    }),
    data: () => ({
      state:'',
      status:'',
      loadingValidation: false,
      loadingRejet: false,
      message:null,
      color:null,
      valid: true,
      selectedItem: 0,
      valid: true,
      model: {
        motif:''
      },
      rules:{
        nameRules: [
          v => !!v || 'Libelle est obligatoire',
          v => (v && v.length <= 50) || 'Prénom doit etre inférieur à 20 caratères',
        ],
        descriptionRules: [
          v => !!v || 'Description est obligatoire'
        ],
      },
    }),
    methods: {
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
        this.$router.push('/enquetes');
      },
      modifier(){ 
        this.$router.push('/enquetes/modifier/'+this.detailenquete.id);      
      },

      valider () {
        this.loadingValidation = true;
        console.log('Donées formulaire ++++++ : ',{id:this.detailenquete.id})
        
        this.$msasApi.post('/validation_enquete', {id:this.detailenquete.id})
          .then((res) => {  
            this.state = res.data.data.state  
            this.status = res.data.data.status  
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Validation réussie !'})
            this.$router.push('/enquetes');
            
          })
          .catch((error) => {
               console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loadingValidation = false;
            console.log('Requette envoyé ')
        });
      },
      rejeter () {
        this.loadingRejet = true;
        console.log('Donées formulaire ++++++ : ',{id:this.detailenquete.id})
        
        this.$msasApi.post('/rejet_enquete', {id:this.detailenquete.id,motif_rejet:this.model.motif})
          .then((res) => {  
            this.state = res.data.data.state  
            this.status = res.data.data.status 
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Investissement rejeté avec succés!'})
            this.$router.push('/enquetes');
            
          })
          .catch((error) => {
               console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loadingRejet = false;
            console.log('Requette envoyé ')
        });
      },
      reinitialiser(){  
        alert('Réinitialiser mot de passe')     
      },
    },
  }
</script>