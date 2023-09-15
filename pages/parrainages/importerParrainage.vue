<template>
  <div>
 <!--  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div>  -->
  <div class="custom-container mt-5">
    <v-card class="container" flat>  
      <form-import-parrainage></form-import-parrainage>
    </v-card>
  </div> 
 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import TableParrainage from '@/components/parrainages/TableParrainage'
import FormImportParrainage from '@/components/parrainages/FormImportParrainage'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('importer-parrainages')){
       return redirect('/')
      }
    },
    components: {
      PageHeader,
      TableParrainage,
      FormImportParrainage
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Liste des parrainages',
            disabled: false,
            to: '/parrainages',
            exact: true
          },{
            text: 'Ajouter des parrainages',
            disabled: true,
            to: '/parrainages',
            exact: true
          }
        ]
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
