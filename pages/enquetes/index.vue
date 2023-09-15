<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <table-enquete></table-enquete>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import TableEnquete from '@/components/enquetes/TableEnquete'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-enquetes')){
        return redirect('/')
      }
    },
    components: {
      PageHeader,
      TableEnquete
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList')
      this.$store.dispatch('enquetes/getList')
      this.$store.dispatch('fournisseurs/getList') */
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Liste des enquetes',
            disabled: true,
            to: '/enquetes',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>
</style>
