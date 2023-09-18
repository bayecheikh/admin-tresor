export default () => ({
    listtransactions: [],

    headertransactions : [
        { text: 'Réf.', value: 'reference_transaction' },
        { text: 'Nom', value: 'titre_transaction' }, 
        { text: 'Bénéficiaire', value: 'beneficiaire' },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    headertransactions2 : [
        { text: 'Réf.', value: 'reference_transaction' },
        { text: 'Nom', value: 'titre_transaction' }, 
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