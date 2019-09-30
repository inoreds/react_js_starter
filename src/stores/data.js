const remx = require('remx');

const state = remx.state({

});

const setters = remx.setters({
    setReloadTable(reload_table) {
        state.reload_table = reload_table
    },
});

const getters = remx.getters({
    getReloadTable(){
        return state.reload_table;
    },
});


module.exports = {
    setters,
    getters,
}