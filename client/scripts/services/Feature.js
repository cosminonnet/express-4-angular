'use strict';

angular.module('clientApp')
    .service('Feature', ['$resource', function Feature($resource) {
        return $resource('/api/feature/:featureId', {featureId: '@_id'}, {
            'get': {method: 'GET'},
            'query': {method: 'GET', isArray: true},
            'save': {method: 'POST'},
            'update': {method: 'PUT'},
            'delete': {method: 'DELETE'},
            'deleteAll': {method: 'DELETE', params: {featureId: null}}
        });
    }]);

