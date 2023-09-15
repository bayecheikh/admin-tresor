import state from "./state";

export default {
    async getList({commit},payload){
       await commit('initlist', payload)        
    },
    async getDetail({commit},payload){
        await commit('initdetail', payload)
    },
    async deleteparrainage({commit,dispatch,state},payload){
        await commit('removeItem',payload)     
    }
}