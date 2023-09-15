<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="9" sm="12" lg="9" text-md-left>
          <div class="row">
              <div class="col-md-6 border-left">
                  <!--<p class="info-profil mb-4"><span>Prénom: </span>{{detailSectoriel.firstname}}</p>
                  <p class="info-profil mb-4"><span>Nom: </span>{{detailSectoriel.lastname}}</p>-->
                  <p class="info-profil mb-4"><span>Prénom et Nom: </span>{{detailSectoriel.name}}</p>
                  
                  <p class="info-profil mb-4"><span>Email : </span>{{detailSectoriel.email}}</p>
                  <p class="info-profil mb-4"><span>Roles : </span>
                    <v-chip
                      color="primary"
                      small
                      outlined
                      class="my-1 mr-1"
                      v-for="role in detailSectoriel.roles"  :key="role.id"
                    >
                      {{ role.description }}
                    </v-chip>
                  </p>
              </div>
              <div class="col-md-6 border-left">
                  <p class="info-profil mb-4" v-if="detailSectoriel.fonction"><span>Profession :
                      </span>{{ detailSectoriel.fonction}}
                  </p>
                  <p class="info-profil mb-4" v-if="detailSectoriel.structures && detailSectoriel.structures.length"><span>Structure: </span>{{ detailSectoriel.structures[0] && detailSectoriel.structures[0].nom_structure}}</p>  
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
      detailSectoriel: 'utilisateurs/detailutilisateur'
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
          this.$router.push('/utilisateurs');
      },
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/resultat_attendus/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('utilisateurs/getDetail',response.data)
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
