export default {
    initlist(state, newlist) {
        state.listdonnee_bases = newlist
    },
    initheader(state, newlist) {
        state.headerdonnee_bases = newlist
    },
    initdetail(state, newdonnee_base) {
        state.detaildonnee_base = newdonnee_base
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
        state.listdonnee_bases = state.listdonnee_bases.filter(item => item.id != payload)
    }
}