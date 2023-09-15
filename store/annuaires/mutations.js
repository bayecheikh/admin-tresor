export default {
    initlist(state, newlist) {
        state.listannuaires = newlist
    },
    initheader(state, newlist) {
        state.headerannuaires = newlist
    },
    initdetail(state, newannuaire) {
        state.detailannuaire = newannuaire
    },
    removeItem(state,payload) {
        state.listannuaires = state.listannuaires.filter(item => item.id != payload)
    }
}