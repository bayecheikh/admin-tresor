export default {
    initlist(state, newlist) {
        state.listresultat_attendus = newlist
    },
    initheader(state, newlist) {
        state.headerresultat_attendus = newlist
    },
    initdetail(state, newresultat_attendu) {
        state.detailresultat_attendu = newresultat_attendu
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
        state.listresultat_attendus = state.listresultat_attendus.filter(item => item.id != payload)
    }
}