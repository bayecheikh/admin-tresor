export default () => ({
    listannuaires: [],

    headerannuaires : [
        { text: 'Prenom', value: 'prenom',sortable: true },
        { text: 'Nom', value: 'nom',sortable: true },
        { text: 'CNI', value: 'cni',sortable: true },
        
        { text: 'Téléphone', value: 'telephone',sortable: true},
        { text: 'Mode de paiement', value: 'mode_paiement',sortable: true },
        { text: 'Montant paiement', value: 'montant_paiement',sortable: true}
    ],
    detailannuaire :{}
})