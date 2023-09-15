export default () => ({
    listbeneficiaires: [],

    headerbeneficiaires : [
        /* {
            text: 'Username',
            align: 'start',
            sortable: true,
            value: 'username',
        }, */
        { text: 'Prénom', value: 'prenom_beneficiaire' },
        { text: 'Nom', value: 'nom_beneficiaire' }, 
        { text: 'Numéro CNI', value: 'numero_cin' },
        { text: 'Téléphone', value: 'telephone_beneficiaire' },
        { text: 'Adresse', value: 'adresse_beneficiaire' },
        /* { text: 'Telephone', value: 'telephone' }, */
        { text: 'Commune', value: 'commune' },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailbeneficiaire :{},
    //Intialise la pagination
    paginationUtilisateur :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})