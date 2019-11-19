const store = {
    state: {
        clientId: '',
        includeSubs: false,
        screenAll: 0
    },
    mutations: {
        SET_CLIENTID: (state, payload) => {
            state.clientId = payload;
        },
        SET_INCLUDESUBS: (state, payload) => {
            state.includeSubs = payload;
        },
        SET_SCREENAll: (state, payload) => {
            state.screenAll = payload;
        }
    },
    getter: {
        screenAllFun: state => state.screenAll
    }

};

export default store
