<template>
<div>
  <v-form class="text-sm-left" v-model="valid" ref="form">
    <v-row>
      <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Nom"
            outlined dense
            v-model="model.libelle"
            :rules="rules.libelleRules"
          ></v-text-field>
        </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col md="12" lg="12" sm="12" class="my-0 py-0">
        <template>
          <v-card-title class="pl-0 pr-0">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Rechercher un sous-secteur"
              outlined
              dense
              hide-details
              clearable
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="listsous_secteurs"
            :loading="listsous_secteurs.length?false:true" 
            loading-text="Loading... Please wait"
            :single-select="singleSelect"
            item-key="libelle"
            show-select
            class="elevation-1"
            :search="search"
          >
          </v-data-table>
        </template>
      </v-col>
    </v-row>

    <v-btn
      :loading="loading"
      :disabled="!valid"
      depressed
      class="mr-4 text-white mt-4" color="#1B73E8"
      @click="submitForm"
    >
      Enregistrer
    </v-btn>
  </v-form>
</div>
</template>

<script>
import Notification from '@/components/Notification'
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
      Notification
    },
    mounted: function() {
      this.model.id = this.detailsecteur.id
      this.model.libelle = this.detailsecteur.libelle
      this.model.slug = this.detailsecteur.slug
      this.model.latitude = this.detailsecteur.latitude
      this.model.longitude = this.detailsecteur.longitude
      this.model.svg = this.detailsecteur.svg
      this.selected = this.detailsecteur.sous_secteurs
    },
    computed: mapGetters({
      detailsecteur:'secteurs/detailsecteur',
      listsous_secteurs: 'sous_secteurs/listsous_secteurs',
    }),
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      search: '',
      selected: [],
      search:'',
      selectedItem: 0,
      headers : [
        {
            text: 'Nom',
            align: 'start',
            sortable: true,
            value: 'libelle',
        }
      ],
      valid: true,
      model: {
        id:null,
        name: '',
        description: ''
      },
      rules:{
        nameRules: [
          v => !!v || 'Prénom est obligatoire',
          v => (v && v.length <= 50) || 'Prénom doit etre inférieur à 20 caratères',
        ],
        descriptionRules: [
          v => !!v || 'Nom est obligatoire'
        ],
      },
    }),
    methods: {
      submitForm () {
        //this.loading = true;
        let validation = this.$refs.form.validate()
        let selectedsous_secteurs = this.selected.map((item)=>{return item.id})
        let id = this.model.id
        console.log('Donées formulaire ++++++ : ',{...this.model,sous_secteurs:selectedsous_secteurs})
        
        validation && this.$msasApi.put('/secteurs/'+id, {...this.model,sous_secteurs:selectedsous_secteurs})
          .then((res) => {    
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Modification réussie'})
            this.$router.push('/secteurs');
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé')
        });
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
    }
  }
</script>