export default () => ({
    listdonnee_bases: [],

    headerdonnee_bases : [
        /* {
            text: 'Username',
            align: 'start',
            sortable: true,
            value: 'donnee_basename',
        }, */
        /* { text: 'Prénom', value: 'firstname' },
        { text: 'Nom', value: 'lastname' }, */
        { text: 'Année', value: 'annee' },
        /* { text: 'Telephone', value: 'telephone' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detaildonnee_base :{},
    //Intialise la pagination
    paginationUtilisateur :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})