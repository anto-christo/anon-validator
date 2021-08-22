process.env.NODE_ENV = 'test';

const assert = require('assert');
const { EOL } = require('os');
const { validateAnon } = require('../index');
const _ = require('../utils/message');

describe('Validate ANON', function() {
    it('should throw an error when first character is invalid', function() {
        const content = "p{}";
        try {
            validateAnon(content);
        } catch(e) {
            assert.strictEqual(e.errorObject.message, _.UNEXPECTED_CHARACTER);
        }
    });

    it('should throw an error when string has a missing quote', function() {
        const content = '{ name" : "xyz" }';
        try {
            validateAnon(content);
        } catch(e) {
            assert.strictEqual(e.errorObject.message, _.MISSING_CHARACTER);
        }
    });

    it('should throw an error when colon is not present between key and value', function() {
        const content = '{ "name"  "xyz" }';
        try {
            validateAnon(content);
        } catch(e) {
            assert.strictEqual(e.errorObject.message, _.UNEXPECTED_CHARACTER);
        }
    });

    it('should throw an error when comma is not present between two key-value pairs', function() {
        const content = '{ "name" : "xyz" "age" : 12 }';
        try {
            validateAnon(content);
        } catch(e) {
            assert.strictEqual(e.errorObject.message, _.MISSING_CHARACTER);
        }
    });

    it('should throw error for invalid strings', function() {
        const content = '{ "name" : "\" }';
        try {
            validateAnon(content);
        } catch(e) {
            assert.strictEqual(e.errorObject.message, _.MISSING_CHARACTER);
        } 
    });

    it('should throw error if triple quotes used in keys', function() {
        const content = '{ """name""" : "xyz" }';
        try {
            validateAnon(content);
        } catch(e) {
            assert.strictEqual(e.errorObject.message, _.UNEXPECTED_CHARACTER);
        } 
    });

    it('should throw error if bracket is missing', function() {
        const content = '{ "name" : "xyz" ';
        try {
            validateAnon(content);
        } catch(e) {
            assert.strictEqual(e.errorObject.message, _.MISSING_CHARACTER);
        } 
    });

    it('should support triple quotes for values', function() {
        const content = '{ "name" : """xyz""" }';
        assert.strictEqual(validateAnon(content), true); 
    });

    it('should support multi line strings in values', function() {
        const content = `{ "name" : """abc ${EOL} def ${EOL} ghi""" }`;
        assert.strictEqual(validateAnon(content), true); 
    });

    it('should support trailing comma after the last key-value', function() {
        const content = '{ "name" : "xyz", "age" : 12, }';
        assert.strictEqual(validateAnon(content), true); 
    });

    it('should support comments', function() {
        const content = `{ "name" : "xyz",//some comment${EOL} "age" : 12, }`;
        assert.strictEqual(validateAnon(content), true); 
    });

    it('should support escape sequences', function() {
        const content = '{ "name" : "\\"xyz" }';
        assert.strictEqual(validateAnon(content), true); 
    });
});