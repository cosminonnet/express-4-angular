'use strict';

describe('Service: Feature', function () {

    // load the service's module
    beforeEach(module('clientApp'));

    // Define the variables
    var Feature,
        httpBackend,
        featuresData = [
            { "title": "Feature 1", "author": "John", "description": "", "id": 1 },
            { "title": "Feature 2", "author": "Mike", "description": "", "id": 2 }
        ];

    // Instantiate the service
    beforeEach(inject(function (_Feature_, _$httpBackend_) {
        Feature = _Feature_;

        httpBackend = _$httpBackend_;
        httpBackend.expectGET('/api/feature').respond(featuresData);
    }));

    // Tests descriptions
    it('should be created', function () {
        expect(!!Feature).toBe(true);
    });

    it('should get an empty list', function () {
        var features = Feature.query();
        expect(features.length).toBe(0);
    });

    it('should get a non-empty list', function () {
        var features = Feature.query();
        httpBackend.flush();
        expect(features.length).toBe(featuresData.length);
    });

});
