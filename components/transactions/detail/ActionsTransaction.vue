<template>
  <v-row
    align="center"
    justify="space-around"
  >
    <!-- <v-btn
      text
      color="primary"
      v-on:click="retour()"
    >
      <v-icon left>
        mdi-arrow-left
      </v-icon>
      Retour à la liste
    </v-btn> -->
    <!-- <v-btn
      flat
      outlined
      v-on:click="modifier()"
      v-if="detailtransaction.status=='brouillon' || detailtransaction.status=='rejete'"
    >
      <v-icon left>
        mdi-pencil
      </v-icon>
      Modifier
    </v-btn>  -->
    <div>
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
                  v-if="(detailtransaction.status=='soumis') && $hasPermission(detailtransaction.state)"
                >
                <v-icon left>
                  mdi-arrow-left
                </v-icon>
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
      v-if="(detailtransaction.status=='soumis' || detailtransaction.status=='brouillon' || detailtransaction.status=='rejete') && $hasPermission(detailtransaction.state)"
    >
      <v-icon left>
        mdi-check
      </v-icon>
      {{'Valider'}}
    </v-btn>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    mounted: function() {
      this.state=this.detailtransaction.state
      this.status=this.detailtransaction.status
    },
    computed: mapGetters({
      detailtransaction: 'transactions/detailtransaction'
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
        this.$router.push('/transactions');
      },
      modifier(){ 
        this.$router.push('/transactions/modifier/'+this.detailtransaction.id);      
      },

      valider () {
        this.loadingValidation = true;
        console.log('Données formulaire ++++++ : ',{id:this.detailtransaction.id})
        
        this.$msasApi.post('/validation_transaction', {id:this.detailtransaction.id})
          .then((res) => {  
            this.state = res.data.data.state  
            this.status = res.data.data.status  
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Validation réussie !'})
            this.$router.push('/transactions');
            
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
        console.log('Données formulaire ++++++ : ',{id:this.detailtransaction.id})
        
        this.$msasApi.post('/rejet_transaction', {id:this.detailtransaction.id,motif_rejet:this.model.motif})
          .then((res) => {  
            this.state = res.data.data.state  
            this.status = res.data.data.status 
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'transaction rejeté avec succés!'})
            this.$router.push('/transactions');
            
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