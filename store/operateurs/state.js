export default () => ({
    listoperateurs: [],

    headeroperateurs : [
        {
            text: 'Libellé',
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
    detailoperateur :{}
})