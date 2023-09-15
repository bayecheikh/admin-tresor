export default () => ({
    listsous_secteurs: [],

    headersous_secteurs : [
        {
            text: 'Libellé',
            align: 'start',
            sortable: true,
            value: 'libelle',
        },
        /* { text: 'Status', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailsous_secteur :{}
})