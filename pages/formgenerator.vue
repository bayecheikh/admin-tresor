<template>
  <div>
    <v-form v-model="valid">
      <v-jsf v-model="model" :schema="schema"/>
    </v-form>
    Model : {{model}}
  </div>
  
</template>

<script>

export default {
  data: () => ({
    valid: false,
    model: {
      "objectSection2": {},
      "objectSection1": {},
      "stringsArrayEnum": [],
      "stringArrayOneOf": [],
      "reponse2": "",
      "stringProp3":""
    },
    schema: {
      "type": "object",
      "properties": {
        "questionsEnvironnementales": {
          "title": "QUESTIONS ENVIRONNEMENTALES",
          "description": "",
          "type": "object",
          "properties": {
            "reponse1_1": {
              "type": "string",
              "title": "1) Quelle est la distance du site d'exploitation par rapport aux installations humaines ?",
              "description": "",
              "enum": [
                "0 - 50",
                "51 - 100",
                "101 - 250",
                "250 - 500",
              ],
              "x-display": "radio",
              "x-class":"mt-10"
            },
            "reponse2_1": {
              "type": "string",
              "title": "2) Le projet nécessite t-il une perte d'espèces végétales (défrichement des terres ou abattage d'arbres)",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse2_2": {
              "type": "string",
              "title": "Risque (pertes d'espèces)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse2_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse2_3": {
              "type": "string",
              "title": "Justification des risque (pertes d'espèces)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse2_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse3_1": {
              "type": "string",
              "title": "3) Le projet à financer impliquera-t-il un risque de pollution de l'eau, du sol, de la qualité de l'air ou de l'ambiance sonore ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse3_2": {
              "type": "string",
              "title": "Risque (pollution)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse3_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse3_3": {
              "type": "string",
              "title": "Justification des risque (pollution)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse3_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse4_1": {
              "type": "string",
              "title": "4) La consommation importante d'eau ou l'élimination des effluents est-elle susceptible d'avoir un impact significatif sur les autres utilisateurs de cet approvisionnement ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse4_2": {
              "type": "string",
              "title": "Risque (effluents)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse4_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse4_3": {
              "type": "string",
              "title": "Justification des risque (effluents)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse4_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse5_1": {
              "type": "string",
              "title": "5) La consommation importante d'eau ou l'élimination des effluents est-elle susceptible d'avoir un impact significatif sur les autres utilisateurs de cet approvisionnement ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse5_2": {
              "type": "string",
              "title": "Risque (effluents)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse5_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse5_3": {
              "type": "string",
              "title": "Justification des risque (effluents)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse5_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse6_1": {
              "type": "string",
              "title": "6) Le projet peut-il occasionner des variations du niveau de la nappe d'eau souterraine et/ou une réduction possible du débit de l'eau ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse6_2": {
              "type": "string",
              "title": "Risque (variation)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse6_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse6_3": {
              "type": "string",
              "title": "Justification des risque (variation)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse6_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse7_1": {
              "type": "string",
              "title": "7) La mise en oeuvre du projet nécessite-t-elle l'utilisation de produits dangereux ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse7_2": {
              "type": "array",
              "title": "Risque (produits dangereux)",
              "description": "",
              "items": {
                "type": "string",
                "enum": [
                  "Insecticides",
                  "Herbicides",
                  "Fongicides",
                  "Médicaments et produits à usage vétérinaire",
                  "Désinfectants de batiments et matériels d'élevage",
                ]
              },          
              //"minItems": 1,
              "x-display": "checkbox",
              "x-if": "parent.value.reponse7_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse7_3": {
              "type": "string",
              "title": "Risque (produits dangereux)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse7_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse7_4": {
              "type": "string",
              "title": "Justification des risque (produits dangereux)",
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
              "title": "8) Un usage intensif de pesticides/herbicides est-il nécessaire ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse8_2": {
              "type": "string",
              "title": "Risque (usage intensif)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse8_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse8_3": {
              "type": "string",
              "title": "Justification des risque (usage intensif)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse8_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse9_1": {
              "type": "string",
              "title": "9) Le projet risque t-il de générer des déchets solides et liquides ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },           
            "reponse9_2": {
              "type": "string",
              "title": "Recommander un plan d'action pour leur collecte et élimination avec des équipements appopriés.",
              "x-display": "textarea",
              "x-if": "parent.value.reponse9_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse9_3": {
              "type": "string",
              "title": "Risque (déchets solides et liquides)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse9_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse9_4": {
              "type": "string",
              "title": "Justification (déchets solides et liquides)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse9_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse10_1": {
              "type": "string",
              "title": "10) Les déchets sont-ils recyclés ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse11_1": {
              "type": "string",
              "title": "11) Le projet risque t-il de générer des déchets biomédicaux ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },           
            "reponse11_2": {
              "type": "string",
              "title": "Décrire les mesures prévues pour leur gestion et élimination ?",
              "x-display": "textarea",
              "x-if": "parent.value.reponse11_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse11_3": {
              "type": "string",
              "title": "Risque (déchets biomédicaux)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse11_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse11_4": {
              "type": "string",
              "title": "Justification (déchets biomédicaux)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse11_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse12_1": {
              "type": "string",
              "title": "12) Quelle est la source d'énergie/fluide prévue dans la formation du projet ?",
              "description": "",
              "enum": [
                "Courant électrique",
                "Energie solaire",
                "Energie éolienne",
                "Carburant"
              ],
              "x-display": "radio"
            },
          },
          "x-style": "border:solid 1px; border-radius:3px; margin:10px",
          "x-class":"pl-10 pt-10 pb-10 pr-10"
        },
        "questionsSociales": {
          "title": "QUESTIONS SOCIALES",
          "description": "",
          "type": "object",
          "properties": {
            "reponse1_1": {
              "type": "string",
              "title": "1) Est-ce que le projet déclenchera la perte temporaire ou permanente de cultures, terres agricoles, pâturage, arbres fruitiers, équipement ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse1_2": {
              "type": "string",
              "title": "Risque (perte de cultures)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse1_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse1_3": {
              "type": "string",
              "title": "Justification des risque (perte de cultures)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse1_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse2_1": {
              "type": "string",
              "title": "2) La formulation du projet intègre-t-elle la mise à disposition d'EPI pour le personnel ou les exploitants ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse2_2": {
              "type": "array",
              "title": "Lesquelles? (EPI)",
              "description": "",
              "items": {
                "type": "string",
                "enum": [
                  "Bacs à ordures",
                  "Toilettes",
                  "Vestiaire",
                  "Lavoirs"
                ]
              },          
              //"minItems": 1,
              "x-display": "checkbox",
              "x-if": "parent.value.reponse2_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse2_3": {
              "type": "string",
              "title": "Risque (MAD EPI)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse2_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse2_4": {
              "type": "string",
              "title": "Justification des risque (MAD EPI)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse2_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse3_1": {
              "type": "string",
              "title": "3) Le projet propose-t-il des mesures de gestion ou d'amélioration de l'hygiène individuelle et collective ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse3_2": {
              "type": "array",
              "title": "Lesquelles? (Mesures de gestion)",
              "description": "",
              "items": {
                "type": "string",
                "enum": [
                  "Bacs à ordures",
                  "Toilettes",
                  "Vestiaire",
                  "Lavoirs"
                ]
              },          
              //"minItems": 1,
              "x-display": "checkbox",
              "x-if": "parent.value.reponse3_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse3_3": {
              "type": "string",
              "title": "Risque (mesures de gestion)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse3_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse3_4": {
              "type": "string",
              "title": "Justification des risque (mesures de gestion)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse3_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse4_1": {
              "type": "string",
              "title": "4) Les populations expriment-elles actuellement des préoccupations ou plaintes concernant le projet ou l'un des investisseurs/contractans proposés ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse4_2": {
              "type": "string",
              "title": "Risque (préocupations)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse4_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse4_3": {
              "type": "string",
              "title": "Justification des risque (préocupations)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse4_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            },
            "reponse5_1": {
              "type": "string",
              "title": "5) Y a-t-il un risque que le projet ne soit pas construit/exploité conformément aux exigences fondamentales des conventions de l'OIT/code du travail ?",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse5_2": {
              "type": "string",
              "title": "Risque (construit/exploité)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse5_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse5_3": {
              "type": "string",
              "title": "Justification des risque (construit/exploité)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse5_1  == 'OUI'",
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
  }),
}
</script>

<style scoped>

</style>