<template>
  <v-card class="custom-card-user border-grey">                   
    <v-tabs horizontal class="bg-grey">
      <v-tab class="text-left">
        Transactions
      </v-tab>
      <v-tab-item>
        <table-transaction :tab="'tout'"></table-transaction>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import TableTransaction from '@/components/beneficiaires/detail/TableTransaction'
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
      TableTransaction,
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