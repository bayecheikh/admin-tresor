export default () => ({
    listprojets: [],

    headerprojets : [
        { text: 'REF', value: 'reference_projet' },
        { text: 'Nom', value: 'titre_projet' }, 
        { text: 'Bénéficiaire', value: 'beneficiaire' },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    headerprojets2 : [
        { text: 'REF', value: 'reference_projet' },
        { text: 'Nom', value: 'titre_projet' }, 
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailprojet :{},
    //Intialise la pagination
    paginationUtilisateur :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})