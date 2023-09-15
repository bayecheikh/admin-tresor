<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="(item, i) in tabItems" :key="i">
            {{ item.title }}</v-tab
          >
        </v-tabs>
      </div>
      <div class="ml-auto p-2" v-if="$hasPermission('ajouter_sectoriel')">
        <v-btn depressed rounded color="primary" @click="goToAddsectoriel">
          <v-icon left> mdi-plus </v-icon>
          Ajouter
        </v-btn>
      </div>
    </div>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in tabItems" :key="i">
        <div>
          <v-card-title class="col-12">
            <!-- <recherche-investissement></recherche-investissement> -->
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="
              item.value == 'valide'
                ? listSectoriels.filter(
                    (sectoriel) => sectoriel.status == 'valide'
                  )
                : listSectoriels.filter(
                    (sectoriel) =>
                      (item.value == sectoriel.status) &
                      $hasPermission(sectoriel.state) &
                      $hasPermission(sectoriel.status)
                  )
            "
            :single-select="singleSelect"
            item-key="id"
            :items-per-page="perpage"
            class="flat pt-4"
            :loading="progress"
            loading-text="Loading... Please wait"
            hide-default-footer
            :search="search"
          >
            <template v-slot:top="{}">
              <v-row class="mb-1 border-bottom-small d-flex">
                <v-col md="6" sm="12" lg="6" class="pb-0 pt-4">
                  <div class="row">
                  </div>
                </v-col>
                <v-col
                  md="6"
                  sm="12"
                  lg="6"
                  class="pt-0 pb-2 align-right-pagination"
                >
                  <v-pagination
                    v-model="page"
                    :length="totalpage"
                    total-visible="6"
                    next-icon="mdi-menu-right"
                    prev-icon="mdi-menu-left"
                    @input="handlePageChange"
                  ></v-pagination>
                </v-col>
                <div class="text-center">
                  <v-dialog v-model="dialog" width="500">
                    <v-card>
                      <v-card-title class="text-h5">
                        Confirmation
                      </v-card-title>
                      <v-card-text
                        >Voulez-vous supprimer cet element ?</v-card-text
                      >
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
                        <v-btn
                          color="red darken-1"
                          text
                          @click="deleteItem"
                          outlined
                        >
                          Supprimer définitivement
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-row>
            </template>
            
            <template v-slot:[`item.status`]="{ item }">
              <v-chip
                :color="
                  (item.status == 'valide' && 'primary') ||
                  (item.status == 'rejete' && 'error') ||
                  (item.status == 'brouillon' && 'orange') ||
                  (item.status == 'publie' && 'green')
                "
                small
                outlined
                class="my-1 mr-1"
              >
                {{
                  (item.status == "valide" && "Validé") ||
                  (item.status == "rejete" && "Rejeté") ||
                  (item.status == "brouillon" && "Brouillon") ||
                  (item.status == "publie" && "Publié")
                }}
              </v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list shaped>
                  <v-item-group>
                    <v-list-item
                      @click="visualiserItem(item)"
                      link
                      class="custom-v-list-action pl-2 pr-1"
                    >
                      <v-list-item-title>
                        <v-icon small class="mr-2">
                          mdi-information-outline </v-icon
                        >Détails
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      @click="editItem(item)"
                      link
                      class="custom-v-list-action pl-2 pr-1"
                      v-if="
                        item.status == 'brouillon' || ($hasPermission('rejete') && item.status != 'rejete') || ($hasPermission('validation') && item.status == 'rejete')
                      "
                    >
                      <v-list-item-title>
                        <v-icon small class="mr-2"> mdi-pencil-outline </v-icon
                        >Modifier
                      </v-list-item-title>
                    </v-list-item>
                  </v-item-group>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import RechercheSectoriel from "@/components/sectoriels/RechercheSectoriel";
export default {
  components: {
    RechercheSectoriel,
  },
  mounted: function () {
    this.$hasPermission("brouillon") &&
      this.tabItems.push({ title: "Brouillons", value: "brouillon" });
    this.$hasPermission("FIN_PROCESS") &&
      this.tabItems.push({ title: "Validés", value: "FIN_PROCESS" });
    this.$hasPermission("rejete") &&
      this.tabItems.push({ title: "Rejetés", value: "rejete" });
    this.getList(1);
  },
  computed: mapGetters({
    listSectoriels: "sectoriels/listsectoriels",
    headers: "sectoriels/headersectoriels",
    totalpage: "sectoriels/totalpage",
    perpage: "sectoriels/perpage",
    datasearch: "sectoriels/datasearch",
  }),
  
  methods: {
    getList(page) {
      this.progress = true;
      this.$msasApi
        .$get("/sectoriels?page=" + page)
        .then(async (response) => {
          console.log("Données reçu sectoriels ++++++: ", response.data.data);
          let totalPages = Math.ceil(
            response.data.total / response.data.per_page
          );
          this.$store.dispatch("sectoriels/getTotalPage", totalPages);
          this.$store.dispatch("sectoriels/getPerPage", response.data.per_page);
          this.$store.dispatch("sectoriels/getList", response.data.data);
          console.log(
            "total page ++++++++++",
            response.data.total / response.data.per_page
          );
        })
        .catch((error) => {
          /* this.$toast.global.my_error().goAway(1500) */ //Using custom toast
          this.$toast.error(error?.response?.data?.message).goAway(3000);
          console.log("Code error ++++++: ", error?.response?.data?.message);
        })
        .finally(() => {
          console.log("Requette envoyé ");
          this.progress = false;
        });
      //console.log('total items++++++++++',this.paginationUtilisateur)
    },
    getResult(page, param) {
      this.progress = true;
      this.$msasApi
        .get("/sectoriel-multiple-search/" + param + "?page=" + page)
        .then(async (response) => {
          console.log("Données reçus++++++++++++", response.data.data.data);
          await this.$store.dispatch(
            "sectoriels/getList",
            response.data.data.data
          );
          let totalPages = Math.ceil(
            response.data.data.total / response.data.data.per_page
          );
          this.$store.dispatch("sectoriels/getTotalPage", totalPages);
          this.$store.dispatch(
            "sectoriels/getPerPage",
            response.data.data.per_page
          );
        })
        .catch((error) => {
          /* this.$toast.global.my_error().goAway(1500) */ //Using custom toast
          // this.$toast.error(error?.response?.data?.message).goAway(3000)
          console.log("Code error ++++++: ", error?.response?.data?.message);
        })
        .finally(() => {
          console.log("Requette envoyé");
          this.progress = false;
        });
    },
    actveDesactiveUser(id) {
      console.log("------------- sectoriel active", id);
      this.dialog = false;
      this.$store.dispatch("toast/getMessage", {
        type: "processing",
        text: "Traitement en cours ...",
      });
      this.$msasApi
        .$get("/active_sectoriel/" + id)
        .then(async (response) => {
          console.log("------------- reponse active", response);
          this.$store.dispatch("toast/getMessage", {
            type: "success",
            text: response.data.message || "Désactivation réussie",
          });
        })
        .catch((error) => {
          this.$store.dispatch("toast/getMessage", {
            type: "error",
            text: error || "Opération échoué",
          });
          console.log("Code error ++++++: ", error);
        })
        .finally(() => {
          console.log("Requette envoyé ");
        });
    },
    handlePageChange(value) {
      console.log("-------------datasearch est", this.datasearch);
      if (this.datasearch == null) this.getList(value);
      else this.getResult(value, this.datasearch);
    },
    visualiserItem(item) {
      this.$store.dispatch("sectoriels/getDetail", item);
      this.$router.push("/sectoriels/detail/" + item.id);
    },
    editItem(item) {
      this.$store.dispatch("sectoriels/getDetail", item);
      this.$router.push("/sectoriels/modifier/" + item.id);
    },
    async deleteItem() {
      this.dialog = false;
      this.$store.dispatch("toast/getMessage", {
        type: "processing",
        text: "Traitement en cours ...",
      });
      this.$msasApi
        .$delete("/sectoriels/" + this.activeItem.id)
        .then(async (response) => {
          this.$store.dispatch(
            "sectoriels/deleteUtilisateur",
            this.activeItem.id
          );
          this.$store.dispatch("toast/getMessage", {
            type: "success",
            text: response.data.message || "Suppression réussie",
          });
        })
        .catch((error) => {
          this.$store.dispatch("toast/getMessage", {
            type: "error",
            text: error || "Echec de la suppression",
          });
          console.log("Code error ++++++: ", error);
        })
        .finally(() => {
          console.log("Requette envoyé ");
        });
    },
    opendialog(item) {
      this.dialog = true;
      this.activeItem = item;
    },
    exporterItem(item) {
      alert("Exporter " + item.id);
    },
    visualiser() {
      if (this.selected.length != 1) alert("Veuillez selectionner un element");
      else {
        let sectoriel = this.selected.map(function (value) {
          return value;
        })[0];
        this.$store.commit("sectoriels/initdetail", sectoriel);
        this.$router.push("/sectoriels/detail/" + sectoriel.id);
      }
    },
    modifier() {
      if (this.selected.length != 1) alert("Veuillez selectionner un element");
      else {
        let sectoriel = this.selected.map(function (value) {
          return value;
        })[0];
        this.$store.commit("sectoriels/initdetail", sectoriel);
        this.$router.push("/sectoriels/modifier/" + sectoriel.id);
      }
    },
    supprimer() {
      if (this.selected.length >= 1)
        alert(
          "Supprimer " +
            this.selected.map(function (value) {
              return value.id;
            })
        );
      else alert("Veuillez selectionner un element");
    },
    exporter() {
      if (this.selected.length >= 1)
        alert(
          "Exporter " +
            this.selected.map(function (value) {
              return value.id;
            })
        );
      else alert("Veuillez selectionner un element");
    },
    goToAddsectoriel() {      
      this.$router.push('/sectoriels/addSectoriel');
    },
  },
  data: () => ({
    tab: "tout",
    tabItems: [],
    status: ["actif", "inactif"],
    dialog: false,
    progress: true,
    selected: [],
    search: "",
    items: [],
    page: 1,
    totalPages: 1,
    pageCount: "",
    itemsPerPage: "",
    path: "",
    totalItems: 0,
    options: {},
    selectedItem: 0,
    activeItem: {},
  }),
};
</script>
<style scoped>
.border-bottom-small {
  border-bottom: solid 1px #80808052;
}
</style>
