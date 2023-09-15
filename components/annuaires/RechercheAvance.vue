<template>
  <div class="mx-auto mb-5 pl-4 pt-6 pr-4 pb-0">
    <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
        <v-dialog v-model="dialog" width="500">
            
            <v-card>
              <v-card-title class=""> {{ listannuaires.length }} contact(s) selectionn(és)</v-card-title>
              <v-card-text>
                <v-col md="12" lg="12" sm="12">
                    Confirmez-vous cette opération ?
                </v-col>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary darken-1"
                  text
                  @click="dialog = false"
                  outlined
                >
                  Annuler
                </v-btn>
                <v-btn :loading="loadingSms" color="green" text @click="sendSMS" outlined>
                  payer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> 
        <v-row class="d-flex justify-content-between">
          <v-col md="9" lg="9" sm="12" class="py-4 my-0 d-flex">
              <template>
                <v-file-input
                  accept=".xlsx"
                  label="Importer des bénéficiaires (excel)"
                  outlined
                  v-model="selectXlsx"
                  show-size
                  @change="uploadXlsx"
                >
                </v-file-input>
              </template>
          </v-col>
          <v-col md="3" lg="3" sm="12">
            <v-btn large color="primary" depressed  @click="dialog=true">
              <v-icon>mdi-cellphone-message</v-icon> Payer
            </v-btn>
          </v-col> 
                  
        </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import * as XLSX from 'xlsx'
  export default {
    components: {
      
    },
    mounted: function() {
      
    },
    computed: {
      ...mapGetters({
        listregions: 'regions/listregions', 
        listannuaires: 'annuaires/listannuaires',  
        headers: 'annuaires/headerannuaires' 
      })
    },
    data: () => ({
      dialog:false,
      loadingSms:false,
      selectXlsx: null,
      model:{
        excelFile:""
      },
      rules:{
        numero_cedeaoRules: [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && v >= 0 ) return true;
            return 'Veuillez saisir un chiffre valide';
          },
        ],
        numberRules: [
          v  => {
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && v >= 0 ) return true;
            return 'Veuillez saisir un chiffre valide';
          },
        ],
        nationalityRules: [
          v => !!v || 'Nationalité est obligatoire',
          v => (v && v.length <= 50) || 'Nationalité doit etre inférieur à 15 caratères',
        ]
      }
    }),
    methods: {
      async getTypeMilitant(){
        this.$msasApi.$get('type_militants')
        .then(async (response) => { 
          console.log('Données type militant reçu+++++++++++',response)
          this.listtype_militants=response.data
          }).catch((error) => {
              console.log('Code error ++++++: ', error?.response?.data?.message)
          }).finally(() => {
          console.log('Requette envoyé ')
        });
      },
      sendSMS () {
        if(this.listannuaires.length){
          alert("Envoi réussi")
          this.dialog = false;
          //this.loadingSms=true

          //this.model.numero_cedeao = this.modelCedeao.sexe+this.modelCedeao.codeRegion+this.modelCedeao.annee+this.modelCedeao.mois+this.modelCedeao.jour+this.modelCedeao.codeGenere+this.modelCedeao.codeControle
          console.log('FormData ++++++ : ',this.model.excelFile)

          /* let formData = new FormData();

          formData.append("prenom",this.model.prenom)
          formData.append("nom",this.model.nom)
          formData.append("telephone",this.model.telephone)
          formData.append("type_militant",this.model.type_militant)
          formData.append("region",this.model.region)
          formData.append("departement",this.model.departement)
          formData.append("commune",this.model.commune)
          formData.append("expediteur",this.expediteur)
          formData.append("message",this.message)

          this.$msasApi.post('/sendSms',formData)
            .then((response) => {
              console.log('Donées reçus ++++++: ',response.data.data)
            
              this.$store.dispatch('toast/getMessage',{type:'success',text:'Votre message a été envoyé avec succès'})
            })
            .catch((error) => {
                console.log('Code error ++++++: ', error)
                this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
            }).finally(() => {
              this.loadingSms = false
              this.dialog = false;
              console.log('Requette envoyé ')
          }); */
        }
        else{
          alert("Liste est vide")
        }
        
        
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
      uploadXlsx() {
          if (!this.selectXlsx) {
            console.log("Please upload a xlsx file")
            return;
          }
          if (this.selectXlsx) {
            const reader = new FileReader();
            reader.onload = (e) => {
              /* Parse data */
              const bstr = e.target.result;
              const wb = XLSX.read(bstr, { type: "binary" });
              /* Get first worksheet */
              const wsname = wb.SheetNames[0];
              const ws = wb.Sheets[wsname];
              /* Convert array of arrays */
              const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

              let headerannuaires = [
                { text: data[0][0], value: 'prenom',sortable: true },
                { text: data[0][1], value: 'nom',sortable: true },
                { text: data[0][2], value: 'cni',sortable: true },              
                { text: data[0][3], value: 'telephone',sortable: true},
                { text: data[0][4], value: 'mode_paiement',sortable: true },
                { text: data[0][5], value: 'montant_paiement',sortable: true}
              ]
              this.$store.commit('annuaires/initheader',headerannuaires)
              
              let list = []
              for(let i=1;i<data.length;i++){
                list.push({"prenom":data[i][0],"nom":data[i][1],"cni":data[i][2],"telephone":data[i][3],"mode_paiement":data[i][4],"montant_paiement":data[i][5]})
                console.log(list);
              }

              this.$store.commit('annuaires/initlist',list)
              this.model.excelFile = data 
              console.log(data);
            };

            reader.readAsBinaryString(this.selectXlsx);
          }
          this.selectXlsx = null;
      },
    }
  }
</script>
<style>
#custom-input .v-text-field__slot{
  border-right: solid 1px #e3ebf3;
  margin-right: 7px;
  border-left: solid 1px #e3ebf3;
  padding-left: 25px;
  margin-left: 7px;
}
#custom-input-2 .v-text-field__slot{
  border-right: solid 1px #e3ebf3;
  margin-right: 7px;

  padding-left: 25px;
  margin-left: 7px;
}
.custom-ligne-bloc {
  border: solid 2px #e3ebf3;
  margin: 12px;
  padding: 34px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
.custom-ligne-bloc-2 {
  border: solid 2px #e3ebf3;
  margin: 12px;
  padding: 0px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding-top: 0px;
  margin-bottom: 8px;
  min-width: 300px;
}
</style>
