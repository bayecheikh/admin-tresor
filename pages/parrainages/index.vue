<template>
  <div>
    <!-- <div class="custom-container bg-title-grey">
        <page-header :items="headerItems" class=""></page-header>  
    </div>  -->
    <div class="custom-container mt-3 d-flex flex-row-reverse">
      <v-btn depressed class="mr-4 text-white" color="green" @click="GotoAddParrainage">
              Ajouter des parrainages
            </v-btn>     
    </div>
    <div class="custom-container mt-3">
      <v-card class="container" flat>  
        <recherche-avance></recherche-avance>
      </v-card>
    </div> 
    <div class="custom-container mt-0">
      <v-card class="container" flat>  
        <table-parrainage></table-parrainage>
      </v-card>
    </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import TableParrainage from '@/components/parrainages/TableParrainage'
import RechercheAvance from '@/components/parrainages/RechercheAvance'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parrainages')){
       return redirect('/')
      }
    },
    components: {
      PageHeader,
      TableParrainage,
      RechercheAvance
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Liste des parrainages',
            disabled: true,
            to: '/parrainages',
            exact: true
          }
        ]
      }
    },
    methods:{
      GotoAddParrainage() {
        this.$router.push('/parrainages/addParrainage');
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
