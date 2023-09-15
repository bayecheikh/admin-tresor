export default {
    initlist(state, newlist) {
        state.listenquetes = newlist
    },
    initheader(state, newlist) {
        state.headerenquetes = newlist
    },
    initheaderavance(state, newlist) {
        state.headerenqueteavances = newlist
    },
    initdetail(state, newenquete) {
        state.detailenquete = newenquete
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
        state.listenquetes = state.listenquetes.filter(item => item.id != payload)
    }
}