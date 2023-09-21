<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="9" sm="12" lg="9" text-md-left>
          <div class="row">
              <div class="col-md-4">
                  <!--<p class="info-profil mb-4"><span>Prénom: </span>{{detailUtilisateur.firstname}}</p>
                  <p class="info-profil mb-4"><span>Nom: </span>{{detailUtilisateur.lastname}}</p>-->
                  <p class="info-profil mb-4"><span>Référence transaction: </span>{{detailTransaction.reference_transaction}}</p>            
                  <p class="info-profil mb-4"><span>Bénéficiaire : </span>{{detailTransaction.beneficiaire && detailTransaction.beneficiaire[0].prenom_beneficiaire +' '+detailTransaction.beneficiaire[0].nom_beneficiaire  }} </p>
                  <p class="info-profil mb-4"><span>CNI bénéficiaire : </span>{{detailTransaction.beneficiaire && detailTransaction.beneficiaire[0].numero_cin}}</p>
              </div>
              <div class="col-md-4">
                <p class="info-profil mb-4"><span>Téléphone bénéficiaire : </span>{{detailTransaction.beneficiaire && detailTransaction.beneficiaire[0].telephone_beneficiaire}}</p>            
                <p class="info-profil mb-4"><span>Libellé Paiement : </span>{{detailTransaction && detailTransaction.libelle_paiement}}</p>            
                  <p class="info-profil mb-4"><span>Opérateur de paiement : </span>{{detailTransaction && detailTransaction.libelle_operateur}}</p>
              </div>
              <div class="col-md-4">
                  <!--<p class="info-profil mb-4"><span>Prénom: </span>{{detailUtilisateur.firstname}}</p>
                  <p class="info-profil mb-4"><span>Nom: </span>{{detailUtilisateur.lastname}}</p>-->
                  <p class="info-profil mb-4"><span>Montant : </span>{{detailTransaction && detailTransaction.montant}}</p>            
                  <p class="info-profil mb-4"><span>Commentaire : </span>{{detailTransaction && detailTransaction.commentaire}}</p>
                 
              </div>
              <div class="col-md-4">
                
                </div>
            
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    mounted: function() {
      this.getDetail(this.id)
    },
    computed: mapGetters({
      detailTransaction: 'transactions/detailtransaction'
    }),
    data () {
      return {
        id : this.$nuxt._route.params.id,
      }
    },
    methods: {
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/transactions');
      },
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/transactions/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('transactions/getDetail',response.data)
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationstructure)
      },
    },
  }
</script>
