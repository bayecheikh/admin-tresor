<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="9" sm="12" lg="9" text-md-left>
          <div class="row">
              <div class="col-md-4">
                  <!--<p class="info-profil mb-4"><span>Prénom: </span>{{detailUtilisateur.firstname}}</p>
                  <p class="info-profil mb-4"><span>Nom: </span>{{detailUtilisateur.lastname}}</p>-->
                  <p class="info-profil mb-4"><span>Référence projet: </span>{{detailProjet.reference_projet}}</p>            
                  <p class="info-profil mb-4"><span>Titre : </span>{{detailProjet.titre_projet}}</p>
              </div>
              <div class="col-md-4">
                  <!--<p class="info-profil mb-4"><span>Prénom: </span>{{detailUtilisateur.firstname}}</p>
                  <p class="info-profil mb-4"><span>Nom: </span>{{detailUtilisateur.lastname}}</p>-->
                  <p class="info-profil mb-4"><span>Prénom bénéficiaire: </span>{{detailProjet.beneficiaire && detailProjet.beneficiaire[0].prenom_beneficiaire}}</p>            
                  <p class="info-profil mb-4"><span>Nom Bénéficiaire : </span>{{detailProjet.beneficiaire && detailProjet.beneficiaire[0].nom_beneficiaire}}</p>
              </div>
              <div class="col-md-4">
                  <!--<p class="info-profil mb-4"><span>Prénom: </span>{{detailUtilisateur.firstname}}</p>
                  <p class="info-profil mb-4"><span>Nom: </span>{{detailUtilisateur.lastname}}</p>-->
                  <p class="info-profil mb-4"><span>Téléphone bénéficiaire: </span>{{detailProjet.beneficiaire && detailProjet.beneficiaire[0].telephone_beneficiaire}}</p>            
                  <p class="info-profil mb-4"><span>Adresse bénéficiaire : </span>{{detailProjet.beneficiaire && detailProjet.beneficiaire[0].adresse_beneficiaire}}</p>
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
      detailProjet: 'projets/detailprojet'
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
          this.$router.push('/projets');
      },
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/projets/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('projets/getDetail',response.data)
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
