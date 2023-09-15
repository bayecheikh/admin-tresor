export default () => ({
    listfinancement_sources: [],

    headerfinancement_sources : [
        {
            text: 'Sources',
            align: 'start',
            sortable: true,
            value: 'libelle_source',
        },
        {
            text: 'Composantes',
            align: 'start',
            sortable: true,
            value: 'libelle_secteur',
        },
        {
            text: 'Montant',
            align: 'start',
            sortable: true,
            value: 'montant',
        },
        {
            text: 'Trimestre',
            align: 'start',
            sortable: true,
            value: 'trimestre',
        },
        {
            text: 'Source',
            align: 'start',
            sortable: true,
            value: 'sources',
            align: ' d-none'
        },
        {
            text: 'Composante',
            align: 'start',
            sortable: true,
            value: 'secteurs',
            align: ' d-none'
        },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailfinancement_source :{}
})