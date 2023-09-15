<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <table-traitement></table-traitement>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import TableTraitement from '@/components/investissements/TableTraitement'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-investissements')){
        return redirect('/')
      }
    },
    components: {
      PageHeader,
      TableTraitement
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList')
      this.$store.dispatch('investissements/getList')
      this.$store.dispatch('fournisseurs/getList') */
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Traitement de données',
            disabled: true,
            to: '/investissements',
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
