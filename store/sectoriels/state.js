export default () => ({
    listsectoriels: [],

    headersectoriels : [
        /* {
            text: 'Username',
            align: 'start',
            sortable: true,
            value: 'sectorielname',
        }, */
        /* { text: 'Prénom', value: 'firstname' },
        { text: 'Nom', value: 'lastname' }, */
        { text: 'Année', value: 'annee' },
        { text: 'Trimestre', value: 'trimestre' },
        { text: 'Secteur', value: 'secteur' },
        { text: 'Composante', value: 'composante' },
        /* { text: 'Telephone', value: 'telephone' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailsectoriel :{},
    //Intialise la pagination
    paginationUtilisateur :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})