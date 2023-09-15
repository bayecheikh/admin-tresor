export default () => ({
    listresultat_attendus: [],

    headerresultat_attendus : [
        /* {
            text: 'Username',
            align: 'start',
            sortable: true,
            value: 'resultat_attenduname',
        }, */
        /* { text: 'Prénom', value: 'firstname' },
        { text: 'Nom', value: 'lastname' }, */
        { text: 'Année', value: 'annee' },
        /* { text: 'Telephone', value: 'telephone' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailresultat_attendu :{},
    //Intialise la pagination
    paginationUtilisateur :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})