<template>

  <div>
    <v-card class="custom-card-user border-grey">                   
      <v-card-text>
        <v-row>
          <v-col md="12" sm="12" lg="12" text-md-left>
            <div class="row">
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.reference_projet">
                    <p class="info-profil"><span>Ref projet: </span>{{detailanalysegenre.reference_projet}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.date_enquette">
                    <p class="info-profil"><span>Date : </span>{{detailanalysegenre.date_enquette}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.titre_projet">
                    <p class="info-profil"><span>Titre projet : </span>{{detailanalysegenre.titre_projet}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.monnaie && detailanalysegenre.prenom_beneficiaire">
                    <p class="info-profil"><span>Prénom Bénéficiaire : </span>{{detailanalysegenre.prenom_beneficiaire}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.nom_beneficiaire">
                    <p class="info-profil"><span>Nom Bénéficiaire : </span>{{detailanalysegenre.nom_beneficiaire}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.telephone_beneficiaire">
                    <p class="info-profil"><span>Téléphone : </span>{{detailanalysegenre.telephone_beneficiaire}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.adresse_beneficiaire">
                    <p class="info-profil"><span>Adresse : </span>{{detailanalysegenre.adresse_beneficiaire}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.region">
                    <p class="info-profil"><span>Région : </span>{{detailanalysegenre.region}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.departement">
                    <p class="info-profil"><span>Departement: </span>{{detailanalysegenre.departement}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.commune">
                    <p class="info-profil"><span>Commune : </span>{{detailanalysegenre.commune}}</p>
                </div>
                <div class="col-md-4 my-0 py-0" v-if="detailanalysegenre.status">
                    <p class="info-profil"><span>Status: </span>
                      <v-chip
                        :color="(detailanalysegenre.status=='a_valider' && 'primary') || (detailanalysegenre.status=='rejete' && 'error') || (detailanalysegenre.status=='brouillon' && 'orange') || (detailanalysegenre.status=='publie' && 'green')"
                        small
                        outlined
                        class="my-1 mr-1"
                      >
                        {{ (detailanalysegenre.status=='a_valider' && 'A valider') || (detailanalysegenre.status=='rejete' && 'Rejeté') || (detailanalysegenre.status=='brouillon' && 'Brouillon') || (detailanalysegenre.status=='publie' && 'Publié')}}
                      </v-chip>
                    </p>
                    <p class="info-profil" v-if="detailanalysegenre.status=='rejete'"><span>Motif du rejet : </span>{{detailanalysegenre.motif_rejet}}</p>
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
        //this.schema = JSON.parse(this.detailanalysegenre?.questionnaire)
        
        //this.schema2 = JSON.parse(this.detailanalysegenre.questionnaire)[1]?JSON.parse(this.detailanalysegenre.questionnaire)[1]:null
      },
      computed: mapGetters({
        detailanalysegenre: 'analysegenres/detailanalysegenre'
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
            this.$msasApi.$get('/analysegenres/'+id)
          .then(async (response) => {
              console.log('Detail ++++++++++',response)
              this.$store.dispatch('analysegenres/getDetail',response.data)
              this.schema = JSON.parse(response.data?.questionnaire)[0]
              this.schema2 = JSON.parse(response.data?.questionnaire)[1]
          }).catch((error) => {
               this.$toast.error(error?.response?.data?.message).goAway(3000)
              console.log('Code error ++++++: ', error?.response?.data?.message)
          }).finally(() => {
              console.log('Requette envoyé ')
          });
          //console.log('total items++++++++++',this.paginationanalysegenre)
        },
        submitForm(){
          alert('Formulaire soumis')
        },
        retour(){       
            this.$router.push('/analysegenres');
        },
      },
    }
  </script>
  