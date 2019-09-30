const remx = require('remx');

const state = remx.state({
    user: null,
});

const setters = remx.setters({
    setUser(user) {
        state.user = user;
    },
    clearUser() {
        state.user = null;
    },  
});

const getters = remx.getters({
    getUser() {
        return state.user;
    },
});


module.exports = {
    setters,
    getters,
}