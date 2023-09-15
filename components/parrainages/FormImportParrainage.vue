<template>
  <div>
    <v-form class="" ref="form" enctype="multipart/form-data">
      <v-card class="mx-auto mb-5 pl-7 pt-7 pr-7 pb-5">
        <div class="custom-ligne-bloc">               
            <v-row>
              <v-col md="12" lg="12" sm="12" class="py-4 my-0">
                <template>
                  <v-file-input
                    accept=".xlsx"
                    label="File input(xlsx)"
                    outlined
                    v-model="selectXlsx"
                    show-size
                    @change="uploadXlsx"
                  >
                  </v-file-input>
                </template>
              </v-col>
            </v-row>
            <v-btn depressed :loading="loading" class="mr-4" color="" @click="resetInfoElecteur">
            Annuler
          </v-btn>
          <v-btn :disabled="!valid" depressed :loading="loading" class="mr-4 text-white" color="primary" @click="submitForm">
            Importer
          </v-btn>
        </div>     
      </v-card>
      
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
      //this.getRegions()
      //this?.$refs?.prenom_responsable?.focus()
    },
    computed: {
      ...mapGetters({
      listregions: 'regions/listregions',    
      }),

    },
    data: () => ({
      valid: true,
      loading: false,
      selectXlsx: null,
      model:{
        excelFile:""
      }
    }),
    methods: {
      async verifyNumCedeao(){
        console.log("request verify-----------------")
        if(this.modelCedeao.sexe!='' &&
        this.modelCedeao.codeRegion!='' &&
        this.modelCedeao.annee!='' &&
        this.modelCedeao.mois!='' &&
        this.modelCedeao.jour!='' &&
        this.modelCedeao.codeGenere!='' &&
        this.modelCedeao.codeControle){
          let numero_cedeao = this.modelCedeao.sexe+this.modelCedeao.codeRegion+this.modelCedeao.annee+this.modelCedeao.mois+this.modelCedeao.jour+this.modelCedeao.codeGenere+this.modelCedeao.codeControle
          let formData = new FormData();
          formData.append("numero_cedeao",numero_cedeao)
          this.$msasApi.$post('parrainageByNumCedeao',formData)
          .then(async (response) => { 
            console.log('Données cedeao reçu+++++++++++',response.data.length)
            this.num_cedeao_exist=response.data.length==0?true:false
            if(response.data.length!=0){
              this.modelCedeao.sexe=""
              this.modelCedeao.codeRegion =""
              this.modelCedeao.annee =""
              this.modelCedeao.mois =""
              this.modelCedeao.jour =""
              this.modelCedeao.codeGenere =""
              this.modelCedeao.codeControle =""
              this.$refs.sexe_cedeao.focus()
              alert("Ce numéro est déja enregistré sur la base de données. Veuillez saisir un autre")
            }
            //this.listregions=response.data.data
            }).catch((error) => {
                console.log('Code error ++++++: ', error?.response?.data?.message)
            }).finally(() => {
            console.log('Requette envoyé ')
            this.num_cedeao_exist=false
          });
        }
        
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
              this.model.excelFile = data 
              console.log(data);
            };

            reader.readAsBinaryString(this.selectXlsx);
          }
          this.selectXlsx = null;
        },
      submitForm () {       

        for(let i=1;i<this.model.excelFile.length;i++){
          let validation = this.$refs.form.validate()

          let formData = new FormData();

          if(
          this.model.excelFile[i][1]
          && this.model.excelFile[i][2]
          && this.model.excelFile[i][3]
          && this.model.excelFile[i][4]
          && this.model.excelFile[i][5]
          && this.model.excelFile[i][6]
          && this.model.excelFile[i][7]
          && this.model.excelFile[i][8]
          && this.model.excelFile[i][9]
          && this.model.excelFile[i][10]
          && this.model.excelFile[i][11]
          && this.model.excelFile[i][12]
          && this.model.excelFile[i][13]
          && this.model.excelFile[i][14]
          && this.model.excelFile[i][15]
          && this.model.excelFile[i][16]
          && this.model.excelFile[i][17]
          && this.model.excelFile[i][18]
          ){
            formData.append("numero_cedeao",this.model.excelFile[i][1])
            formData.append("prenom",this.model.excelFile[i][2])
            formData.append("nom",this.model.excelFile[i][3])
            formData.append("date_naissance",this.model.excelFile[i][4])
            formData.append("lieu_naissance",this.model.excelFile[i][5])
            formData.append("taille",this.model.excelFile[i][6])
            formData.append("sexe",this.model.excelFile[i][7])
            formData.append("numero_electeur",this.model.excelFile[i][8])
            formData.append("centre_vote",this.model.excelFile[i][9])
            formData.append("bureau_vote",this.model.excelFile[i][10])
            formData.append("numero_cin",this.model.excelFile[i][11])
            formData.append("telephone",this.model.excelFile[i][12])
            formData.append("prenom_responsable",this.model.excelFile[i][13])
            formData.append("nom_responsable",this.model.excelFile[i][14])
            formData.append("telephone_responsable",this.model.excelFile[i][15])
            formData.append("region",this.model.excelFile[i][16])
            formData.append("departement",this.model.excelFile[i][17])
            formData.append("commune",this.model.excelFile[i][18])

            console.log(formData)

            if(validation){
              this.loading = true
                this.$msasApi.post('/parrainages',formData)
                .then((res) => {
                  console.log('Donées reçus ++++++: ',res)
                  this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
                  this.resetInfoElecteur()
                })
                .catch((error) => {
                    console.log('Code error ++++++: ', error)
                    this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
                }).finally(() => {
                  this.loading = false;
                  console.log('Requette envoyé ')
              });
            }
            else{
              alert("veuillez verifier tous les champs du formulaire avant de soumettre")
            } 
          }
          else{
            alert("veuillez verifier tous les champs du formulaire avant de soumettre")
          }
        }
      },
      resetInfoElecteur () {
        this.model.excelFile =""

      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      }
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
