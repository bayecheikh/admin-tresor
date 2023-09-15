export default () => ({
    listbailleurs: [],

    headerbailleurs : [
        {
            text: 'Bailleur',
            align: 'start',
            sortable: true,
            value: 'libelle',
        },
        {
            text: 'Financement source',
            align: 'start',
            sortable: true,
            value: 'financement_sources',
            align: ' d-none'
        },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailbailleur :{}
})