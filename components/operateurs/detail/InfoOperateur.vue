<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="9" sm="12" lg="9" text-md-left>
          <div class="row">
            <div class="col-md-6 ">
                <p class="info-profil mb-4"><span>Libellé : </span>{{detailoperateur.libelle}}</p>
                <p class="info-profil mb-4"><span>Slug : </span>{{detailoperateur.slug}}</p> 
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
    computed: mapGetters({
      detailoperateur: 'operateurs/detailoperateur'
    }),
    data: () => ({

    }),
    methods: {
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/operateurs');
      },
    },
  }
</script>
<style scoped>
.border-left{
  border-left: solid 2px rgb(0 0 0 / 4%);;
}
</style>