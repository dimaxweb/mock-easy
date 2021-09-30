var lodash  = require('lodash');

var generateLoadingData = true;

function getRandomDate(start, end) {
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

    '/sast/scans-statistics': {mockJson: 'sast-statistics', delay: 100, randomizeData: function(req, response) {
            var data = JSON.parse(response);
            return data;
     }},
    '/sast/scans': {mockJson: 'sast-scans', delay: 100, randomizeData: function(req, response) {
            var data = JSON.parse(response);
            lodash.each(data, (scanData) => {
                let scanDates = lodash.get(scanData,'dateAndTime');

                let startDate  = new Date();
                let endDate = new Date();
                endDate.setDate(startDate.getHours() + 1);
                lodash.set(scanDates, 'startedOn', getRandomDate(startDate, endDate));

                let startDateEnded  = endDate;
                let endDateEnded = new Date();
                endDateEnded.setDate(startDate.getHours() + 2);
                lodash.set(scanDates, 'finishedOn', getRandomDate(startDateEnded, endDateEnded));
            });

            return data;
     }},
    '/sast/engineServers': {mockJson: 'sast-engineServers', delay: 100, randomizeData: function(req, response) {
            var data = JSON.parse(response);
            return data;
    }},

    '/sast/engineServersDetails/*': {mockJson: 'sast-engineServer-details', delay: 100, randomizeData: function(req, response) {
            var data = JSON.parse(response);
            return data;
     }},


    '/sast/scans-quque': {mockJson: 'sast-quque', delay: 100, randomizeData: function(req, response) {
            var data = JSON.parse(response);
            return data;
     }}

};
