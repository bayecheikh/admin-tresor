<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="12" sm="12" lg="12" text-md-left>
          <div class="row">
              <div class="col-md-4 my-0 py-0" v-if="detailenquete.annee && detailenquete.annee[0]">
                  <p class="info-profil"><span>Année : </span>{{detailenquete.annee[0].libelle}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailenquete.structure && detailenquete.structure[0]">
                  <p class="info-profil"><span>Structure : </span>{{detailenquete.structure[0].nom_structure}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailenquete.region && detailenquete.region[0]">
                  <p class="info-profil"><span>Région : </span>{{detailenquete.region[0].nom_region}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailenquete.monnaie && detailenquete.monnaie[0]">
                  <p class="info-profil"><span>Monnaie : </span>{{detailenquete.monnaie[0].libelle}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailenquete.dimension && detailenquete.dimension[0]">
                  <p class="info-profil"><span>Dimension : </span>{{detailenquete.dimension[0].libelle_dimension}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailenquete.numero_agrement">
                  <p class="info-profil"><span>Numéro autorisation : </span>{{detailenquete.numero_agrement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailenquete.telephone_enquete">
                  <p class="info-profil"><span>Téléphone : </span>{{detailenquete.telephone_enquete}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailenquete.email_enquete">
                  <p class="info-profil"><span>Email : </span>{{detailenquete.email_enquete}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailenquete.type_zone_interventions && detailenquete.type_zone_interventions[0]">
                  <p class="info-profil"><span>Zone d'intervention : </span>{{detailenquete.type_zone_interventions[0].libelle_zone}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailenquete.sourc && detailenquete.source[0]">
                  <p class="info-profil"><span>Source de financement : </span>{{detailenquete.source[0].libelle_source}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailenquete.status">
                  <p class="info-profil"><span>Status: </span>
                    <v-chip
                      :color="(detailenquete.status=='a_valider' && 'primary') || (detailenquete.status=='rejete' && 'error') || (detailenquete.status=='brouillon' && 'orange') || (detailenquete.status=='publie' && 'green')"
                      small
                      outlined
                      class="my-1 mr-1"
                    >
                      {{ (detailenquete.status=='a_valider' && 'A valider') || (detailenquete.status=='rejete' && 'Rejeté') || (detailenquete.status=='brouillon' && 'Brouillon') || (detailenquete.status=='publie' && 'Publié')}}
                    </v-chip>
                  </p>
                  <p class="info-profil" v-if="detailenquete.status=='rejete'"><span>Motif du rejet : </span>{{detailenquete.motif_rejet}}</p>
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
      detailenquete: 'enquetes/detailenquete'
    }),
    data () {
      return {
        id : this.$nuxt._route.params.id,
      }
    },
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/enquetes/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('enquetes/getDetail',response.data)
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationenquete)
      },
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/enquetes');
      },
    },
  }
</script>
