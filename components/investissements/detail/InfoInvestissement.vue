<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="12" sm="12" lg="12" text-md-left>
          <div class="row">
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.annee && detailinvestissement.annee[0]">
                  <p class="info-profil"><span>Année : </span>{{detailinvestissement.annee[0].libelle}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.structure && detailinvestissement.structure[0]">
                  <p class="info-profil"><span>Structure : </span>{{detailinvestissement.structure[0].nom_structure}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.region && detailinvestissement.region[0]">
                  <p class="info-profil"><span>Région : </span>{{detailinvestissement.region[0].nom_region}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.monnaie && detailinvestissement.monnaie[0]">
                  <p class="info-profil"><span>Monnaie : </span>{{detailinvestissement.monnaie[0].libelle}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.dimension && detailinvestissement.dimension[0]">
                  <p class="info-profil"><span>Dimension : </span>{{detailinvestissement.dimension[0].libelle_dimension}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.numero_agrement">
                  <p class="info-profil"><span>Numéro autorisation : </span>{{detailinvestissement.numero_agrement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.telephone_investissement">
                  <p class="info-profil"><span>Téléphone : </span>{{detailinvestissement.telephone_investissement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.email_investissement">
                  <p class="info-profil"><span>Email : </span>{{detailinvestissement.email_investissement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.type_zone_interventions && detailinvestissement.type_zone_interventions[0]">
                  <p class="info-profil"><span>Zone d'intervention : </span>{{detailinvestissement.type_zone_interventions[0].libelle_zone}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.sourc && detailinvestissement.source[0]">
                  <p class="info-profil"><span>Source de financement : </span>{{detailinvestissement.source[0].libelle_source}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.status">
                  <p class="info-profil"><span>Status: </span>
                    <v-chip
                      :color="(detailinvestissement.status=='a_valider' && 'primary') || (detailinvestissement.status=='rejete' && 'error') || (detailinvestissement.status=='brouillon' && 'orange') || (detailinvestissement.status=='publie' && 'green')"
                      small
                      outlined
                      class="my-1 mr-1"
                    >
                      {{ (detailinvestissement.status=='a_valider' && 'A valider') || (detailinvestissement.status=='rejete' && 'Rejeté') || (detailinvestissement.status=='brouillon' && 'Brouillon') || (detailinvestissement.status=='publie' && 'Publié')}}
                    </v-chip>
                  </p>
                  <p class="info-profil" v-if="detailinvestissement.status=='rejete'"><span>Motif du rejet : </span>{{detailinvestissement.motif_rejet}}</p>
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
      detailinvestissement: 'investissements/detailinvestissement'
    }),
    data () {
      return {
        id : this.$nuxt._route.params.id,
      }
    },
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/investissements/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('investissements/getDetail',response.data)
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationinvestissement)
      },
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/investissements');
      },
    },
  }
</script>
