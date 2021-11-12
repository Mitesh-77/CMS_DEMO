module.exports = {

    selectOption: function (status, options) {

        return options.fn(this).replace(new RegExp('value=\"' + status + '\"'), '$&selected="selected"');
    },

    isEmpty: function (obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    },

    ifCond: function (v1, v2, v3) {
        if (v1 === v2) {
            return v3
        } else {
            false
        }

    }


};