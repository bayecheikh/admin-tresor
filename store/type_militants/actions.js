export default {
    getList({commit}){
      this.$msasApi.$get('/type_militants')
      .then(async (response) => { 
        console.log('Données reçu+++++++++++',response)
            await commit('initlist', response.data)
          }).catch((error) => {
              console.log('Code error ++++++: ', error?.response?.data?.message)
              this.$toast.error(error?.response?.data?.message).goAway(3000)
          }).finally(() => {
            console.log('Requette envoyé ')
            console.log('Requette envoyé ')
            console.log('Requette envoyé ')
          });
    },
    async getDetail({commit},payload){
      console.log('Données detail reçu +++++++++++',payload)
      await commit('initdetail', payload)
    },
    async deletetype_militant({commit,dispatch},payload){
      await commit('removeItem',payload) 
      
  }
}