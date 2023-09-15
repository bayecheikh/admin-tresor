export default () => ({
    listligneinvestissements: [],

    headerligneinvestissements : [
        { text: 'Structure', value: 'investissement'},
        { text: 'Pilier', value: 'pilier'},
        { text: 'Axe', value: 'axe'},
        { text: 'Montant Bien Service Prevus', value: 'montantBienServicePrevus'},
        { text: 'Montant Bien Service Mobilises', value: 'montantBienServiceMobilises'},
        { text: 'Montant Bien Service Executes', value: 'montantBienServiceExecutes'},
        { text: 'Montant Investissement Prevus', value: 'montantInvestissementPrevus'},
        { text: 'Montant Investissement Mobilises', value: 'montantInvestissementMobilises'},
        { text: 'Montant Investissement Executes', value: 'montantInvestissementExecutes'},
        /* { text: 'Actions', value: 'actions', sortable: false }, */
    ],
    headerligneinvestissementavances : [
        { text: 'Structure', value: 'investissement.structure'},
        { text: 'Pilier', value: 'pilier'},
        { text: 'Axe', value: 'axe'},
        { text: 'Montant Bien Service Prevus', value: 'montantBienServicePrevus'},
        { text: 'Montant Bien Service Mobilises', value: 'montantBienServiceMobilises'},
        { text: 'Montant Bien Service Executes', value: 'montantBienServiceExecutes'},
        { text: 'Montant Investissement Prevus', value: 'montantInvestissementPrevus'},
        { text: 'Montant Investissement Mobilises', value: 'montantInvestissementMobilises'},
        { text: 'Montant Investissement Executes', value: 'montantInvestissementExecutes'},
    ],
    detailligneinvestissement :{},
    //Intialise la pagination
    paginationligneinvestissement :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})