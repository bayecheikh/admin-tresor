export default {
    initlist(state, newlist) {
        state.listsecteurs = newlist
    },
    initheader(state, newlist) {
        state.headersecteurs = newlist
    },
    initdetail(state, newsecteur) {
        state.detailsecteur = newsecteur
    },
    removeItem(state,payload) {
        state.listsecteurs = state.listsecteurs.filter(item => item.id != payload)
    }
}