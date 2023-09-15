export default {
    initlist(state, newlist) {
        state.listbeneficiaires = newlist
    },
    initheader(state, newlist) {
        state.headerbeneficiaires = newlist
    },
    initdetail(state, newbeneficiaire) {
        state.detailbeneficiaire = newbeneficiaire
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
        state.listbeneficiaires = state.listbeneficiaires.filter(item => item.id != payload)
    }
}