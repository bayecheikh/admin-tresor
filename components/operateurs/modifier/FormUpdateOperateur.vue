<template>
  <div>
    <v-form class="text-sm-left" v-model="valid" ref="form">
      <v-row>
        <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Libellé"
            outlined dense
            v-model="model.libelle"
            :rules="rules.libelleRules"
          ></v-text-field>
        </v-col>
        <!-- <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Slug"
            outlined dense
            v-model="model.slug"
            :rules="rules.slugRules"
          ></v-text-field>
        </v-col> -->
      </v-row>
      <v-btn
      :loading="loading"
        :disabled="!valid"
        depressed
        class="mr-4 text-white" color="primary"
        @click="submitForm"
      >
        Enregistrer
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
  export default {
    mounted(){
      this.getDetail(this.$nuxt._route.params.id)
    },
    components: {
      Notification
    },
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      selectedItem: 0,
      valid: true,
      model: {
        libelle: '',
      },
      rules:{
        libelleRules: [
          v => !!v || 'Le libellé est obligatoire',
          v => (v && v.length <= 50) || 'Le libellé ne peut pas dépasser 50 caractères',
        ],
        slugRules: [
          v => !!v || 'Le slug est obligatoire'
        ],
      },
    }),
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/operateurs/'+id)
        .then(async (response) => {
            console.log('Détail opérateur ++++++++++',response.data)
            this.$store.dispatch('operateurs/getDetail',response.data)
            this.model.libelle = response.data.libelle
           

        }).catch((error) => {
            this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
            this.progress=false
        });
      },
      submitForm () {
        this.loading = true;
        let validation = this.$refs.form.validate()
        console.log('Données formulaire ++++++ : ',{...this.model})
        
        
        validation && this.$msasApi.put('/operateurs/'+this.$nuxt._route.params.id, {...this.model})
          .then((res) => {    
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Ajout réussi'})
            this.$router.push('/operateurs');
            
          })
          .catch((error) => {
               console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
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