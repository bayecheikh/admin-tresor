export default {
    initlist(state, newlist) {
        state.listanalyserisques = newlist
    },
    initheader(state, newlist) {
        state.headeranalyserisques = newlist
    },
    initheaderavance(state, newlist) {
        state.headeranalyserisqueavances = newlist
    },
    initdetail(state, newanalyserisque) {
        state.detailanalyserisque = newanalyserisque
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
        state.listanalyserisques = state.listanalyserisques.filter(item => item.id != payload)
    }
}