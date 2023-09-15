<template>

<div>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="12" sm="12" lg="12" text-md-left>
          <div class="row">
              <div class="col-md-4 my-0 py-0" v-if="detailanalyserisque.reference_projet">
                  <p class="info-profil"><span>Ref projet: </span>{{detailanalyserisque.reference_projet}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailanalyserisque.date_enquette">
                  <p class="info-profil"><span>Date : </span>{{detailanalyserisque.date_enquette}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailanalyserisque.titre_projet">
                  <p class="info-profil"><span>Titre projet : </span>{{detailanalyserisque.titre_projet}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailanalyserisque.monnaie && detailanalyserisque.prenom_beneficiaire">
                  <p class="info-profil"><span>Prénom Bénéficiaire : </span>{{detailanalyserisque.prenom_beneficiaire}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailanalyserisque.nom_beneficiaire">
                  <p class="info-profil"><span>Nom Bénéficiaire : </span>{{detailanalyserisque.nom_beneficiaire}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailanalyserisque.telephone_beneficiaire">
                  <p class="info-profil"><span>Téléphone : </span>{{detailanalyserisque.telephone_beneficiaire}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailanalyserisque.adresse_beneficiaire">
                  <p class="info-profil"><span>Adresse : </span>{{detailanalyserisque.adresse_beneficiaire}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailanalyserisque.region">
                  <p class="info-profil"><span>Région : </span>{{detailanalyserisque.region}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailanalyserisque.departement">
                  <p class="info-profil"><span>Departement: </span>{{detailanalyserisque.departement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailanalyserisque.commune">
                  <p class="info-profil"><span>Commune : </span>{{detailanalyserisque.commune}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailanalyserisque.status">
                  <p class="info-profil"><span>Status: </span>
                    <v-chip
                      :color="(detailanalyserisque.status=='a_valider' && 'primary') || (detailanalyserisque.status=='rejete' && 'error') || (detailanalyserisque.status=='brouillon' && 'orange') || (detailanalyserisque.status=='publie' && 'green')"
                      small
                      outlined
                      class="my-1 mr-1"
                    >
                      {{ (detailanalyserisque.status=='a_valider' && 'A valider') || (detailanalyserisque.status=='rejete' && 'Rejeté') || (detailanalyserisque.status=='brouillon' && 'Brouillon') || (detailanalyserisque.status=='publie' && 'Publié')}}
                    </v-chip>
                  </p>
                  <p class="info-profil" v-if="detailanalyserisque.status=='rejete'"><span>Motif du rejet : </span>{{detailanalyserisque.motif_rejet}}</p>
              </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <template>
  <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
    <v-stepper
      v-model="step"
      vertical
    >
  
      <!-- Step:2 Section -->
      <v-stepper-step
        :complete="step > 2"
        step="2"
        editable
      >
        Questionnaire
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
          <v-row>
            <v-col md="12" lg="12" sm="12">
              <v-form v-model="valid">
                <v-jsf v-model="model" :schema="schema"/>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
        <v-btn
          color="primary"
           @click="step = 3"
        >
          Suivant
        </v-btn>
        <v-btn text>
          Annuler
        </v-btn>
      </v-stepper-content>
      
      <!-- Step:3 Section -->
      <v-stepper-step
        :complete="step > 3"
        step="3"
        editable
      >
        Expert E&S
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
          <v-row>
            <v-col md="12" lg="12" sm="12">
              <v-form v-model="valid2">
                <v-jsf v-model="model2" :schema="schema2"/>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
        <v-btn
          color="primary"
          @click="submitForm"
        >
          Soumettre
        </v-btn>
        <v-btn text>
          Annuler
        </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-form>
</template>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    mounted: function() {
      this.getDetail(this.id)
      //this.schema = JSON.parse(this.detailanalyserisque?.questionnaire)
      
      //this.schema2 = JSON.parse(this.detailanalyserisque.questionnaire)[1]?JSON.parse(this.detailanalyserisque.questionnaire)[1]:null
    },
    computed: mapGetters({
      detailanalyserisque: 'analyserisques/detailanalyserisque'
    }),
    data () {
      return {
        id : this.$nuxt._route.params.id,
        schema: '',
        schema2: '',
        step: 1,
  
        filename : '',
        loading: false,

        valid: true,
        valid2: true,
      }
    },
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/analyserisques/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('analyserisques/getDetail',response.data)
            this.schema = JSON.parse(response.data?.questionnaire)[0]
            this.schema2 = JSON.parse(response.data?.questionnaire)[1]
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationanalyserisque)
      },
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/analyserisques');
      },
    },
  }
</script>
