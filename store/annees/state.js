export default () => ({
    listannees: [],

    headerannees : [
        {
            text: 'Année',
            align: 'start',
            sortable: true,
            value: 'libelle',
        },
        { text: 'Types', value: 'type_annees',sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailannee :{}
})