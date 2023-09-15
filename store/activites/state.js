export default () => ({
    listactivites: [],

    headeractivites : [
        {
            text: 'Activités',
            align: 'start',
            sortable: true,
            value: 'libelle',
        },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailactivite :{}
})