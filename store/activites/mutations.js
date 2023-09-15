export default {
    initlist(state, newlist) {
        state.listactivites = newlist
    },
    initheader(state, newlist) {
        state.headeractivites = newlist
    },
    initdetail(state, newactivite) {
        state.detailactivite = newactivite
    },
    removeItem(state,payload) {
        state.listactivites = state.listactivites.filter(item => item.id != payload)
    }
}