export default {
    initlist(state, newlist) {
        state.listparrainages = newlist
    },
    initheader(state, newlist) {
        state.headerparrainages = newlist
    },
    initdetail(state, newparrainage) {
        state.detailparrainage = newparrainage
    },
    removeItem(state,payload) {
        state.listparrainages = state.listparrainages.filter(item => item.id != payload)
    }
}