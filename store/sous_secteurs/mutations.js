export default {
    initlist(state, newlist) {
        state.listsous_secteurs = newlist
    },
    initheader(state, newlist) {
        state.headersous_secteurs = newlist
    },
    initdetail(state, newsous_secteur) {
        state.detailsous_secteur = newsous_secteur
    },
    removeItem(state,payload) {
        state.listsous_secteurs = state.listsous_secteurs.filter(item => item.id != payload)
    }
}