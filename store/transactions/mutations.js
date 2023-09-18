export default {
    initlist(state, newlist) {
        state.listtransactions = newlist
    },
    initheader(state, newlist) {
        state.headertransactions = newlist
    },
    initheader2(state, newlist) {
        state.headertransactions2 = newlist
    },
    initdetail(state, newtransaction) {
        state.detailtransaction = newtransaction
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
        state.listtransactions = state.listtransactions.filter(item => item.id != payload)
    }
}