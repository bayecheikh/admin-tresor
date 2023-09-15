export default () => ({
    listannuaires: [],

    headerannuaires : [
        { text: 'Prenom', value: 'prenom',sortable: true },
        { text: 'Nom', value: 'nom',sortable: true },
        { text: 'Type de militant', value: 'type_militant',sortable: true },
        
        { text: 'Téléphone', value: 'telephone',sortable: true},
        { text: 'Région', value: 'region',sortable: true },
        { text: 'Département', value: 'departement',sortable: true},
        { text: 'Commune', value: 'commune',sortable: true},
        
        { text: 'Actions', value: 'actions', sortable: false}
    ],
    detailannuaire :{}
})