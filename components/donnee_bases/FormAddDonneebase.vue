<template>
  <div>
    <v-form
      class="text-sm-center"
      v-model="valid"
      ref="form"
      enctype="multipart/form-data"
    >
      <div class="custom-container">
        <v-row>
          <v-col lg="6" md="6" sm="12">
            <v-autocomplete
              v-model="selectedAnnee"
              :items="listannees"
              outlined
              dense
              label="Année"
              item-text="libelle"
              item-value="id"
              return-object
              @change="changeAnnee"
            >
            </v-autocomplete>
          </v-col>
          <!--<v-col lg="6" md="6" sm="12">
            <v-autocomplete
              v-model="SelectedMonnaie"
              :items="listmonnaies"
              :rules="rules.fournisseur_services_idRules"
              outlined
              dense
              label="Trimestre"
              item-text="libelle"
              item-value="id"
              return-object
              @change="changeTrimestre"
              >
            </v-autocomplete>
        </v-col>-->
        </v-row>
      </div>
      <div class="custom-container">
        <v-tabs v-model="tab">
          <v-tab class="text-normal">Impacts</v-tab>
          <v-tab class="text-normal"> Effets</v-tab>
          <v-tab class="text-normal"> Produits</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row>
              <v-col lg="12" md="12">
                <div class="custom-card-grey mt-10">
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.1 : Incidence de la pauvreté"
                          outlined
                          dense
                          v-model="model.Ind_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.2 : Taux de chômage des Jeunes (15-35 ans)/dont pour les jeunes femmes"
                          outlined
                          dense
                          v-model="model.Ind_2"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col lg="12" md="12">
                <div class="custom-card-grey mt-10">
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.1.1 : Taux d’accroissement du C.A des MPME appuyées Agricoles et Artisanales"
                          outlined
                          dense
                          v-model="model.Ind_1_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.2.1 : Taux d’accroissement du C.A des MPME appuyées Industrie et Services"
                          outlined
                          dense
                          v-model="model.Ind_2_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.1.2 : Nombre d’emplois directs créés ou consolidés dans les chaînes de valeur agricoles et artisanales dont 50% pour les femmes"
                          outlined
                          dense
                          v-model="model.Ind_1_2"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.2.2 : Nombre d’emplois décents directs créés et/ou consolidés dans les autres secteurs prioritaires dont pour les femmes"
                          outlined
                          dense
                          v-model="model.Ind_2_2"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>                 
                </div>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col lg="12" md="12">
                <div class="custom-card-grey mt-10">
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind. R.2.1.1 : Nombre de MPME bénéficiant d’un accompagnement technique dont 50% pour les femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_2_1_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind. R.2.2.2 : Volume de financement octroyé (en millions de FCFA) dont 40% destinés aux femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_2_2_2"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind. R.2.2.1 : Nombre de MPME financées dont 50% pour les femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_2_2_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.R.1.2.1. : Nombre d’entreprises financées dont 50% pour les femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_1_2_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.R.1.2.2 : Volume de financement octroyé (en millions de FCFA) dont 40% destinés aux femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_1_2_2"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.R.1.1.2 : Nombre MPME formalisées"
                          outlined
                          dense
                          v-model="model.Ind_R_1_1_2"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.R.1.1.1 : Nombre de personnes formées en appui métier et en gestion d’entreprise dont pour 40% pour les femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_1_1_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col md="12" lg="12" sm="12">
                        <v-radio-group v-model="model.Ind_R_3_1_1" row>
                          Ind. R.3.1.1 : Mise en place de l’assistance technique
                          en structuration de chaînes de valeur : &nbsp; &nbsp;

                          <v-radio label="OUI" value="OUI"></v-radio>
                          <v-radio label="NON" value="NON"></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col md="12" lg="12" sm="12">
                        <v-radio-group v-model="model.Ind_R_3_1_2" row>
                          Ind. R.3.1.2 : Les capacités de la DER sont renforcées
                          en recouvrement,CSIG : &nbsp; &nbsp;

                          <v-radio label="OUI" value="OUI"></v-radio>
                          <v-radio label="NON" value="NON"></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind. R.3.2.1 : Nombre de rapports de suivi"
                          outlined
                          dense
                          v-model="model.Ind_R_3_2_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind. R.3.2.2 : Nombre de rapports d’audit validés"
                          outlined
                          dense
                          v-model="model.Ind_R_3_2_2"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.R.1.1.2 : Nombre MPME formalisées"
                          outlined
                          dense
                          v-model="model.Ind_R_1_1_2"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.R.1.1.1 : Nombre de personnes formées en appui métier et en gestion d’entreprise dont pour 40% pour les femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_1_1_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.R.1.2.1. : Nombre d’entreprises financées dont 50% pour les femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_1_2_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind.R.1.2.2 : Volume de financement octroyé (en millions de FCFA) dont 40% destinés aux femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_1_2_2"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind. R.2.2.2 : Volume de financement octroyé (en millions de FCFA) dont 40% destinés aux femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_2_2_2"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind. R.2.2.1 : Nombre de MPME financées dont 50% pour les femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_2_2_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card
                    class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5 my-10 border-grey"
                  >
                    <v-row>
                      <v-col lg="12" md="12" sm="12">
                        <v-text-field
                          label="Ind. R.2.1.1 : Nombre de MPME bénéficiant d’un accompagnement technique dont 50% pour les femmes"
                          outlined
                          dense
                          v-model="model.Ind_R_2_1_1"
                          :rules="rules.numberRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
        <v-btn
          :loading="loading"
          :disabled="!valid"
          class="mr-4 text-white"
          color="primary"
          @click="submitForm"
        >
          Enregistrer
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Notification from "@/components/Notification";
export default {
  components: {
    Notification,
  },
  mounted: function () {
    this.$store.dispatch("annees/getList");
    this.$store.dispatch("monnaies/getList");
    /* this.$store.dispatch('structures/getList')
      this.$store.dispatch('fournisseurs/getList') */
  },
  computed: {
    ...mapGetters({
      listannees: "annees/listannees",
      listmonnaies: "monnaies/listmonnaies",
      /* listfournisseurs: 'fournisseurs/selectlistfournisseurs',
      liststructures: 'structures/selectliststructures', */
    }),
  },
  data: () => ({
    tab: null,
    loading: false,
    message: null,
    color: null,
    valid: true,
    showFournisseur: false,
    message: null,

    model: {
      Ind_1: "",
      Ind_2: "",
      Ind_1_1: "",
      Ind_2_1: "",
      Ind_R_3_1_1: "",
      Ind_R_3_1_2: "",
      Ind_R_3_2_1: "",
      Ind_R_3_2_2: "",

      Ind_1_2: "",
      Ind_R_1_2_1: "",
      Ind_R_1_1_2: "",
      Ind_R_1_1_1: "",
      Ind_2_2: "",
      Ind_R_1_2_2: "",
      Ind_R_2_2_2: "",
      Ind_R_2_2_1: "",
      Ind_R_1_1_1: "",
      Ind_R_2_1_1: "",
    },
    resume: {
      annee: "",
      trimestre: "",
    },
    rules: {
      numberRules: [
        (v) => {
          if (!v.trim() || v == "") return true;
          if (!isNaN(parseFloat(v)) && v >= 0) return true;
          return "Veuillez saisir un chiffre valide";
        },
      ],
      firstnameRules: [
        (v) => !!v || "Prénom est obligatoire",
        (v) =>
          (v && v.length <= 50) || "Prénom doit etre inférieur à 20 caratères",
      ],
      lastnameRules: [
        (v) => !!v || "Nom est obligatoire",
        (v) =>
          (v && v.length <= 50) || "Nom doit etre inférieur à 10 caratères",
      ],
      emailRules: [
        (v) => !!v || "E-mail est obligatoire",
        (v) => /.+@.+\..+/.test(v) || "E-mail mdoit etre valide",
      ],
      donnee_basenameRules: [
        (v) => !!v || "Login est obligatoire",
        (v) =>
          (v && v.length <= 10) || "Nom doit etre inférieur à 10 caratères",
      ],
      rolesRules: [(v) => (v && !!v.length) || "Role est obligatoire"],
      telephoneRules: [(v) => !!v || "Téléphone est obligatoire"],
      country_codeRules: [(v) => !!v || "L'indicatif du pays est obligatoire"],
      fournisseur_services_idRules: [(v) => !!v || "champ obligatoire"],
      structure_idRules: [(v) => !!v || "Structure est obligatoire"],
      adresseRules: [
        (v) => !!v || "Adresse est obligatoire",
        (v) =>
          (v && v.length <= 100) ||
          "Adresse doit etre inférieur à 50 caratères",
      ],
      nationalityRules: [
        (v) => !!v || "Nationalité est obligatoire",
        (v) =>
          (v && v.length <= 50) ||
          "Nationalité doit etre inférieur à 15 caratères",
      ],
      date_of_birthRules: [(v) => !!v || "Date de naissance est obligatoire"],
      place_of_birthRules: [
        (v) => !!v || "Lieu de naissance est obligatoire",
        (v) =>
          (v && v.length <= 50) ||
          "Lieu de naissance doit etre inférieur à 20 caratères",
      ],
      /* sexeRules: [
          v => !!v || 'Civilité est obligatoire',
        ], */
      type_identificationRules: [
        (v) => !!v || "Type d'identification est obligatoire",
      ],
      numero_identificationRules: [
        (v) => !!v || "Numéro d'identification est obligatoire",
      ],
      fonctionRules: [(v) => !!v || "Fonction est obligatoire"],
    },

    imageData: null,
  }),
  methods: {
    handleFileUpload(e) {
      //Recupère le fichier
      const input = this.$refs.file;
      const files = input.files;

      //Recupère l'extension
      let idxDot = files[0].name.lastIndexOf(".") + 1;
      let extFile = files[0].name
        .substr(idxDot, files[0].name.length)
        .toLowerCase();
      let size = files[0].size / 1024 / 1024; //La taille en Mbit
      console.log("Size-------------- ", size);

      if (
        size <= 2 &&
        (extFile == "jpg" || extFile == "jpeg" || extFile == "png")
      ) {
        //Affecté le fichier image au model avatar
        this.model.avatar = e.target.files[0];

        //Prévisualise l'image
        if (files && files[0]) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageData = e.target.result;
          };
          reader.readAsDataURL(files[0]);
          this.$emit("input", files[0]);
        }
      } else {
        alert(
          "Seul les images jpg/jpeg png et de taille inférieur à 2Mb sont acceptés!"
        );
      }
    },
    submitForm() {
      let validation = this.$refs.form.validate();
      this.loading = true;

      let formData = new FormData();

      formData.append("annee", this.resume.annee);
      formData.append("trimestre", this.resume.trimestre);
      formData.append("questionnaire", JSON.stringify(this.model));

      validation &&
        this.$msasFileApi
          .post("/donnee_bases", formData)
          .then((res) => {
            console.log("Donées reçus ++++++: ", res.data);
            this.$store.dispatch("toast/getMessage", {
              type: "success",
              text: res.data.message,
            });
            this.$router.push("/donnee_bases");
          })
          .catch((error) => {
            console.log("Code error ++++++: ", error);
            this.$store.dispatch("toast/getMessage", {
              type: "error",
              text: error || "Echec de l'ajout ",
            });
          })
          .finally(() => {
            this.loading = false;
            console.log("Requette envoyé ");
          });
    },
    resetForm() {
      this.$refs.form.reset();
    },
    resetValidationForm() {
      this.$refs.form.resetValidation();
    },
    async changeAnnee(value) {
      //resumé
      this.resume.annee = value?.libelle;
    },
    async changeTrimestre(value) {
      //resumé
      console.log("trimestre -------- ", value);
      this.resume.trimestre = value?.libelle;
    },
  },
  metaInfo() {
    return {
      items: this.items,
    };
  },
};
</script>
<style>
.custom-card-grey .border-grey {
  background: #f1f3f5d9 !important;
}
.v-text-field fieldset {
  background-color: #fff !important;
}
</style>
