export default {
    initlist(state, newlist) {
        state.listpaiements = newlist
    },
    initheader(state, newlist) {
        state.headerpaiements = newlist
    },
    initdetail(state, newpaiement) {
        state.detailpaiement = newpaiement
    },
    removeItem(state,payload) {
        state.listpaiements = state.listpaiements.filter(item => item.id != payload)
    }
}