<template>
  <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
    <v-stepper
      v-model="step"
      vertical
    >
      <!-- Step:1 Identification de la zone -->
      <!-- Step:1 Identification de la zone -->
      <v-stepper-step
        :complete="step > 1"
        step="1"
        editable
      >
        Initialisation
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
          <v-row>
            <v-col lg="6" sm="12" md="6">
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
                    v-model="model.date_enquette"
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
                  v-model="model.date_enquette"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Référence projet"
            outlined dense
            v-model="modelProjet.reference_projet"
            :rules="rules.textfieldRules"
            :readonly="hasProject==true"
          ></v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12">
            <v-text-field
              label="Titre du projet"
              outlined dense
              v-model="modelProjet.titre_projet"
              :rules="rules.textfieldRules"
              :readonly="hasProject==true"
            ></v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Prénom bénéficiaire"
            outlined dense
            v-model="modelBeneficiaire.prenom_beneficiaire"
            :rules="rules.textfieldRules"
            :readonly="hasProject==true"
          ></v-text-field>
            </v-col>
            <v-col md="6" lg="6" sm="12">
              <v-text-field
                label="Nom bénéficiaire"
                outlined dense
                v-model="modelBeneficiaire.nom_beneficiaire"
                :rules="rules.textfieldRules"
                :readonly="hasProject==true"
              ></v-text-field>
            </v-col>
            <v-col md="6" lg="6" sm="12">
              <v-text-field
                label="Téléphone du bénéficiaire"
                outlined dense
                v-model="modelBeneficiaire.telephone_beneficiaire"
                :rules="rules.textfieldRules"
                :readonly="hasProject==true"
              ></v-text-field>
            </v-col>
            <v-col md="6" lg="6" sm="12">
              <v-text-field
                label="Numéro CNI du bénéficiaire"
                outlined dense
                v-model="modelBeneficiaire.cni_beneficiaire"
                :rules="rules.textfieldRules"
                :readonly="hasProject==true"
              ></v-text-field>
            </v-col>
            <v-col md="6" lg="6" sm="12">
            <v-text-field
              label="Adresse du bénéficiaire"
              outlined dense
              v-model="modelBeneficiaire.adresse_beneficiaire"
              :rules="rules.adresse_beneficiaireRules"
              :readonly="hasProject==true"
            ></v-text-field>
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
        Questionnaire
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
          <v-row>
            <v-col md="12" lg="12" sm="12">
              <v-form v-model="valid">
                <v-jsf v-model="model" :schema="schema"/>
              </v-form>
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
      
      <!-- Step:3 Section -->
      <v-stepper-step
        :complete="step > 3"
        step="3"
        editable
      >
        Expert E&S
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
          <v-row>
            <v-col md="12" lg="12" sm="12">
              <v-form v-model="valid2">
                <v-jsf v-model="model2" :schema="schema2"/>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
        <v-btn
          color="primary"
           @click="submitForm"
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
        if($nuxt._route.params.id ) {
          this.modelBeneficiaire = this.detailProjet?.beneficiaire[0]
          this.modelProjet = this.detailProjet
          this.hasProject = true
        }else{
          this.hasProject = false
        }
      },
      computed: {
        ...mapGetters({
        listregions: 'regions/listregions' ,
        detailProjet: 'projets/detailprojet'   
      })},
      data: () => ({
  
        hasProject : false,
        modelBeneficiaire: {
          cni_beneficiaire:'',
          nom_beneficiaire:'',
          prenom_beneficiaire:'',
          adresse_beneficiaire:'',
          telephone_beneficiaire:''
        },
        modelProjet: {
          titre_projet:'',
          reference_projet:'',
        },
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
  
        listcommunes:[],
        listdepartements:[],
        listregions:[],
        listbeneficiaires:[],
        listprojets:[],   
  
        step: 1,
  
        filename : '',
        loading: false,
  
        valid: true,
        valid2: true,
  
        model: {
          date_enquette:'',
        },
        schema: {
        "type": "object",
        "properties": {
          "caracteristiqueProjet": {
            "title": "CARACTERISATION DU PROJET",
            "description": "",
            "type": "object",
            "properties": {
              "reponse1_1": {
                "type": "string",
                "title": "1) Type de financement et montant ?",
                "description": "",
                "enum": [
                  "Autonomisation",
                  "Entreprise"
                ],
                "x-display": "radio",
                "x-class":"mt-10"
              },
              "reponse2_1": {
                "type": "string",
                "title": "2)	Les principales activités (citez)",
                "x-display": "textarea",
                "x-options": {
                  "evalMethod": "evalExpr",
                },
                "x-props": {
                  "outlined": "outlined",
                },
              },
              "reponse3_1": {
                "type": "string",
                "title": "3) Revenus annuels (pour l’agriculture demandez revenus après campagne)",
                "description": "",
                "enum": [
                  "Moins de 200 000 FCFA",
                  "200 000-350 000 FCFA",
                  "350 000-500 000 FCFA",
                  "+500 000 FCFA "
                ],
                "x-display": "radio"
              },
              "reponse4_1": {
                "type": "string",
                "title": "4) Existence de toilettes fonctionnelles (et /ou vestiaires) séparées Hommes/Femmes ",
                "description": "",
                "enum": [
                  "OUI",
                  "NON",
                  "NA"
                ],
                "x-display": "radio"
              },
              "reponse5_1": {
                "type": "string",
                "title": "5) Quelles sont les mesures prises pour faciliter le travail des femmes enceintes ou qui allaitent au sein de l'entreprise (pour les entreprises de transformations de produits halieutiques, sel, produits agricoles, avicoles, lait, services…)?",
                "description": "",
                "enum": [
                  "Aire de repos ",
                  "Salle aménagée",
                  "Horaires réduites",
                  "Autres"
                ],
                "x-display": "checkbox"
              },
              "reponse6": {
                "type": "object",
                "title": "6) Emplois créés et maintenus",
                "properties": {
                  "reponse6_1": {
                    "type": "string",
                    "title": "Homme"
                  },
                  "reponse6_2": {
                    "type": "string",
                    "title": "Femme"
                  },
                  "reponse6_3": {
                    "type": "string",
                    "title": "Personne vivant avec handicap"
                  }
                }
              },
            },
            "x-style": "border:solid 1px; border-radius:3px; margin:10px",
            "x-class":"pl-10 pt-10 pb-10 pr-10"
          },
          "accompagnementFinancierRembousement": {
            "title": "ACCOMPAGNEMENT FINANCIER ET REMBOURSEMENT",
            "description": "",
            "type": "object",
            "properties": {
              
              "reponse7_1": {
                "type": "string",
                "title": "7) Le financement reçu couvre-t-il tous les besoins de mise en œuvre du projet ?",
                "description": "",
                "enum": [
                  "OUI",
                  "NON"
                ],
                "x-display": "radio"
              },
              
              "reponse7_2": {
                "type": "string",
                "title": "Précisez les besoins supplémentaires à couvrir",
                "x-display": "textarea",
                "x-if": "parent.value.reponse7_1  == 'OUI'",
                "x-options": {
                  "evalMethod": "evalExpr",
                },
                "x-props": {
                  "outlined": "outlined",
                },
              },
              "reponse8_1": {
                "type": "string",
                "title": "8) Montant du prêt remboursé à ce jour ?",
                "x-options": {
                  "evalMethod": "evalExpr",
                },
                "x-props": {
                  "outlined": "outlined",
                },
              },
              "reponse9_1": {
                "type": "string",
                "title": "9)	Arrivez-vous à rembourser les crédits à temps ?",
                "description": "",
                "enum": [
                  "OUI",
                  "NON"
                ],
                "x-display": "radio"
              },
              "reponse9_2": {
                "type": "string",
                "title": "Principal blocage",
                "description": "",
                "enum": [
                  "Tension de trésorerie ",
                  "Problème de rentabilité",
                  "Faillite ",
                  "Autres",
                ],
                "x-display": "radio",
                "x-if": "parent.value.reponse9_1  == 'NON'",
                "x-options": {
                  "evalMethod": "evalExpr"
                }
              },
            },
            "x-style": "border:solid 1px; border-radius:3px; margin:10px",
            "x-class":"pl-10 pt-10 pb-10 pr-10"
          },
          "besoinAccompagnementNonFinancier": {
            "title": "BESOIN D'ACCOMPAGNEMENT NON FINANCIER",
            "description": "",
            "type": "object",
            "properties": {
              "reponse10_1": {
                "type": "string",
                "title": "10) Avez-vous reçu une formation offerte par la DER ?",
                "description": "",
                "enum": [
                  "OUI",
                  "NON"
                ],
                "x-display": "radio"
              },
              "reponse10_2": {
                "type": "string",
                "title": "Précisez la formation offerte",
                "x-display": "textarea",
                "x-if": "parent.value.reponse10_1  == 'OUI'",
                "x-options": {
                  "evalMethod": "evalExpr",
                },
                "x-props": {
                  "outlined": "outlined",
                },
              },
              "reponse11_1": {
                "type": "string",
                "title": "11)	Avez vous pratiqué la formation en relation avec votre activité ?",
                "description": "",
                "enum": [
                  "OUI",
                  "NON"
                ],
                "x-display": "radio"
              },
              "reponse11_2": {
                "type": "string",
                "title": "Justification(Non pratique de la formation relatif avec votre activité)",
                "x-display": "textarea",
                "x-if": "parent.value.reponse11_1  == 'NON'",
                "x-options": {
                  "evalMethod": "evalExpr",
                },
                "x-props": {
                  "outlined": "outlined",
                },
              },
              "reponse12_1": {
                "type": "string",
                "title": "12)	Dans quel(s) autre(s) domaine(s) souhaiteriez-vous être formés ou accompagnés ?",
                "x-display": "textarea",
                "x-options": {
                  "evalMethod": "evalExpr",
                },
                "x-props": {
                  "outlined": "outlined",
                },
              }
            },
            "x-style": "border:solid 1px; border-radius:3px; margin:10px",
            "x-class":"pl-10 pt-10 pb-10 pr-10"
          },
          "contraintes": {
            "title": "CONTRAINTES/FREIN AU DEVELOPPEMENT DES ACTIVITES DU PROJET",
            "description": "",
            "type": "object",
            "properties": {
              "reponse13_1": {
                "type": "array",
                "title": "13)	Difficultés d’ordre économique ",
                "description": "",
                "items": {
                  "type": "string",
                  "enum": [
                    "Financement insuffisant",
                    "Insuffisance de la productivité ",
                    "Accès au marché",
                    "Tension de trésorerie",
                    "Transport"
                  ]
                },          
                //"minItems": 1,
                "x-display": "checkbox",
                "x-options": {
                  "evalMethod": "evalExpr"
                }
              },
              "reponse14_1": {
                "type": "array",
                "title": "14)	Barrières d’ordre technique ",
                "description": "",
                "items": {
                  "type": "string",
                  "enum": [
                    "Accès à l’eau",
                    "Pénibilité des tâches",
                    "Equipement défectueux",
                    "Accès à l’innovation technologique",
                    "Autres",
                  ]
                },          
                //"minItems": 1,
                "x-display": "checkbox",
                "x-options": {
                  "evalMethod": "evalExpr"
                }
              },
              "reponse15_1": {
                "type": "array",
                "title": "15)	Barrières socio culturelles",
                "description": "",
                "items": {
                  "type": "string",
                  "enum": [
                    "Charge des tâches domestiques",
                    "Réticence du conjoint",
                    "Faible niveau d’éducation et de formation",
                    "Faible accès à l’information"  
                  ]
                },          
                //"minItems": 1,
                "x-display": "checkbox",
                "x-options": {
                  "evalMethod": "evalExpr"
                }
              },
            },
            "x-style": "border:solid 1px; border-radius:3px; margin:10px",
            "x-class":"pl-10 pt-10 pb-10 pr-10"
          },
          "effets": {
            "title": "EFFETS",
            "description": "",
            "type": "object",
            "properties": {
              "reponse16_1": {
                "type": "string",
                "title": "16)	Amélioration des conditions de travail. Si oui comment (acquisition d’infrastructure, d’équipements…)",
                "description": "",
                "enum": [
                  "OUI",
                  "NON"
                ],
                "x-display": "radio"
              },
              "reponse16_2": {
                "type": "string",
                "title": "Comment ?",
                "x-display": "textarea",
                "x-if": "parent.value.reponse16_1  == 'OUI'",
                "x-options": {
                  "evalMethod": "evalExpr",
                },
                "x-props": {
                  "outlined": "outlined",
                },
              },
              "reponse17_1": {
                "type": "string",
                "title": "17)	Amélioration des conditions de vie. Si oui comment ?",
                "description": "",
                "enum": [
                  "OUI",
                  "NON"
                ],
                "x-display": "radio"
              },
              "reponse17_2": {
                "type": "string",
                "title": "Comment ?",
                "x-display": "textarea",
                "x-if": "parent.value.reponse16_1  == 'OUI'",
                "x-options": {
                  "evalMethod": "evalExpr",
                },
                "x-props": {
                  "outlined": "outlined",
                },
              },
              "reponse18_1": {
                "type": "string",
                "title": "18) Amélioration de la productivité",
                "description": "",
                "enum": [
                  "OUI",
                  "NON"
                ],
                "x-display": "radio"
              },
              "reponse19_1": {
                "type": "string",
                "title": "19)	Effets d’entrainement(le financement vous a-t-il permis de développer d’autres activités connexes ?",
                "description": "",
                "enum": [
                  "OUI",
                  "NON"
                ],
                "x-display": "radio"
              },
              "reponse19_2": {
                "type": "string",
                "title": "Lesquelles ?",
                "x-display": "textarea",
                "x-if": "parent.value.reponse16_1  == 'OUI'",
                "x-options": {
                  "evalMethod": "evalExpr",
                },
                "x-props": {
                  "outlined": "outlined",
                },
              },
            },
            "x-style": "border:solid 1px; border-radius:3px; margin:10px",
            "x-class":"pl-10 pt-10 pb-10 pr-10"
          }
        }
        },
        schema2: {
        "type": "object",
        "properties": {
          "questionsEnvironnementales": {
            "title": "RESERVEE A L'EXPERT SECTORIEL",
            "description": "",
            "type": "object",
            "properties": {
              "observation1": {
                "type": "string",
                "title": "Evaluation 1",
                "description": "",
                "enum": [
                  "Pas de travail environnemental",
                  "Simples mesures de mitigation",
                  "Etude d’Impact Environnemental",
                ],
                "x-display": "radio",
                "x-class":"mt-10"
              },
              "observation2": {
                "type": "string",
                "title": "Evaluation 2",
                "description": "",
                "enum": [
                  "Risque Élevé",
                  "Risque Moyen",
                  "Risque Faible"
                ],
                "x-display": "radio"
              },
              "resumeEvaluation": {
                "type": "string",
                "title": "Résumé de l'évaluation",
                "x-display": "textarea",
                "x-options": {
                  "evalMethod": "evalExpr",
                },
                "x-props": {
                  "outlined": "outlined",
                },
              },
              "recommandations": {
                "type": "string",
                "title": "Recommandations",
                "x-display": "textarea",
                "x-options": {
                  "evalMethod": "evalExpr",
                },
                "x-props": {
                  "outlined": "outlined",
                },
              }
            },
            "x-style": "border:solid 1px; border-radius:3px; margin:10px",
            "x-class":"pl-10 pt-10 pb-10 pr-10"
          }
        }
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
      
          console.log('Données formulaire +++++',{...this.model,...this.modelBeneficiaire,...this.modelProjet,questionnaire:JSON.stringify([this.schema,this.schema2]),commune:[this.commune],departement:[this.departement],region:[this.region],beneficiaire:[this.beneficiaire],projet:[this.projet]})
  
          let formData = new FormData();

          formData.append("reference_projet", this.modelProjet.reference_projet);
          formData.append("date_enquette", this.model.date_enquette);
          formData.append("titre_projet", this.modelProjet.titre_projet);
          formData.append("prenom_beneficiaire", this.modelBeneficiaire.prenom_beneficiaire);
          formData.append("nom_beneficiaire", this.modelBeneficiaire.nom_beneficiaire);
          formData.append("telephone_beneficiaire", this.modelBeneficiaire.telephone_beneficiaire);
          formData.append("cni_beneficiaire", this.modelBeneficiaire.cni_beneficiaire);
          formData.append("adresse_beneficiaire", this.modelBeneficiaire.adresse_beneficiaire);
          formData.append("region", this.resume.nom_region);
          formData.append("departement", this.resume.nom_departement);
          formData.append("commune", this.resume.nom_commune);
          formData.append("questionnaire", JSON.stringify([this.schema,this.schema2]));
          
          validation && this.$msasFileApi.post('/analysegenres',formData)
            .then((res) => {           
              console.log('Donées reçus ++++++: ',res.data)
              this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
              this.$router.push('/analysegenres');
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
  