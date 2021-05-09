var lodash  = require('lodash');

var generateLoadingData = true;

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cloneContent(response, times) {
    var data = JSON.parse(response);
    var content = data.content || data;
    var size = content.length - 1;
    data.totalEelements = data.totalElements || 0;
    if (generateLoadingData) {
        for (var i = 0; i < times; i++) {
            var index = getRandomInt(0, size);
            var itemTemplate = content[index];
            var item  = lodash.cloneDeep(itemTemplate);
            data.totalElements++;
            content.push(item);
        }
    }

    return data;
}


module.exports = {

    '/Mercury-O/public/rest/dashboard/hostStates': {mockJson: 'dashboard/dashboard.hostStates', delay: 300, randomizeData: function(req, response) {
            var data = JSON.parse(response);
            return data;
        }},


// Compass
    '/compass/security/public/auth/login': {
        mockJson: 'login',
        methods: {
            'GET': {response: 'login'},
            'POST': {
                response: 'loginPostResponse'

            },
            'DELETE' :{

            },
            'PUT' :{

            }
        }
    }
};
