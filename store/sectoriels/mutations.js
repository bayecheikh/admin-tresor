export default {
    initlist(state, newlist) {
        state.listsectoriels = newlist
    },
    initheader(state, newlist) {
        state.headersectoriels = newlist
    },
    initdetail(state, newsectoriel) {
        state.detailsectoriel = newsectoriel
    },
    inittotalpage(state, newtotalpage) {
        state.totalPage = newtotalpage
    },
    initperpage(state, newtperpage) {
        state.perPage = newtperpage
    },
    initcurrentpage(state, newtperpage) {
        state.currentPage = newtperpage
    },
    initdatasearch(state, newdatasearch) {
        state.dataSearch = newdatasearch
    },
    removeItem(state,payload) {
        console.log('item to delete ++++++++ ',payload)
        state.listsectoriels = state.listsectoriels.filter(item => item.id != payload)
    }
}