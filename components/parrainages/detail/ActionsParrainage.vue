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
     // this.model.email = this.detailparrainage.email
    },
    computed: mapGetters({
      detailparrainage: 'parrainages/detailparrainage'
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

      retour(){       
        this.$router.push('/parrainages');
      },
      modifier(){ 
        this.$router.push('/parrainages/modifier/'+this.detailparrainage.id);      
      },
      reinitialiser(){  
        this.dialog = true    
      },
    },
  }
</script>