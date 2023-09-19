<template>
  <div>
    <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="12" sm="12" lg="12" text-md-left>
          <div class="row">
              <div class="col-md-4 my-0 py-0" v-if="detailannuaire.prenom">
                  <p class="info-profil"><span>Prénom : </span>{{detailannuaire.prenom}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailannuaire.nom">
                  <p class="info-profil"><span>Nom : </span>{{detailannuaire.nom}}</p>
              </div> 
              <div class="col-md-4 my-0 py-0" v-if="detailannuaire.type_militant">
                  <p class="info-profil"><span>Type de membre : </span>{{detailannuaire.type_militant}}</p>
              </div> 
              
              <div class="col-md-4 my-0 py-0" v-if="detailannuaire.telephone">
                  <p class="info-profil"><span>Téléphone : </span>{{detailannuaire.telephone}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailannuaire.region">
                  <p class="info-profil"><span>Région : </span>{{detailannuaire.region}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailannuaire.departement">
                  <p class="info-profil"><span>Département : </span>{{detailannuaire.departement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailannuaire.commune">
                  <p class="info-profil"><span>Commune : </span>{{detailannuaire.commune}}</p>
              </div>
                  
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</div>
 
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    mounted: function() {

      this.getDetail(this.id)
    },
    computed: mapGetters({
      detailannuaire:'annuaires/detailannuaire'
    }),
    data () {
      return {
        id : this.$nuxt._route.params.id,
        apiUrl : process.env.baseUrl,
        LigneFinancementInputs:[],
      }
    },
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/annuaires/'+id)
        .then(async (response) => {
            this.$store.dispatch('annuaires/getDetail',response.data)
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationannuaire)
      },
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/annuaires');
      },
      findAnneeName (id) {
        return this.listannees.filter(item => item.id === parseInt(id))[0]
      },
      findMonnaieName (id) {
        return this.listmonnaies.filter(item => item.id === parseInt(id))[0]
      },
      findDimensionName (id) {
        return this.listdimensions.filter(item => item.id === parseInt(id))[0]
      },
      findStructureName (id) {
        return this.liststructures.filter(item => item.id === parseInt(id))[0]
      },
      findTypeStructureName (id) {
        return this.listsources.filter(item => item.id === parseInt(id))[0]
      },
      findRegionName (id) {
        return this.listregions.filter(item => item.id === parseInt(id))[0]
      },
      findPilierName (id) {
        return this.listpiliers.filter(item => item.id === parseInt(id))[0]
      },
      findAxeName (id_pilier,id_axe) {
        return this.listpiliers.filter(item => item.id === parseInt(id_pilier))[0]?.axes.filter(item => item.id === parseInt(id_axe))[0]
      },
    },
  }
</script>
