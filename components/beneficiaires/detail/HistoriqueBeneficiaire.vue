<template>
  <v-card class="custom-card-user border-grey">                   
    <v-tabs horizontal class="bg-grey">
      <v-tab class="text-left">
        Projets
      </v-tab>
      <v-tab-item>
        <table-projet :tab="'tout'"></table-projet>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import TableProjet from '@/components/beneficiaires/detail/TableProjet'
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
      TableProjet,
    },
    computed: mapGetters({
      detailBeneficiaire: 'beneficiaires/detailbeneficiaire',
    }),
    data: () => ({

    }),
    methods: {
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/beneficiaires');
      },
    },
  }
</script>
<style scoped>
.text-left{
  justify-content: left !important;
}
.bg-grey .v-item-group{
  background-color: #f5f5f5 !important;
}
</style>