export default () => ({
    listfinancement_activites: [],

    headerfinancement_activites : [
        {
            text: 'Activités',
            align: 'start',
            sortable: true,
            value: 'libelle_activite',
        },
        {
            text: 'Montant',
            align: 'start',
            sortable: true,
            value: 'montant',
        },
        {
            text: 'Année',
            align: 'start',
            sortable: true,
            value: 'annee',
        },
        {
            text: 'Trimestre',
            align: 'start',
            sortable: true,
            value: 'trimestre',
        },
        {
            text: 'Activité',
            align: 'start',
            sortable: true,
            value: 'activites',
            align: ' d-none'
        },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailfinancement_activite :{}
})