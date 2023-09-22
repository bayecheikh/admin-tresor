export default () => ({
    listannuaires: [],

    headerannuaires : [
        { text: 'Prénom(s)', value: 'prenom_beneficiaire',sortable: true },
        { text: 'Nom', value: 'nom',sortable: true },
        { text: 'CNI', value: 'cni',sortable: true },
        
        { text: 'Numéro de téléphone', value: 'telephone',sortable: true},
        { text: 'Libellé de paiement', value: 'libelle_paiement',sortable: true },
        { text: 'Opérateur de paiement', value: 'libelle_paiement',sortable: true },
        { text: 'Montant du paiement', value: 'montant_paiement',sortable: true}
    ],
    detailannuaire :{}
})