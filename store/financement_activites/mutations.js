export default {
    initlist(state, newlist) {
        state.listfinancement_activites = newlist
    },
    initheader(state, newlist) {
        state.headerfinancement_activites = newlist
    },
    initdetail(state, newfinancement_activite) {
        state.detailfinancement_activite = newfinancement_activite
    },
    removeItem(state,payload) {
        state.listfinancement_activites = state.listfinancement_activites.filter(item => item.id != payload)
    }
}