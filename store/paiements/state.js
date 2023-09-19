export default () => ({
    listpaiements: [],

    headerpaiements : [
        {
            text: 'Libelle',
            align: 'start',
            sortable: true,
            value: 'libelle',
        },
        {
            text: 'Slug',
            align: 'start',
            sortable: true,
            value: 'slug',
        },
        /* { text: 'Status', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailpaiement :{}
})