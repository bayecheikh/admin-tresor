export default {
    initlist(state, newlist) {
        state.listfinancement_sources = newlist
    },
    initheader(state, newlist) {
        state.headerfinancement_sources = newlist
    },
    initdetail(state, newfinancement_source) {
        state.detailfinancement_source = newfinancement_source
    },
    removeItem(state,payload) {
        state.listfinancement_sources = state.listfinancement_sources.filter(item => item.id != payload)
    }
}