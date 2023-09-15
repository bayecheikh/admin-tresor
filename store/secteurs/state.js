export default () => ({
    listsecteurs: [],

    headersecteurs : [
        {
            text: 'Composantes',
            align: 'start',
            sortable: true,
            value: 'libelle',
        },
        {
            text: 'Secteurs',
            align: 'start',
            sortable: true,
            value: 'sous_secteurs',
        },
        /* { text: 'Sous secteurs', value: 'axes',sortable: false }, */
        /* { text: 'Status', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailsecteur :{}
})