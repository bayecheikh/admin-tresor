export default {
    initlist(state, newlist) {
        state.listoperateurs = newlist
    },
    initheader(state, newlist) {
        state.headeroperateurs = newlist
    },
    initdetail(state, newoperateur) {
        state.detailoperateur = newoperateur
    },
    removeItem(state,payload) {
        state.listoperateurs = state.listoperateurs.filter(item => item.id != payload)
    }
}