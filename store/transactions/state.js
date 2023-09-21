export default () => ({
    listtransactions: [],

    headertransactions : [
        { text: 'Réf.', value: 'reference_transaction' },
        { text: 'Prénom bénéficiaire', value: 'prenom_beneficiaire' },
        { text: 'Nom bénéficiaire', value: 'nom_beneficiaire' },
        { text: 'Montant', value: 'montant' }, 
        { text: 'Statut', value: 'status' }, 
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    headertransactions2 : [
        { text: 'Réf.', value: 'reference_transaction' },
        { text: 'Prénom bénéficiaire', value: 'prenom_beneficiaire'},
        { text: 'Nom bénéficiaire', value: 'nom_beneficiaire' },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailtransaction :{},
    //Intialise la pagination
    paginationUtilisateur :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})