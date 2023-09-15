<template>
  <div>
    <!-- <div class="custom-container bg-title-grey">
        <page-header :items="headerItems" class=""></page-header>  
    </div>  -->
    <div class="custom-container mt-3 d-flex flex-row-reverse">
          <v-btn depressed class="mr-0 text-white " color="green" @click="GotoAddannuaire">
            Ajouter des contacts
          </v-btn>     
    </div> 
    <div class="custom-container mt-3">
      <v-card class="container" flat>  
        <recherche-avance></recherche-avance>
      </v-card>
    </div> 
    
    <div class="custom-container mt-0">
      <v-card class="container" flat>  
        <table-annuaire></table-annuaire>
      </v-card>
    </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import TableAnnuaire from '@/components/annuaires/TableAnnuaire'
import RechercheAvance from '@/components/annuaires/RechercheAvance'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-annuaires')){
       return redirect('/')
      }
    },
    components: {
      PageHeader,
      TableAnnuaire,
      RechercheAvance
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Annuaire',
            disabled: true,
            to: '/annuaires',
            exact: true
          }
        ]
      }
    },
    methods:{
      GotoAddannuaire() {
        this.$router.push('/annuaires/addAnnuaire');
      }
    }
  }
</script>

<style scoped>
.bg-title {
  background-color: rgb(227, 235, 243) !important;
  color: #6F96AA;
}
</style>
