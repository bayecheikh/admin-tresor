A<template>
  <div>
 <!--  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div>  -->
  <div class="custom-container mt-5">
    <v-card class="container" flat>  
      <form-add-annuaire></form-add-annuaire>
    </v-card>
  </div> 
 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import TableAnnuaire from '@/components/annuaires/TableAnnuaire'
import FormAddAnnuaire from '@/components/annuaires/FormAddAnnuaire'
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
      FormAddAnnuaire
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Annuaire',
            disabled: false,
            to: '/annuaires',
            exact: true
          },{
            text: 'Ajouter des contacts',
            disabled: true,
            to: '/annuaires',
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
