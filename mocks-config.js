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
// Compass
    '/compass/security/public/auth/login': {
        mockJson: 'login',
        methods: {
            'GET': {response: 'login'},
            'POST': {
                response: 'login'

            },
            'DELETE' :{

            },
            'PUT' :{

            }
        }
    },

    '/compass/security/public/auth/logout': {mockJson: 'login'},

    // ldap 1 or 2 request for configured or not configured ldap response
    '/Mercury-O/public/rest/subscribedUsers/connectivity/ldap': {mockJson: 'ldap/ldapSettings'},

    '/Mercury-O/public/rest/subscribedUsers/connectivity/ldapAndMode': {mockJson: 'ldap/ldapAndModeConfigured'},

    '/compass/security/public/rolegroup/role': {mockJson: 'ldap/role'},

    '/compass/security/public/rolegroup/map': {mockJson: 'ldap/roleGroupMap'},

    '/compass/security/public/rolegroup/group': {mockJson: 'ldap/groups'},

    // Activity Log
    '/Mercury-O/public/rest/activityLog/getAll?page=([0-9]+)&size=([0-9]+)': {mockJson: 'activityLogs', randomizeData: function(req, response) {
            var data  = cloneContent(response, 200);
            return data;
        }},
    '/Mercury-O/public/rest/activityLog/getAll?fromDate=([0-9]+)&page=([0-9]+)&size=([0-9]+)': {mockJson: 'activityLogs', randomizeData: function(req, response) {
            var data  = cloneContent(response, 200);
            return data;
        }},
    '/Mercury-O/public/rest/activityLog/getAll?fromDate=([0-9]+)&page=([0-9]+)&size=([0-9]+)&toDate=([0-9]+)': {mockJson: 'activityLogs', randomizeData: function(req, response) {
            var data  = cloneContent(response, 200);
            return data;
        }},
    '/Mercury-O/public/rest/activityLog/getAll?fromDate=([0-9]+)&page=([0-9]+)&size=([0-9]+)&toDate=([0-9]+)&user=user': {mockJson: 'activityLogs', randomizeData: function(req, response) {
            var data  = cloneContent(response, 200);
            return data;
        }},

    '/Mercury-O/public/rest/subscribedUsers': {mockJson: 'subscribedUsers'},
    '/compass/core/subscribedUsers': {mockJson: 'subscribedUsers'},

    // Dashboard
    '/Mercury-O/public/rest/dashboard/nfvsSummary': {mockJson: 'dashboard/dashboard.nfvSummary', delay: 300, randomizeData: function(req, response) {
            var data = JSON.parse(response);
            data.oid = Math.floor(Math.random() * 10) + 1;
            data.vcpuUsed = Math.floor(Math.random() * 10) + 1;
            data.vcpu = Math.floor(Math.random() * 200) + 1;
            data.disk = Math.floor(Math.random() * 200) + 1;
            data.diskUsed = Math.floor(Math.random() * 10) + 1;
            data.ramUsed = Math.floor(Math.random() * 10) + 1;
            data.ram = Math.floor(Math.random() * 100) + 1;
            data.totalVNFs = Math.floor(Math.random() * 50) + 1;
            data.activeVNFs = Math.floor(Math.random() * 5) + 1;
            data.totalNFVs = Math.floor(Math.random() * 50) + 1;
            data.activeNFVs = Math.floor(Math.random() * 5) + 1;
            return data;
       }},
    '/Mercury-O/public/rest/dashboard/nfvsDeployment': {mockJson: 'dashboard/dashboard.nfvsDeployment', delay: 3000, randomizeData: function(req, response) {
            var data = cloneContent(response, 100);
            data[0].deployedInstancesCount = Math.floor(Math.random() * 10) + 1;
            data[1].deployedInstancesCount = Math.floor(Math.random() * 10) + 1;
            return data;
        }},
    '/Mercury-O/public/rest/dashboard/vnfSnapshots': {mockJson: 'dashboard/dashboard.vnfSnapshots', delay: 3000, randomizeData: function(req, response) {
            var data = JSON.parse(response);

            data[0].snapshotsCount = Math.floor(Math.random() * 50) + 1;
            data[1].snapshotsCount = Math.floor(Math.random() * 50) + 1;

            return data;
        }},
    '/Mercury-O/public/rest/dashboard/vnfStates': {mockJson: 'dashboard/dashboard.vnfStates', delay: 300, randomizeData: function(req, response) {
            var data = JSON.parse(response);

            data[0].stateCount = Math.floor(Math.random() * 100) + 1;
            data[1].stateCount = Math.floor(Math.random() * 100) + 1;
            data[2].stateCount = 1;

            return data;
        }},
    '/Mercury-O/public/rest/dashboard/hostStates': {mockJson: 'dashboard/dashboard.hostStates', delay: 300, randomizeData: function(req, response) {
            var data = JSON.parse(response);
            data.forEach(function(d) {
                d.count = Math.floor(Math.random() * 100) + 0;
            });
            data[4].count = 2;
            data[5].count = 1;
            data[6].count = 1;
            return data;
        }},
    '/Mercury-O/public/rest/nfvs/baseNfvs': {'mockJson': 'dashboard/dashboard.nfvsDeployment'},
    '/Mercury-O/public/rest/dashboard/supportedWidgets': {'mockJson': 'dashboard/dashboard.supportedWidgets'},


    // Settings------------------------------------------------------------
    '/Mercury-O/public/rest/OSConnect': {'mockJson': 'settings/openstack'},
    '/Mercury-O/public/rest/OSConnect/verify': {'mockJson': 'settings/openstack.verify'},
    '/Mercury-O/public/rest/OSConnect/sync': {'mockJson': 'settings/openstack.verify'},
    '/Mercury-O/public/rest/system/buildId': {'mockJson': 'settings/settings.general.buildId'},
    '/settings/public/connectivity/sms': {'mockJson': 'settings/settings.sms'},
    '/settings/public/connectivity/mail': {'mockJson': 'settings/settings.mail'},
    '/customer/public/verification?*': {'mockJson': 'settings/isCustomerVerificationEnabled'},
    '/customer/public/verification': {'mockJson': 'settings/isCustomerVerificationEnabled'},
    '/customer/public/verification/requestVerification': {'mockJson': 'settings/isCustomerVerificationEnabled'},
    '/compass/configuration/connectivity/mail/verify': {'mockJson': 'settings/settings.verify'},
    '/settings/public/rest/system/buildId': {'mockJson': 'settings/buildId'},


    // Activity Log
    '/compass/core/activityLog/getAll?page=([0-9]+)&size=([0-9]+)': {mockJson: 'activityLogs', randomizeData: function(req, response) {
            var data  = cloneContent(response, 40);
            return data;
        } },
    '/compass/core/activityLog/getAll?fromDate=([0-9]+)&page=([0-9]+)&size=([0-9]+)': {mockJson: 'activityLogs'},
    '/compass/core/activityLog/getAll?fromDate=([0-9]+)&page=([0-9]+)&size=([0-9]+)&toDate=([0-9]+)': {mockJson: 'activityLogs'},
    '/compass/core/activityLog/getAll?fromDate=([0-9]+)&page=([0-9]+)&size=([0-9]+)&toDate=([0-9]+)&user=user': {mockJson: 'activityLogs'},

    // NFV Manager
    '/Mercury-O/public/rest/nfvs': {'mockJson': 'hostManager/lightnfv.nfv.list', randomizeData: function(req, response) {
            var data  = cloneContent(response, 40);
            return data;
        }},
    '/Mercury-O/public/rest/nfvs/filter': {'mockJson': 'hostManager/lightnfv.nfv.list'},
    '/Mercury-O/public/rest/nfvs/filterStates': {'mockJson': 'hostManager/hostStates.list'},
    '/Mercury-O/public/rest/nfvs/([A-Za-z0-9\-\.]+)': {'mockJson': 'lightnfv.nfv'},
    '/Mercury-O/public/rest/nfvs?page=([0-9]+)&size=([0-9]+)': {'mockJson': 'hostManager/lightnfv.nfv.list', randomizeData: function(req, response) {
            var data  = cloneContent(response, 100);
            return data;
        }},
    '/Mercury-O/public/rest/nfvs/filter?page=([0-9]+)&size=([0-9]+)': {'mockJson': 'hostManager/lightnfv.nfv.list',  randomizeData: function(req, response) {
            var data  = cloneContent(response, 100);
            return data;
        }},
    '/Mercury-O/public/rest/nfvs?page=([0-9]+)&size=([0-9]+)&customer=([0-9]+)': {'mockJson': 'hostManager/lightnfv.nfv.list'},
    '/Mercury-O/public/rest/nfvs?page=([0-9]+)&size=([0-9]+)&state=([A-Z]+)': {'mockJson': 'hostManager/lightnfv.nfv.list'},
    '/Mercury-O/public/rest/nfvs/([0-9]+)': {'mockJson': 'lightnfv.nfv'},
    '/Mercury-O/public/rest/nfvs/([0-9]+)/vnfs': {'mockJson': 'hostManager/lightnfv.nfv.vnf.list'},

    // network service nsdInfoId=16a1b06e-4d7c-4b6f-90d7-55e3ca718008&scOid=1
    '/Mercury-O/public/rest/serviceChains': {'mockJson': 'serviceChain/lightnfv.service.list', randomizeData: function(req, response) {
            var data  = cloneContent(response, 200);
            return data;
        },delay : 20000},
    '/Mercury-O/public/rest/serviceChains/([0-9]+)/operation/heal': {'mockJson': 'networkService/service/lightnfv.service'},
    '/Mercury-O/public/rest/serviceChains/names?page=([0-9]+)&size=([0-9]+)': {'mockJson': 'networkService/service/names'},
    '/Mercury-O/public/rest/serviceChains/replace?nsdInfoId=.*&scOid=([0-9]+)': {'mockJson': 'networkService/service/getReplacedNsdInfo'},
    '/Mercury-O/public/rest/serviceChains?page=([0-9]+)&size=([0-9]+)': {'mockJson': 'networkService/service/lightnfv.service.list', randomizeData: function(req, response) {
            var data  = cloneContent(response, 200);
            return data;
        },delay : 20000},
    '/Mercury-O/public/rest/serviceChainsView/delete': {'mockJson': 'networkService/service/serviceChainView.service.list'},
    '/Mercury-O/public/rest/serviceChains/([0-9]+)': {'mockJson': 'networkService/service/lightnfv.service'},
    '/Mercury-O/public/rest/serviceChains/([0-9]+)/networks': {'mockJson': 'networkService/service/networks'},
    '/Mercury-O/public/rest/serviceChains/delete': {'mockJson': 'networkService/service/lightnfv.service.list'},
    '/Mercury-O/public/rest/serviceChains/maintenance': {'mockJson': 'networkService/service/maintenance'}, // network service maintenance
    '/Mercury-O/public/rest/serviceChains/generateIp': {'mockJson': 'networkService/service/generateip'}, // get suggested ip of the host
    '/Mercury-O/public/rest/ns/*': {'mockJson': 'networkService/service/status', delay: 5000}, // status sc
    '/Mercury-O/public/rest/ns/validate': {'mockJson': 'networkService/service/validate'}, // validate sc
    '/Mercury-O/public/rest/ns/validate/planned': {'mockJson': 'networkService/service/validate'}, // validate sc
    '/Mercury-O/public/rest/nschainnode?page=([0-9]+)&size=([0-9]+)': {'mockJson': 'hostManager/lightnfv.nfv.vnf.list', randomizeData: function(req, response) {
            var data  = cloneContent(response, 100);
            return data;
        },delay : 2000},

    // Network Service
    '/Mercury-O/public/rest/network-service?page=([0-9]+)&size=([0-9]+)': {'mockJson': 'networkService/template/getAllNsd'},
    '/Mercury-O/public/rest/network-service/delete/*': {'mockJson': 'networkService/template/deleteTemplate'},
    '/Mercury-O/public/rest/network/graph/*': {'mockJson': 'networkService/networkGraph'}, // Get Network graph by network service
    '/Mercury-O/public/rest/network/graph/site': {'mockJson': 'networkService/networkGraphSite'},  // Get Network graph for the whole site
    // Templates
    '/Mercury-O/public/rest/nsd?page=([0-9]+)&size=([0-9]+)': {'mockJson': 'networkService/template/getAllNsd', randomizeData: function(req, response) {
            var data  = cloneContent(response, 100);
            return data;
        }},
    '/Mercury-O/public/rest/nsd?nsdInfoId=.*': {'mockJson': 'networkService/template/getNsdInfo'},
    '/Mercury-O/public/rest/nsd?nsdIdentifier=.*': {'mockJson': 'networkService/template/getNsdInfo'},
    '/Mercury-O/public/rest/nsd': {'mockJson': 'networkService/template/saveNsd'},
    '/Mercury-O/public/rest/nsd/validate': {'mockJson': 'networkService/template/validateNsd'},

    // User-preference
    '/user-preference/public/ns-layout': {'mockJson': 'networkService/user-preference/ns-layout'},
    '/user-preference/public/ns-layout/([0-9]+)': {'mockJson': 'networkService/user-preference/ns-layout', 'PUT': 'networkService/user-preference/update-ns-layout', 'DELETE': 'networkService/user-preference/delete-ns-layout'},
    '/user-preference/public/ns-layout/delete': {'mockJson': 'networkService/user-preference/delete-ns-layout'},

    // Dashboard preference
    '/user-preference/public/user-preference/*': {'mockJson': 'user-preference/dashboard'},

    // Alarms
    '/performancemanager/public/rest/alarms/active/summary': {mockJson: 'alarms/alarmsSummary', statusCode: 200},
    '/performancemanager/public/rest/alarms/(active|resolved)?page=([0-9]+)&size=([0-9]+)&severity=(Critical|Blocker|Major|Minor|Warning)': {mockJson: 'alarms/alarms'},
    '/performancemanager/public/rest/alarms/(active|resolved)?page=([0-9]+)&severity=(Critical|Blocker|Major|Minor|Warning)&size=([0-9]+)': {mockJson: 'alarms/alarms'},
    '/performancemanager/public/rest/alarms/(active|resolved)?page=([0-9]+)&size=([0-9]+)': {mockJson: 'alarms/alarms', randomizeData: function(req, response) {
            var data  = cloneContent(response, 200);
            return data;
        } },
    '/performancemanager/public/rest/alarms/(active|resolved)?hostname=([A-Za-z0-9\-\.]+)&page=([0-9]+)&size=([0-9]+)': {mockJson: 'alarms/alarms', randomizeData: function(req, response) {
            var data  = cloneContent(response, 200);
            return data;
        }},
    '/performancemanager/public/rest/alarms/types': {mockJson: 'alarms/alarmTypes'},
    '/performancemanager/public/rest/alarms/componentNames': {mockJson: 'alarms/componentNames'},
    '/performancemanager/public/rest/alarms/managementHosts': {mockJson: 'alarms/managementHosts'},
    '/performancemanager/public/rest/alarms/categories': {mockJson: 'alarms/alarmCategries'},


    // Internal User Management
    '/Mercury-O/public/rest/network-service/templates/nsd/*': {'mockJson': 'networkService/template/getNsdInfo'},
    '/Mercury-O/public/rest/network-service/templates/nsd': {'mockJson': 'networkService/template/saveNsd'},
    // Internal User Management
    '/compass/security/public/users': {mockJson: 'settings/internalUsers/users', randomizeData: function(req, response) {
            var data = cloneContent(response, 100);
            return data;
        }},
    '/compass/root/management/edit?userName=.*': {mockJson: 'settings/internalUsers/users'},
    '/compass/root/management/delete': {mockJson: 'settings/internalUsers/users'},
    '/compass/security/public/users?page=([0-9]+)&size=([0-9]+)': {mockJson: 'settings/internalUsers/users', randomizeData: function(req, response) {
            var data = cloneContent(response, 150);
            return data;
        }},
    '/compass/security/public/users/find?email=.*&userName=adminLocal': {mockJson: 'settings/internalUsers/user'},
    '/compass/security/public/users/find?email=.*': {mockJson: 'settings/internalUsers/user'},
    '/compass/security/public/users/find?userName=.*': {mockJson: 'settings/internalUsers/user'},
    '/compass/security/public/users/password/policy': {mockJson: 'settings/internalUsers/policy'},
    // JUST FAKE it for now until will be fixed
    '/compass/security/public/mode': {mockJson: 'settings/internalUsers/policy'},
    '/compass/security/public/users/password/reset/validate?user=([0-9]+)&uuid=.*': {mockJson: 'settings/internalUsers/validate'},
    '/compass/security/public/users/password/reset/sendMail?username=.*': {mockJson: 'settings/internalUsers/sendMail'},
    '/compass/security/public/users/password/reset': {mockJson: 'settings/internalUsers/reset'},
    '/compass/security/public/auth/getUserProfile': {mockJson: 'settings/internalUsers/userPropfile'},
    '/compass/security/public/auth/changpwd': {mockJson: 'settings/internalUsers/userPropfile'},

    // VNF Catalog
    '/Mercury-O/public/rest/vnfCatalog/getAllVnfPackages': {'mockJson': 'vnfCatalog/lightnfv.vnf.catalog.list'},
    '/Mercury-O/public/rest/vnfCatalog/showActiveVnfPackage': {'mockJson': 'vnfCatalog/lightnfv.vnf.catalog.list'},
    '/Mercury-O/public/rest/vnfCatalog/showDownloadVnfPackage': {'mockJson': 'vnfCatalog/lightnfv.vnf.catalog.list'},
    '/Mercury-O/public/rest/vnfCatalog/onboardVnfPackagesInfo': {'mockJson': 'vnfCatalog/lightnfv.vnf.catalog.appstore'},
    '/Mercury-O/public/rest/vnfCatalog/loadVnfPackage': {'mockJson': 'vnfCatalog/lightnfv.vnf.catalog.loadTemplate'},
    '/Mercury-O/public/rest/vnfCatalog/reloadVnfPackage': {'mockJson': 'vnfCatalog/lightnfv.vnf.catalog.loadTemplate'},
    '/Mercury-O/public/rest/vnfCatalog/upgradeVnfPackage': {'mockJson': 'vnfCatalog/lightnfv.vnf.catalog.upgradeTemplate'},
    '/Mercury-O/public/rest/vnfCatalog/pollVnfPackages': {'mockJson': 'vnfCatalog/lightnfv.vnf.catalog.pollImages'},
    '/Mercury-O/public/rest/vnfCatalog/deleteVnfPackage': {'mockJson': 'vnfCatalog/lightnfv.vnf.catalog.pollImages'},
    '/Mercury-O/public/rest/vnfCatalog/showVnfd/*': {'mockJson': 'vnfCatalog/showVnfd'},

    // VNF Meters
    '/Mercury-O/public/rest/meter/types/history/resource/*': {'mockJson': 'vnfMeters/getHistoryResourceTypes'},
    '/Mercury-O/public/rest/meter/types/history/network/*': {'mockJson': 'vnfMeters/getHistoryNetworkTypes'},
    '/Mercury-O/public/rest/meter/types/current/resource/*': {'mockJson': 'vnfMeters/getCurrentResourceTypes'},
    '/Mercury-O/public/rest/meter/types/current/network/*': {'mockJson': 'vnfMeters/getCurrentNetworkType'},
    '/Mercury-O/public/rest/meter/values/history/network/*': {'mockJson': 'vnfMeters/getHistoryNetworkValues'},
    '/Mercury-O/public/rest/meter/values/history/resource/*': {'mockJson': 'vnfMeters/getHistoryResourceValues', randomizeData: function(req, response) {
            var data = JSON.parse(response);
            var currentValues = data.meterSampleList;
            data.id = req.id;
            currentValues.forEach(function(v) {
                var sampleList = v.sampleList;
                sampleList.forEach(function(v) {
                    v.value = Math.floor(Math.random() * 20000) + 1;
                });
            });
            return data;
        }
    },
    '/Mercury-O/public/rest/meter/values/current/resource/*': {'mockJson': 'vnfMeters/getCurrentResourceValues', randomizeData: function(req, response) {
            var data = JSON.parse(response);
            var currentValues = data.currentValues;
            var pointDate = new Date();
            pointDate.setSeconds(pointDate.getSeconds() + 30);
            data.timestampUtc = pointDate.toISOString();
            // data.id = req.vnfId;
            currentValues.forEach(function(v) {
                v.value = Math.floor(Math.random() * 500) + 1;
            });
            return data;
        }},
    '/Mercury-O/public/rest/meter/values/current/network/*': {'mockJson': 'vnfMeters/getCurrentNetworkValues', randomizeData: function(req, response) {
            var data = JSON.parse(response);
            var currentValues = data.currentPortMeterValues[0].currentPortValues;
            var pointDate = new Date();
            pointDate.setSeconds(pointDate.getSeconds() + 30);
            data.timestampUtc = pointDate.toISOString();
            // data.id = req.vnfId;
            currentValues.forEach(function(v) {
                v.value = Math.floor(Math.random() * 500) + 1;
            });
            return data;
        }},

    // HOST Meters
    '/ems/public/rest/meter/types/history/resource/*': {'mockJson': 'hostMeters/getHistoryResourceTypes'},
    '/ems/public/rest/meter/types/history/network/*': {'mockJson': 'hostMeters/getHistoryNetworkTypes'},
    '/ems/public/rest/meter/values/history/network/*': {'mockJson': 'hostMeters/getHistoryNetworkValues'},
    '/ems/public/rest/meter/values/history/resource/*': {'mockJson': 'hostMeters/getHistoryResourceValues', randomizeData: function(req, response) {
            var data = JSON.parse(response);
            var currentValues = data.meterSampleList;
            data.id = req.id;
            currentValues.forEach(function(v) {
                var sampleList = v.sampleList;
                sampleList.forEach(function(v) {
                    v.value = Math.floor(Math.random() * 2000) + 1;
                });
            });
            return data;
        }
    },

    // Host Manager
    '/Mercury-O/public/rest/vnfs/([0-9]+)/snapshots': {'mockJson': 'hostManager/lightnfv.vnf.snapshots.list'},
    '/Mercury-O/public/rest/vnfs/([0-9]+)/snapshots/([A-Za-z0-9\-\.]+)/restore': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/vnfs/([0-9]+)/snapshots/([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/vnfs/([0-9]+)/start': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/vnfs/([0-9]+)/stop': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/vnfs/([0-9]+)/reboot': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/vnfs/([0-9]+)/terminate': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/vnfs/([0-9]+)/heal': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/vnfs/([0-9]+)/createSnapshot': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/vnfs/([0-9]+)/console/url': {'mockJson': 'hostManager/console'},
    '/Mercury-O/public/rest/nfvs?hostname=(.*)': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/nfvs/([0-9]+)/shutdown': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/nfvs/([0-9]+)/reboot': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/nfvs/([0-9]+)/reinstall': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/Mercury-O/public/rest/nfvs/([0-9]+)/replace': {'mockJson': 'hostManager/lightnfv.nfv'},


    // Planned Host, SC & Network
    '/provision/public/host': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/provision/public/host?hostDN=(.*)': {'mockJson': 'hostManager/lightnfv.nfv'},
    '/provision/public/host?hostType=([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/flavours'},
    '/provision/public/templates/hostTypes': {'mockJson': 'hostManager/hostTypes'},
    '/provision/public/templates/([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/hostFlavor'},
    '/provision/public/templates/SA01': {'mockJson': 'hostManager/hostFlavor'},
    '/provision/public/templates/G4': {'mockJson': 'hostManager/host-capability-without-flavour'},

    // EMS
    '/ems/public/rest/hosts/([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/ems/ems.host.details'},
    '/ems/public/rest/hosts/wifi/([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/ems/ems.host.wifi'},
    '/ems/public/rest/hosts/wifi/ssids/([A-Za-z0-9\-\.]+)/([0-9]+)': {'mockJson': 'hostManager/ems/ems.host.wifi.ssid'},
    '/ems/public/rest/hosts/reload/([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/ems/ems.host.details'},
    '/ems/public/rest/hosts/pifsDetail/([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/ems/ems.host.pif.details'},
    '/ems/public/rest/faults/alarms/host/([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/ems/ems.host.alarms', randomizeData: function(req, response) {
            var data = cloneContent(response, 300);
            return data;
        }},
    '/ems/public/rest/alarms/getAll?sourceDn=([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/ems/ems.port.alarms'},
    '/ems/public/rest/ports/([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/ems/ems.port.details'},
    '/ems/public/rest/ports/reload/([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/ems/ems.port.details'},
    '/ems/public/rest/ports/([A-Za-z0-9\-\.]+)/transceiver': {'mockJson': 'hostManager/ems/ems.port.transceiver.OTGBE'},
    '/ems/public/rest/wifi/([A-Za-z0-9\-\.]+)/([A-Za-z0-9\-\.]+)/restoreToDefault': {'mockJson': 'hostManager/ems/ems.wifi.interface.details'},
    '/ems/public/rest/ports/([A-Za-z0-9\-\.]+)/state': {'mockJson': 'hostManager/ems/ems.port.details'},
    '/ems/public/rest/wifi/([A-Za-z0-9\-\.]+)/([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/ems/ems.wifi.interface.details'},
    '/ems/public/rest/wifi/([A-Za-z0-9\-\.]+)/([A-Za-z0-9\-\.]+)/([A-Za-z0-9\-\.]+)/isAvailable': {'mockJson': 'hostManager/ems/ems.wifi.ap.isAvailable'},
    '/ems/public/rest/wifi/([A-Za-z0-9\-\.]+)/([A-Za-z0-9\-\.]+)/availableChannels': {'mockJson': 'hostManager/ems/ems.wifi.availableChannels'},
    '/ems/public/rest/wifi/([A-Za-z0-9\-\.]+)/([A-Za-z0-9\-\.]+)/accessPoint': {'mockJson': 'hostManager/ems/ems.wifi.ap.isAvailable'},
    '/ems/public/rest/lte/([A-Za-z0-9\-\.]+)/([A-Za-z0-9\-\.]+)/updateState': {'mockJson': 'hostManager/ems/ems.wifi.ap.isAvailable'},
    '/ems/public/rest/lte/([A-Za-z0-9\-\.]+)/([A-Za-z0-9\-\.]+)/getDetails': {'mockJson': 'hostManager/ems/ems.lte.single.details'},
    '/ems/public/rest/lte/([A-Za-z0-9\-\.]+)/getDetails': {'mockJson': 'hostManager/ems/ems.lte.details'},
    '/ems/public/rest/lte/accessPointAuthTypes': {'mockJson': 'hostManager/ems/ems.lte.accessPointAuthTypes'},

    '/Mercury-O/public/rest/networks': {'mockJson': 'networkManager/network.list'},
    '/Mercury-O/public/rest/networks?page=([0-9]+)&size=([0-9]+)': {'mockJson': 'networkManager/network.list'},
    '/Mercury-O/public/rest/networks?hostName=([A-Za-z0-9\-\.]+)': {'mockJson': 'networkManager/network.list'},

    '/Mercury-O/public/rest/networks/delete': {'mockJson': 'networkManager/network'}, // Get all deployed VNFs
    '/Mercury-O/public/rest/networks/getMngIp/([A-Za-z0-9\-\.]+)': {'mockJson': 'networkManager/getMngIp'}, // Get all deployed VNFs
    '/Mercury-O/public/rest/networks/addNewNetwork': {'mockJson': 'networkManager/network'}, // Get all deployed VNFs
    '/Mercury-O/public/rest/networks/([0-9]+)': {'mockJson': 'networkManager/network.edit'}, // Get edit vnf data

    '/Mercury-O/public/rest/networks/deletePlannedNetwork': {'mockJson': 'networkManager/network'}, // Get all deployed VNFs
    '/Mercury-O/public/rest/networks/addPlannedNetwork': {'mockJson': 'networkManager/network'}, // Get all deployed VNFs
    '/Mercury-O/public/rest/networks/([0-9]+)/editPlannedNetwork': {'mockJson': 'networkManager/network'}, // Get all deployed VNFs

    // Performance Management
    '/performancemanager/public/rest/rule?page=([0-9]+)&size=([0-9]+)': {'mockJson': 'performanceManager/rule.list'},
    '/performancemanager/public/rest/rule': {'mockJson': 'performanceManager/rule'},
    '/performancemanager/public/rest/rule/([A-Za-z0-9\-\.]+)': {'mockJson': 'performanceManager/rule'},
    '/performancemanager/public/rest/alarms/all?component=([A-Za-z0-9-.]+)&hostname=([A-Za-z0-9-.]+)&page=([0-9]+)&size=([0-9]+)': {'mockJson': 'hostManager/ems/ems.host.alarms'},
    '/performancemanager/public/rest/alarms/all?hostname=([A-Za-z0-9\-\.]+)&page=([0-9]+)&size=([0-9]+)': {'mockJson': 'hostManager/ems/ems.host.alarms', randomizeData: function(req, response) {
            var data  = cloneContent(response, 20);
            return data;
        } },

    // Management health
    '/performancemanager/public/rest/health/layers': {'mockJson': 'managementHealth/applications'},
    '/performancemanager/public/rest/health/hosts': {'mockJson': 'managementHealth/hosts', randomizeData: function(req, response) {
            var data  = cloneContent(response, 100);
            return data;
        }},
    '/performancemanager/public/rest/health/hosts?layer=([A-Za-z\-\.]+)': {'mockJson': 'managementHealth/hostsInApplication'},
    '/performancemanager/public/rest/health/services?layer=([A-Za-z\-\.]+)': {'mockJson': 'managementHealth/services'},
    '/performancemanager/public/rest/health/instances?layer=([A-Za-z0-9\-\.]+)&host=([A-Za-z0-9\-\.]+)': {'mockJson': 'managementHealth/services'},


    // Customer Management
    '/customer/public/customers/count': {'mockJson': 'customerManagement/customers-count'},
    '/customer/public/customers?page=([0-9]+)&size=([0-9]+)': {'mockJson': 'customerManagement/customers.list', randomizeData: function(req, response) {
            var data  = cloneContent(response, 200);
            return data;
        }},
    '/customer/public/customers/name/([A-Za-z0-9]+)': {'mockJson': 'customerManagement/customerExits'},
    '/customer/public/customers/([0-9]+)': {'mockJson': 'customerManagement/customer'},
    '/customer/public/customers/([0-9]+)/updateState': {'mockJson': 'customerManagement/customer/public'},
    '/customer/public/slalevels': {'mockJson': 'customerManagement/slaLevel'},
    '/customer/public/sites/': {'mockJson': 'customerManagement/sites'},
    '/customer/public/sites/([0-9]+)': {'mockJson': 'customerManagement/getCustomerSite'},
    '/customer/public/sites/2': {'mockJson': 'customerManagement/getCustomerSite-2'},
    '/customer/public/verification/person': {'mockJson': 'customerManagement/contactDetails'},
    '/customer/public/verification/person/verify': {'mockJson': 'customerManagement/contactDetails'},
    '/customer/public/sites/([0-9]+)/requestDeletion': {'mockJson': 'customerManagement/getCustomerSite'},

    // Customer Site Map routes
    '/customer/public/customers/([0-9]+)/mapview': {'mockJson': 'customerManagement/customerMap'},
    '/customer/public/sites/([0-9]+)/ns': {'mockJson': 'customerManagement/siteNs'},

    // Host History
    '/Mercury-O/public/rest/nfvs/history/([A-Za-z0-9\-\.]+)': {'mockJson': 'hostManager/hostHistory'},

    // Customer Verification
    '/Mercury-O/public/rest/customer/persons/requestVerification': {'mockJson': 'hostManager/hostHistory'},


    // Host deletion
    '/customer/public/sites/fromToken': {'mockJson': 'customerManagement/siteDeletion'},
    '/customer/public/sites/confirmDeletion': {'mockJson': 'customerManagement/siteDeletion'},
    '/customer/public/sites/declineDeletion': {'mockJson': 'customerManagement/siteDeletion'},

    // Reports
    '/reportsmanager/public/reports/types': {'mockJson': 'reports/reportsTypes'},
    '/reportsmanager/public/reports/[0-9]+': {'mockJson': 'reports/reportsTypes'},
    '/reportsmanager/public/reports/[0-9]+/generate': {'mockJson': 'reports/reportsTypes'},
    '/reportsmanager/public/reports/([A-Za-z0-9]+)/dynamic-params': {'mockJson': 'reports/reportDynamicParams'},
    '/reportsmanager/public/reports': {'mockJson': 'reports/reportDynamicParams'}
};
