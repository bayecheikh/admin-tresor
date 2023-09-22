<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      
          <div class="row">
              <div class="col-md-4">
                  <!--<p class="info-profil mb-4"><span>Prénom: </span>{{detailUtilisateur.firstname}}</p>
                  <p class="info-profil mb-4"><span>Nom: </span>{{detailUtilisateur.lastname}}</p>-->
                  <p class="info-profil mb-4"><span>Référence transaction: </span>{{detailtransaction.reference_transaction}}</p>            
                  <p class="info-profil mb-4"><span>Bénéficiaire : </span>{{detailtransaction.beneficiaire && detailtransaction.beneficiaire[0].prenom_beneficiaire +' '+detailtransaction.beneficiaire[0].nom_beneficiaire  }} </p>
                  <p class="info-profil mb-4"><span>CNI bénéficiaire : </span>{{detailtransaction.beneficiaire && detailtransaction.beneficiaire[0].numero_cin}}</p>
              </div>
              <div class="col-md-4">
                <p class="info-profil mb-4"><span>Téléphone bénéficiaire : </span>{{detailtransaction.beneficiaire && detailtransaction.beneficiaire[0].telephone_beneficiaire}}</p>            
                <p class="info-profil mb-4"><span>Libellé Paiement : </span>{{detailtransaction && detailtransaction.libelle_paiement}}</p>            
                  <p class="info-profil mb-4"><span>Opérateur de paiement : </span>{{detailtransaction && detailtransaction.libelle_operateur}}</p>
              </div>
              <div class="col-md-4">
                  <!--<p class="info-profil mb-4"><span>Prénom: </span>{{detailUtilisateur.firstname}}</p>
                  <p class="info-profil mb-4"><span>Nom: </span>{{detailUtilisateur.lastname}}</p>-->
                  <p class="info-profil mb-4"><span>Montant : </span>{{detailtransaction && detailtransaction.montant}}</p>            
                  <p class="info-profil mb-4"><span>Commentaire : </span>{{detailtransaction && detailtransaction.commentaire}}</p>
                  <p class="info-profil"><span>Status: </span>
                    <v-chip
                      :color="$getColore(detailtransaction.status)"
                      small
                      outlined
                      class="my-1 mr-1"
                    >
                      {{ $getNameBySlug(detailtransaction.status) }}
                    </v-chip>
                  </p>
                 
              </div>
              <div class="col-md-12 my-0 py-0">
                  <p class="info-profil" v-if="detailtransaction.status=='rejete'"><span>Motif du rejet : </span>{{detailtransaction.motif_rejet}}</p>
              </div>
            
          </div>
  
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
      detailtransaction: 'transactions/detailtransaction'
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
