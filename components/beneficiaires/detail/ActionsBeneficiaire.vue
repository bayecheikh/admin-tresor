<template>
  <v-row
    align="center"
    justify="space-around"
  >
    <v-btn
      flat
      outlined
      rounded
      color="primary"
      v-on:click="retour()"
    >
      <v-icon left>
        mdi-arrow-left
      </v-icon>
      Retour à la liste
    </v-btn>
    <v-btn
      flat
      rounded
      outlined
      v-on:click="modifier()"
    >
      <v-icon left>
        mdi-pencil
      </v-icon>
      Modifier les infos
    </v-btn>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    mounted: function() {
      this.model.email = this.detailUtilisateur.email
    },
    computed: mapGetters({
      detailUtilisateur: 'beneficiaires/detailbeneficiaire'
    }),
    data: () => ({
      loading:false,
      dialog: false,
      model: {
        email: '',
        password: '',
        password_confirmation: '',
      },
      rules:{
        passwordRules: [
          v => !!v || 'Mot de passe est obligatoire',
          v => (v && v.length >= 8) || 'Mot de passe doit etre superieur ou égal à 8 caracteres',
        ],
        emailRules: [
          v => !!v || 'E-mail est obligatoire',
          v => /.+@.+\..+/.test(v) || 'E-mail mdoit etre valide',
        ]
      },
    }),
    methods: {
     submitForm () {
        let validation = this.$refs.form.validate()
        console.log('Donées formulaire++++++: ',{...this.model,token:this.tokenTemporaire})

        this.loading = true;
        
        validation && this.$msasApi.post('/update_password', {...this.model})
          .then((res) => {    
            this.message = res.data.message
            this.color = 'success'
            console.log('Donées reçus ++++++: ',res.data)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error.response.data.message)
              this.message = error.response?.data?.message || 'Echec de la connection'
              this.color='red'
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
            this.dialog = false
        }); 
      },
      retour(){       
        this.$router.push('/beneficiaires');
      },
      modifier(){ 
        this.$router.push('/beneficiaires/modifier/'+this.detailUtilisateur.id);      
      },
      reinitialiser(){  
        this.dialog = true    
      },
    },
  }
</script>