export default {
    initlist(state, newlist) {
        state.listanalysegenres = newlist
    },
    initheader(state, newlist) {
        state.headeranalysegenres = newlist
    },
    initheaderavance(state, newlist) {
        state.headeranalysegenreavances = newlist
    },
    initdetail(state, newanalysegenre) {
        state.detailanalysegenre = newanalysegenre
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
        state.listanalysegenres = state.listanalysegenres.filter(item => item.id != payload)
    }
}