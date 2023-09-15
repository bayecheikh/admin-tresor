<template>
<v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
  <v-stepper
    v-model="step"
    vertical
  >
    <!-- Step:1 Identification de la zone -->
    <v-stepper-step
      :complete="step > 1"
      step="1"
      editable
    >
      Identification de la zone
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
        <v-row>
          <v-col lg="4" sm="12" md="4">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="model.debut_intervention"
                  :rules="rules.dateRules"
                  label="Date enquete"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="model.debut_intervention"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="region"
              :rules="rules.selectRules"
              :items="listregions"
              outlined
              dense
              label="Région"
              item-text="nom_region"
              item-value="id"
              return-object
              @change="changeRegion"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="departement"
              :rules="rules.selectRules"
              :items="listdepartements"
              outlined
              dense
              label="Departement"
              item-text="nom_departement"
              item-value="id"
              return-object
              @change="changeDepartement"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="commune"
              :rules="rules.selectRules"
              :items="listcommunes"
              outlined
              dense
              label="Commune"
              item-text="nom_commune"
              item-value="id"
              return-object
              @change="changeCommune"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="beneficiaire"
              :rules="rules.selectRules"
              :items="listbeneficiaires"
              hide-no-data
              :filter="() => true"
              outlined
              dense
              label="Bénéficiaire (Téléphone ou CNI)"
              item-text="nom_beneficiaire"
              item-value="id"
              return-object
              @keyup="(event) => UpdateBeneficiaire(event, index)"
              @change="changeBeneficiaire"
            >
              <template v-slot:selection="data">
                <h5>{{ data.item.prenom_beneficiaire+' '+data.item.nom_beneficiaire }}</h5>
              </template>
              <template v-slot:item="data">
                <div class="mt-4">
                  <h5>{{ data.item.prenom_beneficiaire+' '+data.item.nom_beneficiaire }}</h5>
                  <p>Tel: {{ data.item.telephone_beneficiaire}}</p>
                </div>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="projet"
              :rules="rules.selectRules"
              :items="listprojets"
              outlined
              dense
              label="Projets"
              item-text="titre_projet"
              item-value="id"
              return-object
              @change="changeProjet"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-card>
      <v-btn
        color="primary"
        @click="step = 2"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <!-- Step:2 Section -->
    <v-stepper-step
      :complete="step > 2"
      step="2"
      editable
    >
      Choisir une section
    </v-stepper-step>
    <v-stepper-content step="2">
      <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
        <v-row>
          <v-col md="12" lg="12" sm="12">
            <v-radio-group
              :v-model="selectedSecteur"
              :rules="rules.radioRules"
              @change="changeSecteur"
              row
            >
              <v-radio
                class="col-12"
                v-for="item in listsecteurs"
                :key="item.id"
                :label="item.nom_secteur"
                :value="item.id"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card>
      <v-btn
        color="primary"
         @click="step = 3"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <!-- Step:3 Activités -->
    <v-stepper-step
      :complete="step > 3"
      step="3"
      editable
    >
      Activité de la semaine
    </v-stepper-step>
    <v-stepper-content step="3">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5" flat>
        <div class="custom-ligne-bloc">
          <v-row>
            <v-col lg="12" md="12" sm="12">
              <v-row>
                <v-col md="12" lg="12" sm="12">
                  <v-row>                   
                    <v-col md="12" lg="12" sm="12">
                      <v-text-field
                        label="Intitulé de l'activité"
                        outlined
                        dense
                        v-model="intitule_activite0"
                        :rules="rules.textfieldRules"
                      ></v-text-field>
                    </v-col>
                    <v-col md="12" lg="12" sm="12">
                      <v-textarea
                        label="Description de l'activité"
                        outlined
                        dense
                        v-model="description_activite0"
                        :rules="rules.textareaRules"
                      ></v-textarea>
                    </v-col>
                    <v-col md="4" lg="4" sm="12">
                      <v-text-field
                        label="Nombre de bénéficiaire Homme"
                        outlined
                        dense
                        v-model="nombre_benef_homme0"
                        :rules="rules.textfieldRules"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" lg="4" sm="12">
                      <v-text-field
                        label="Nombre de bénéficiaire Femme"
                        outlined
                        dense
                        v-model="nombre_benef_femme0"
                        :rules="rules.textfieldRules"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" lg="4" sm="12">
                      <v-text-field
                        label="Type de matériel utilisé"
                        outlined
                        dense
                        v-model="type_materiel_utilise0"
                        :rules="rules.textfieldRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-btn
                color="#000"
                class="white--text"
                @click="submitLigne"
                depressed
              >
                Ajouter une activité
                <v-icon right dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-simple-table class="custom-ligne-bloc-2">

          <thead>
            <tr>
              <th class="text-left">
                Intitulé de l'activité
              </th>
              <th class="text-left">
                Description de l'activité
              </th>
              <th class="text-left">
                Nombre de bénéficiaire Homme
              </th>
              <th class="text-left">
                Nombre de bénéficiaire Femme
              </th>
              <th class="text-left">
                Type de matériel utilisé
              </th>
              <th class="text-left">
                -
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,i) in LigneActivites"
              :key="item.id"
            >
              <td>{{item.intitule_activites}}</td>
              <td>{{item.description_activites}}</td>
              <td>{{item.nombre_benef_hommes}}</td>
              <td>{{item.nombre_benef_femmes}}</td>
              <td>{{item.type_materiel_utilises}}</td>
              <td><v-icon @click="deleteFind(i)">mdi-close</v-icon></td>
              
            </tr>
          </tbody>
        </v-simple-table>
        
      </v-card>
      <v-btn
        color="primary"
        @click="step = 4"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <!-- Step:4 Contraintes -->
    <v-stepper-step
      :complete="step > 4"
      step="4"
      editable
    >
      Contraintes
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5" flat>
        <div class="custom-ligne-bloc">
          <v-row>
            <v-col lg="12" md="12" sm="12">
              <v-row>
                <v-col md="12" lg="12" sm="12">
                  <v-row>                   
                    <v-col md="12" lg="12" sm="12">
                      <v-textarea
                        label="Difficulté rencontrée"
                        outlined
                        dense
                        v-model="difficulte_rencontre0"
                        :rules="rules.textareaRules"
                      ></v-textarea>
                    </v-col>
                    <v-col md="12" lg="12" sm="12">
                      <v-textarea
                        label="Solution trouvée"
                        outlined
                        dense
                        v-model="solution_trouve0"
                        :rules="rules.textareaRules"
                      ></v-textarea>
                    </v-col>
                    <v-col md="12" lg="12" sm="12">
                      <v-textarea
                        label="Suivi nécessaire"
                        outlined
                        dense
                        v-model="suivie_necessaire0"
                        :rules="rules.textareaRules"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-btn
                color="#000"
                class="white--text"
                @click="submitLigneContrainte"
                depressed
              >
                Ajouter une contrainte
                <v-icon right dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>

          <v-simple-table class="custom-ligne-bloc-2">
            <thead>
              <tr>
                <th class="text-left">
                  Difficulté rencontrée
                </th>
                <th class="text-left">
                  Solution trouvée
                </th>
                <th class="text-left">
                  Suivi nécessaire
                </th>
                <th class="text-left">
                  -
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item,i) in LigneContraintes"
                :key="item.id"
              >
                <td>{{item.difficulte_rencontres}}</td>
                <td>{{item.solution_trouves}}</td>
                <td>{{item.suivie_necessaires}}</td>
                <td><v-icon @click="deleteFindContrainte(i)">mdi-close</v-icon></td>
                
              </tr>
            </tbody>
          </v-simple-table>
        
      </v-card>
      <v-btn
        color="primary"
        @click="step = 5"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <!-- Step:5 Attacher fichiers -->
    <v-stepper-step 
      :complete="step > 5"
      step="5"
      editable
      >
      Attacher des fichiers
    </v-stepper-step>
    <v-stepper-content step="5">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5" flat>
        <v-row v-for="(item,i) in fichiers"
              :key="item.id">
          <v-col md="6" lg="6" sm="12">
              <v-text-field
                v-model="item.libelle_fichier"
                :rules="rules.textfieldRules"
                outlined
                label="Nom du fichier" 
                dense             
              >              
              </v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12" class="d-flex">
              <v-file-input
              v-model="item.input_fichier"
              outlined
              label="Joindre le fichier"
              dense
              :clearable="false"
              >
              </v-file-input>
              <v-icon @click="deleteFindFichier(i)">mdi-close</v-icon>
          </v-col>

        </v-row>
        <v-btn
          color="#000"
          class="white--text mb-5"
          @click="submitLigneFichier"
          depressed
        >
          Ajouter un fichier
          <v-icon right dark> mdi-plus </v-icon>
        </v-btn>
      </v-card>
      <v-btn
        color="primary"
        @click="step = 6"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <!-- Step:6 Géolocalisation -->
    <v-stepper-step 
      :complete="step > 6"
      step="6"
      editable
      >
      Géolocalisation
    </v-stepper-step>
    <v-stepper-content step="6">
      <v-card
         class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat
      >
      <v-row>
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Latitude"
            outlined dense
            v-model="model.latitude"
            :rules="rules.textfieldRules"
          ></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Longitude"
            outlined dense
            v-model="model.longitude"
            :rules="rules.textfieldRules"
          ></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12">
          <v-btn
          color=""
          @click="geolocate"
          >
            Detecter la position actuelle
          </v-btn>
        </v-col>
        <v-col md="12" lg="12" sm="12">
          <GmapMap
            :center="center"
            :zoom="11"
            map-style-id="roadmap"
            :options="mapOptions"
            style="width: 100%; height: 50vmin"
            ref="mapRef"
            @click="handleMapClick"
          >
            <GmapMarker
              :position="marker.position"
              :clickable="true"
              :draggable="true"
              @drag="handleMarkerDrag"
              @click="panToMarker"
            />
          </GmapMap>
          <p>Position: {{ marker.position }}</p>
        </v-col>
      </v-row>
      </v-card>
      <v-btn
        color="primary"
        @click="step = 7"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <!-- Step:7 Données specifique -->
    <v-stepper-step 
      :complete="step > 7"
      step="7"
      editable
      >
      Données spécifiques
    </v-stepper-step>
    <v-stepper-content step="7">
      <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
        <v-row>
          <v-col lg="10" md="10" sm="10">
            <v-text-field
              label="Superficie"
              outlined
              dense
              v-model="model.superficie"
              :rules="rules.textfieldRules"
            ></v-text-field>
          </v-col>
          <v-col lg="2" md="2" sm="2">
            <v-radio-group
              v-model="model.unite_superficie"
              row
            >
              <v-radio
                label="m2"
                value="m2"
              ></v-radio>
              <v-radio
                label="ha"
                value="ha"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col lg="12" md="12" sm="12">
            <v-textarea
              label="Description du fonctionnement global"
              outlined
              dense
              v-model="model.fonctionnement_global"
              :rules="rules.textareaRules"
            ></v-textarea>
          </v-col>
          <v-col lg="12" md="12" sm="12">
            <v-textarea
              label="Description du systeme de production"
              outlined
              dense
              v-model="model.systeme_production"
              :rules="rules.textareaRules"
            ></v-textarea>
          </v-col>
          <v-col lg="12" md="12" sm="12">
            <v-textarea
              label="Priorité de l'Exploitation/Projet"
              outlined
              dense
              v-model="model.exploitation_projet"
              :rules="rules.textareaRules"
            ></v-textarea>
          </v-col>
          <v-col lg="12" md="12" sm="12">
            <v-textarea
              label="Main d'oeuvre"
              outlined
              dense
              v-model="model.main_oeuvre"
              :rules="rules.textareaRules"
            ></v-textarea>
          </v-col>
          <v-col md="6" lg="6" sm="12">
            <v-expansion-panels
              class="mb-2"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3>Environnement techo-socio-eco</h3> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-for="item in environnements" :key="item.id">
                    <v-checkbox
                      v-model="selectedEnvironnements"
                      :label="item.nom_environnement"
                      :value="item.id"
                    ></v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col md="6" lg="6" sm="12">
            <v-expansion-panels
              class="mb-2"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3>Enjeux locaux</h3> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-for="item in enjeux_locaux" :key="item.id">
                    <v-checkbox
                      v-model="selectedEnjeux_locaux"
                      :label="item.nom_enjeu_locaux"
                      :value="item.id"
                    ></v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col md="6" lg="6" sm="12">
            <v-expansion-panels
              class="mb-2 mt-0"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3>Valorisation</h3> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-for="item in valorisations" :key="item.id">
                    <v-checkbox
                      v-model="selectedValorisations"
                      :label="item.nom_valorisation"
                      :value="item.id"
                    ></v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col md="6" lg="6" sm="12">
            <v-expansion-panels
              class="mb-2 mt-0"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3>Commercialisation</h3> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-for="item in commercialisations" :key="item.id">
                    <v-checkbox
                      v-model="selectedCommercialisations"
                      :label="item.nom_commercialisation"
                      :value="item.id"
                    ></v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col lg="12" sm="12" md="12">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="model.date_demarrage"
                  :rules="rules.dateRules"
                  label="Date de démarrage de l'activité"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="model.date_demarrage"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col lg="12" md="12" sm="12">
            <v-textarea
              label="Organisation du travail"
              outlined
              dense
              v-model="model.organisation_travail"
              :rules="rules.textareaRules"
            ></v-textarea>
          </v-col>
          <v-col lg="12" md="12" sm="12">
            <v-textarea
              label="Stratégie de protection"
              outlined
              dense
              v-model="model.strategie_protection"
              :rules="rules.textareaRules"
            ></v-textarea>
          </v-col>
          <v-col lg="6" md="6" sm="6">
            <v-text-field
              label="Rendement (t/ha)"
              outlined
              dense
              v-model="model.rendement"
              :rules="rules.textfieldRules"
            ></v-text-field>
          </v-col>
          <v-col lg="6" md="6" sm="6">
            <v-text-field
              label="Perte (%)"
              outlined
              dense
              v-model="model.perte"
              :rules="rules.textfieldRules"
            ></v-text-field>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-text-field
              label="Chiffre d'affaire (%ha)"
              outlined
              dense
              v-model="model.chiffre_affaire_ha"
              :rules="rules.textfieldRules"
            ></v-text-field>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-text-field
              label="Chiffre d'affaire (%bande)"
              outlined
              dense
              v-model="model.chiffre_affaire_bande"
              :rules="rules.textfieldRules"
            ></v-text-field>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-text-field
              label="Chiffre d'affaire (%lot)"
              outlined
              dense
              v-model="model.chiffre_affaire_lot"
              :rules="rules.textfieldRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-btn
        color="primary"
        @click="step = 8"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <!-- Step:8 Resumé -->
    <v-stepper-step 
      :complete="step > 8"
      step="8"
      editable
      >
      Résumé
    </v-stepper-step>
    <v-stepper-content step="8">
      <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
        <v-row>
          <v-col md="12" sm="12" lg="12" text-md-left>
            <div class="row">
              <div class="col-md-4 my-0 py-0">
                  <p class="info-profil"><span>Région : </span>{{resume.nom_region}}</p>
              </div>
              <div class="col-md-4 my-0 py-0">
                  <p class="info-profil"><span>Departement : </span>{{resume.nom_departement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0">
                  <p class="info-profil"><span>Commune : </span>{{resume.nom_commune}}</p>
              </div>
              <div class="col-md-4 my-0 py-0">
                  <p class="info-profil"><span>Beneficiaire : </span>{{resume.nom_beneficiaire}}</p>
              </div>
              <div class="col-md-4 my-0 py-0">
                  <p class="info-profil"><span>Projet : </span>{{resume.reference_projet}}</p>
              </div>
              <div class="col-md-4 my-0 py-0">
                  <p class="info-profil"><span>Secteur : </span>{{resume.nom_secteur}}</p>
              </div>
              <div class="col-md-4 my-0 py-0">
                  <p class="info-profil"><span>Latitude : </span>{{model.latitude}}</p>
              </div>
              <div class="col-md-4 my-0 py-0">
                  <p class="info-profil"><span>Longitude : </span>{{model.longitude}}</p>
              </div>
              <div class="col-md-12 col-sm-12 col-lg-12 my-5 py-0">
                  <p class="info-profil"><span>Activités de la semaine</span></p>
                  <v-simple-table class="custom-ligne-bloc-2">

                    <thead>
                      <tr>
                        <th class="text-left">
                        
                        </th>
                        <th class="text-left">
                          Intitulé de l'activité
                        </th>
                        <th class="text-left">
                          Description de l'activité
                        </th>
                        <th class="text-left">
                          Nombre de bénéficiaire Homme
                        </th>
                        <th class="text-left">
                          Nombre de bénéficiaire Femme
                        </th>
                        <th class="text-left">
                          Type de matériel utilisé
                        </th>
                        <th class="text-left">
                          -
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item,i) in LigneActivites"
                        :key="item.id"
                      >
                        <td>{{i}}</td>
                        <td>{{item.intitule_activites}}</td>
                        <td>{{item.description_activites}}</td>
                        <td>{{item.nombre_benef_hommes}}</td>
                        <td>{{item.nombre_benef_femmes}}</td>
                        <td>{{item.type_materiel_utilises}}</td>                    
                      </tr>
                    </tbody>
                  </v-simple-table>
              </div>
              <div class="col-md-12 col-sm-12 col-lg-12 my-5 py-0">
                  <p class="info-profil"><span>Contraintes</span></p>
                  <v-simple-table class="custom-ligne-bloc-2">
                  <thead>
                    <tr>
                      <th class="text-left">
                      </th>
                      <th class="text-left">
                        Difficulté rencontrée
                      </th>
                      <th class="text-left">
                        Solution trouvée
                      </th>
                      <th class="text-left">
                        Suivi nécessaire
                      </th>
                      <th class="text-left">
                        -
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item,i) in LigneContraintes"
                      :key="item.id"
                    >
                      <td>{{i}}</td>
                      <td>{{item.difficulte_rencontres}}</td>
                      <td>{{item.solution_trouves}}</td>
                      <td>{{item.suivie_necessaires}}</td>                    
                    </tr>
                  </tbody>
                </v-simple-table>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <v-btn
        color="primary"
        @click="controleValidation"
      >
        Soumettre
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</v-form>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
    },
    mounted: function() {
      this.geolocate()
      this.getRegions()     
    },
    computed: {
      ...mapGetters({
      listregions: 'regions/listregions'    
    })},
    data: () => ({
      resume:{
        nom_region:'',
        nom_departement:'',
        nom_commune:'',
        nom_beneficiaire:'',
        reference_projet:'',
        nom_secteur:''
      },
      commune:null,
      departement:null,
      region:null,
      beneficiaire:null,
      projet:null,
      selectedSecteur:null,
      projetByRegion:[
        {
          id:1,
          nom_region:'Dakar',
          departements:[
            {
              id:1,
              nom_departement:'Dakar',
              communes:[
                {
                  id:2,
                  nom_commune:'Point E',
                  beneficiaires:[
                    {
                      id:1,
                      nom:'Lamine',
                      email:'lamine@derfj.sn',
                      projets:[
                        {
                          id:1,
                          ref:'00B-15',
                          titre:'Projet 3'
                        },
                        {
                          id:2,
                          ref:'00B-16',
                          titre:'Projet 4'
                        }
                      ]
                    }
                  ],
                }
              ]
            },
            {
              id:2,
              nom_departement:'Pikine',
              communes:[
                {
                  id:2,
                  nom_commune:'Pikine Ouest',
                  beneficiaires:[
                    {
                      id:1,
                      nom:'Lamine',
                      email:'lamine@derfj.sn',
                      projets:[
                        {
                          id:1,
                          ref:'00B-15',
                          titre:'Projet 3'
                        },
                        {
                          id:2,
                          ref:'00B-16',
                          titre:'Projet 4'
                        }
                      ]
                    }
                  ],
                }
              ]
            }
          ]
        },
        {
          id:2,
          nom_region:'Thiès',
          departements:[
            {
              id:1,
              nom_departement:'Thiès',
              communes:[
                {
                  id:2,
                  nom_commune:'Thiès Nord',
                  beneficiaires:[
                    {
                      id:1,
                      nom:'Serigne',
                      email:'serigne@derfj.sn',
                      projets:[
                        {
                          id:1,
                          ref:'00B2-15',
                          titre:'Projet 00'
                        },
                        {
                          id:2,
                          ref:'00B3-16',
                          titre:'Projet 11'
                        }
                      ]
                    }
                  ],
                }
              ]
            }
          ]
        }
      ],

      listsecteurs : [
        {id:1,nom_secteur:'Suivi des dossiers financés par la REWMI'},
        {id:2,nom_secteur:'Suivi des décaissements au niveau des IFP'},
        {id:3,nom_secteur:'Formation et accompagnement des bénéficiaires de la REWMI'},
        {id:4,nom_secteur:'Situation des recouvrements au niveau départemental'},
        {id:5,nom_secteur:'Organisation des sessions d\'animation économique'},
        {id:6,nom_secteur:'Activité de représentation dans les comités'},
        {id:7,nom_secteur:'Autres activités'},
      ],
      environnements : [
        {id:1,nom_environnement:'Adhésion OP'},
        {id:2,nom_environnement:'Conseil technique'}
      ],
      enjeux_locaux : [
        {id:1,nom_enjeu_locaux:'Périurbaine'},
        {id:2,nom_enjeu_locaux:'Inondable'},
        {id:3,nom_enjeu_locaux:'Electrification'},
        {id:4,nom_enjeu_locaux:'Route'},
        {id:5,nom_enjeu_locaux:'Autres'}
      ],
      valorisations : [
        {id:1,nom_valorisation:'Frais'},
        {id:2,nom_valorisation:'Industrie'},
        {id:3,nom_valorisation:'Transformations'}
      ],
      commercialisations : [
        {id:1,nom_commercialisation:'Circuit court'},
        {id:2,nom_commercialisation:'Circuit long'}
      ],

      listcommunes:[],
      listdepartements:[],
      listregions:[],
      listbeneficiaires:[],
      listprojets:[],   

      step: 1,

      inputfichiers:[],
      libelle_fichiers:[],
      fichiers:[],
      countrow_activite:1,
      countrow_contrainte:1,
      countrow_fichier:1,

      filename : '',
      loading: false,

      valid: true,
 
      LigneActivites:[],
      LigneContraintes:[],
      
      intitule_activite0:'',
      description_activite0:'',
      nombre_benef_homme0:'',
      nombre_benef_femme0:'',
      type_materiel_utilise0:'',

      difficulte_rencontre0:'',
      solution_trouve0:'',
      suivie_necessaire0:'',

      intitule_activites:[],
      description_activites:[],
      nombre_benef_hommes:[],
      nombre_benef_femmes:[],
      type_materiel_utilises:[],

      difficulte_rencontres:[],
      solution_trouves:[],
      suivie_necessaires:[],

      model: {
      },
      rules:{
        textfieldRules: [],
        radioRules: [],
        selectRules: [],
        textareaRules: [],
        numberRules: [],
        emailRules: [],
        dateRules: [],
      },
      date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,

      marker: { position: { lat: 10, lng: 10 } },
      center: { lat: 10, lng: 10 },
      mapOptions: {
        height:300,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
      },
    }),
    methods: {
      handleFileUpload(e){
        //Recupère le fichier
        const input = this.$refs.file
        const files = input.files

        //Recupère l'extension
        let idxDot = files[0]?.name.lastIndexOf(".") + 1;
        let extFile = files[0]?.name.substr(idxDot, files[0].name.length).toLowerCase();
        let size = files[0]?.size/1024/1024 //La taille en Mbit
        console.log('Size-------------- ',size)
        if(files.length!=0){
          if (size <= 5 && (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="pdf" || extFile=="doc" || extFile=="docx")){
            this.model.accord_siege = files[0];
            this.filename = files[0].name
          }else{
            alert("Seul les fichiers jpg/jpeg/png/pdf/doc/docx et de taille inférieur à 5Mb sont acceptés!");
          }
        }
      },
      async controleValidation(){
        this.textfieldRules = [v => !!v || 'Champ obligatoire']
        this.submitForm()
      },
      submitForm () {
        let validation = this.$refs.form.validate()
        this.loading = true;
    
        console.log('Données formulaire +++++',{...this.model,commune:[this.commune],departement:[this.departement],region:[this.region],beneficiaire:[this.beneficiaire],projet:[this.projet]})

        validation && this.$msasApi.post('/enquettes',{...this.model,commune:[this.commune],departement:[this.departement],region:[this.region],beneficiaire:[this.beneficiaire],projet:[this.projet]})
          .then((res) => {           
            console.log('Donées reçus ++++++: ',res.data)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
            this.$router.push('/enquetes');
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
        }); 
      },
      submitLigne () {
        this.countrow_activite += 1;
        this.intitule_activites.push(this.intitule_activite0)
        this.description_activites.push(this.description_activite0)
        this.nombre_benef_hommes.push(this.nombre_benef_homme0)
        this.nombre_benef_femmes.push(this.nombre_benef_femmes0)
        this.type_materiel_utilises.push(this.type_materiel_utilises0)

        this.LigneActivites.push({
          id:this.countrow_activite,
          intitule_activites:this.intitule_activite0,
          description_activites:this.description_activite0,
          nombre_benef_hommes:this.nombre_benef_homme0,
          nombre_benef_femmes:this.nombre_benef_femme0,
          type_materiel_utilises:this.type_materiel_utilise0,
        })
        this.resetActivite()
        console.log('Donées LigneActivites ++++++: ',this.LigneActivites)
      },
      deleteFind: function(index) {
        console.log('Index---- ',index);
        console.log('LigneActivites---- ',this.LigneActivites);
        this.LigneActivites.splice(index,1);
        this.intitule_activites.splice(index,1);
        this.nombre_benef_hommes.splice(index,1);
        this.nombre_benef_femmes.splice(index,1);
        this.type_materiel_utilises.splice(index,1);
      },
      submitLigneContrainte () {
        this.countrow_contrainte += 1;
        this.difficulte_rencontres.push(this.difficulte_rencontre0)
        this.solution_trouves.push(this.solution_trouve0)
        this.suivie_necessaires.push(this.suivie_necessaire0)

        this.LigneContraintes.push({
          id:this.countrow_contrainte,
          difficulte_rencontres:this.difficulte_rencontre0,
          solution_trouves:this.solution_trouve0,
          suivie_necessaires:this.suivie_necessaire0,
          
        })
        this.resetContrainte()
        console.log('Donées LigneContraintes ++++++: ',this.LigneContraintes)
      },
      deleteFindContrainte: function(index) {
        console.log('Index---- ',index);
        console.log('LigneContraintes---- ',this.LigneContraintes);
        this.LigneContraintes.splice(index,1);
        this.difficulte_rencontres.splice(index,1);
        this.solution_trouves.splice(index,1);
        this.suivie_necessaires.splice(index,1);
      },
      deleteFindFichier: function(index) {
        console.log('Index---- ',index);
        console.log('LigneActivites---- ',this.fichiers);
        this.fichiers.splice(index,1);
        this.libelle_fichiers.splice(index,1);
        this.inputfichiers.splice(index,1);

      },
      submitLigneFichier () {
        this.countrow_fichier += 1;
        this.fichiers.push({id:this.countrow_fichier,libelle_fichier:this.libelle_fichiers[this.countrow_fichier],input_fichier:this.inputfichiers[this.countrow_fichier]})
        console.log('Donées fichier row ++++++: ',this.fichiers)
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
      resetActivite () {
        this.intitule_activite0 = ''
        this.description_activite0 = ''
        this.nombre_benef_homme0 = ''
        this.nombre_benef_femme0 = ''
        this.type_materiel_utilise0 = ''
      },
      resetContrainte () {
        this.difficulte_rencontre0 = ''
        this.solution_trouve0 = ''
        this.suivie_necessaire0 = ''
      },
      async changeRegion(value) {
        this.region=value.id
        this.departement= null
        this.commune = null
        this.beneficiaire = null
        this.projet = null

        this.listcommunes = []
        this.listbeneficiaires = [] 
        this.listprojets = []

        this.listdepartements = value?.departements 

        //resumé
        this.resume.nom_region = value.nom_region
        
      },
       async changeDepartement(value) {  
        this.departement = value.id    
        this.listbeneficiaires = [] 
        this.listprojets = [] 

        this.listcommunes = value?.communes 

        //resumé
        this.resume.nom_departement = value.nom_departement

      },
      async changeCommune(value) {   
        this.commune=value.id
        this.listprojets = []  
        this.progress=true
          this.$msasApi.$get('/communes/'+value.id)
        .then(async (response) => {
            console.log('Detail commune++++++++++',response.data)
            this.listbeneficiaires = response.data.beneficiaires
        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationenquete)
        //resumé
        this.resume.nom_commune = value.nom_commune
      },

      UpdateBeneficiaire(event,index){
        if((/.+@.+\..+/.test(event.target.value))){
          console.log('Données change ++++++++++++',event.target.value)
          this.getBenefByTerm(event.target.value)
        }
        if(event.target.value.length==9 & (/^[0-9]+$/.test(event.target.value))){
          console.log('Données change ++++++++++++',event.target.value)
          this.getBenefByTerm(event.target.value)
        }
      },
      getBenefByTerm(param){
         this.$msasApi.get('/beneficiaire-by-term/'+param)
          .then(async (response) => {
            console.log('Données reçus++++++++++++',response.data.data)
            this.listbeneficiaires = response?.data?.data         
        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
             this.loadingUsager = false;
        });
      },  
      async changeBeneficiaire(value) {      
        this.beneficiaire = value.id
        value && value.id &&  this.$msasApi.$get('/beneficiaires/'+value.id)
        .then(async (response) => {
            console.log('Detail commune++++++++++',response.data)
            this.listprojets = response.data.projets
        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationenquete)

        //resumé
        this.resume.nom_beneficiaire = value.prenom_beneficiaire+' '+value.nom_beneficiaire
      },
      async changeProjet(value) {      
        this.projet = value.id

        //resumé
        this.resume.reference_projet = value.reference_projet
      },
      async changeSecteur(e) {
        this.selectedSecteur = e
        /*this.selectedDimension = e */ 
        //resumé
        this.resume.nom_secteur = this.listsecteurs.filter(item => (item.id === e)).map((item)=>(item.nom_secteur))[0]     
      },

      async getRegions(){
        this.$msasApi.$get('regions')
        .then(async (response) => { 
          console.log('Données région reçu+++++++++++',response)
          this.listregions=response.data
          }).catch((error) => {
              console.log('Code error ++++++: ', error?.response?.data?.message)
          }).finally(() => {
          console.log('Requette envoyé ')
        });
      },
      async getBeneficiaireByCommune(id_commune){
        this.listbeneficiaires = value?.beneficiaires
      },

      async getProjetByBeneficiaire(id_beneficiaire){
        this.listprojets = value?.projets 
      },
      geolocate() {
        navigator.geolocation.getCurrentPosition((position) => {
          this.model.latitude = position.coords.latitude
          this.model.longitude = position.coords.longitude
          this.marker.position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.panToMarker();
        });
      },

      //sets the position of marker when dragged
      handleMarkerDrag(e) {
        this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      },

      //Moves the map view port to marker
      panToMarker() {
        this.$refs.mapRef.panTo(this.marker.position);
        this.$refs.mapRef.setZoom(18);
      },

      //Moves the marker to click position on the map
      handleMapClick(e) {
        this.model.latitude = e.latLng.lat()
          this.model.longitude = e.latLng.lng()
        this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        console.log(e);
      },
    },
    metaInfo () {
      return {
        items: this.items,
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
  margin: 0px;
  padding: 34px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
.custom-ligne-bloc-2 {
  border: solid 2px #e3ebf3;
  margin: 0px;
  padding: 0px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
</style>
