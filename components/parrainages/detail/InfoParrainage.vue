<template>
  <div>
    <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="12" sm="12" lg="12" text-md-left>
          <div class="row">
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.numero_cedeao">
                  <p class="info-profil"><span>Numéro CEDEAO : </span>{{detailparrainage.numero_cedeao}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.prenom">
                  <p class="info-profil"><span>Prénom : </span>{{detailparrainage.prenom}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.nom">
                  <p class="info-profil"><span>Nom : </span>{{detailparrainage.nom}}</p>
              </div> 
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.date_naissance">
                  <p class="info-profil"><span>Date de naissance : </span>{{detailparrainage.date_naissance}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.lieu_naissance">
                  <p class="info-profil"><span>Lieu de naissance : </span>{{detailparrainage.lieu_naissance}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.lieu_naissance">
                  <p class="info-profil"><span>Lieu de naissance : </span>{{detailparrainage.lieu_naissance}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.taille">
                  <p class="info-profil"><span>Taille : </span>{{detailparrainage.taille}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.sexe">
                  <p class="info-profil"><span>Sexe : </span>{{detailparrainage.sexe}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.numero_electeur">
                  <p class="info-profil"><span>Numéro d'electeur : </span>{{detailparrainage.numero_electeur}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.centre_vote">
                  <p class="info-profil"><span>Centre de vote : </span>{{detailparrainage.centre_vote}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.bureau_vote">
                  <p class="info-profil"><span>Bureau de vote : </span>{{detailparrainage.bureau_vote}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.numero_cin">
                  <p class="info-profil"><span>CIN : </span>{{detailparrainage.numero_cin}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.telephone">
                  <p class="info-profil"><span>Téléphone : </span>{{detailparrainage.telephone}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.region">
                  <p class="info-profil"><span>Région : </span>{{detailparrainage.region}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.departement">
                  <p class="info-profil"><span>Département : </span>{{detailparrainage.departement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.commune">
                  <p class="info-profil"><span>Commune : </span>{{detailparrainage.commune}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.prenom_responsable">
                  <p class="info-profil"><span>Prénom du responsable : </span>{{detailparrainage.prenom_responsable}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.nom_responsable">
                  <p class="info-profil"><span>Nom du responsable : </span>{{detailparrainage.nom_responsable}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailparrainage.telephone_responsable">
                  <p class="info-profil"><span>Téléphone du responsable : </span>{{detailparrainage.telephone_responsable}}</p>
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
      detailparrainage:'parrainages/detailparrainage'
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
          this.$msasApi.$get('/parrainages/'+id)
        .then(async (response) => {
            this.$store.dispatch('parrainages/getDetail',response.data)
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationparrainage)
      },
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/parrainages');
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
