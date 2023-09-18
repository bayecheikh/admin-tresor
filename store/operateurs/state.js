export default () => ({
    listtype_militants: [],

    headertype_militants : [
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
    detailtype_militant :{}
})