<template>
  <v-card class="">                   
    <v-card-text>
      <v-row>
        <v-col md="3" sm="12" lg="3" text-md-center>
          <!-- <img src="@/static/avatar/beneficiaire.png" class="beneficiaire-profil" alt="Espace Senegal Service"> -->
          <div class="headline">
            <v-avatar v-if="detailBeneficiaire.avatar" tile style="border: solid 2px #d8d8d8;" size="150px">
              <img :src="detailBeneficiaire.avatar" alt="Avatar"/>
            </v-avatar>
            <v-avatar size="100px" v-else>
              <img src="@/static/avatar/default-user.png" alt="Cheikh Gueye"/>
            </v-avatar>
          </div>
        </v-col>
        <v-col md="9" sm="12" lg="9" text-md-left>
          <div class="row">
            <div class="col-md-6 border-left">
                <p class="info-profil mb-4"><span>Prénom: </span>{{detailBeneficiaire.prenom_beneficiaire}}</p>
                <p class="info-profil mb-4"><span>Nom: </span>{{detailBeneficiaire.nom_beneficiaire}}</p> 
                <p class="info-profil mb-4"><span>Adresse: </span>{{detailBeneficiaire.adresse_beneficiaire}}</p> 
                
              </div>
              <div class="col-md-6 border-left">              
                <p class="info-profil mb-4"><span>Téléphone : </span>{{detailBeneficiaire.telephone_beneficiaire}}</p>
                <p class="info-profil mb-4"><span>Région : </span>
                  <v-chip
                    color="primary"
                    small
                    outlined
                    class="my-1 mr-1"
                    v-for="region in detailBeneficiaire.region"  :key="region.id"
                  >
                    {{ region.nom_region }}
                  </v-chip>
                </p>
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
      detailBeneficiaire: 'beneficiaires/detailbeneficiaire'
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
          this.$router.push('/beneficiaires');
      },
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/beneficiaires/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('beneficiaires/getDetail',response.data)
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
