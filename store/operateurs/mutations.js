export default {
    initlist(state, newlist) {
        state.listtype_militants = newlist
    },
    initheader(state, newlist) {
        state.headertype_militants = newlist
    },
    initdetail(state, newtype_militant) {
        state.detailtype_militant = newtype_militant
    },
    removeItem(state,payload) {
        state.listtype_militants = state.listtype_militants.filter(item => item.id != payload)
    }
}