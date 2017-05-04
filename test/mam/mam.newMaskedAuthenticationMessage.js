
var chai = require('chai');
var assert = chai.assert;
var MAM = require('../../lib/mam');
var MerkleTree = require('../../lib/merkle');
var Curl = require('../../tempcrypt/curl');
var Converter = require('../../tempcrypt/converter');

describe('MerkleTree.get', function() {

    var tests = [
        // Valid bundle
        {
            seed: "KXRVLFETGUTUWBCNCC9DWO99JQTEI9YXVOZHWELSYP9SG9KN9WCKXOVTEFHFH9EFZJKFYCZKQPPBXYSGJ",
            encryptionSeed: "9XRVLFETGUTUWBCNCC9DWO99JQTEI9YXVOZHWELSYP9SG9KN9WCKXOVTEFHFH9EFZJKFYCZKQPPBXYSGJ",
            nextEncSeed: "AYZVLFETGUTUWBCNCC9DWO99JQTEI9YXVOZHWELSYP9SG9KN9WCKXOVTEFHFH9EFZJKFYCZKQPPBXYSGJ",
            message: "Hello, World! I have the best messages, that no one else has as good as me! Test one two threee four five six seven",
            start: 3,
            count: 9,
            security: 1,
        },
    ]

    tests.forEach(function(test) {

        it('should create a signed, encrypted message with merkle tree on channel' + test.seed + ' with ', function() {
            var tree0 = new MerkleTree(test.seed, test.start, test.count, test.security);
            var tree1 = new MerkleTree(test.seed, test.start + test.count, test.count, test.security);
            var index;
            for(index = 0; index < tree0.root.size(); index++) {
                var mamTransactions = new MAM.MaskedAuthenticatedMessage({
                    message: test.message, 
                    merkleTree: tree0, 
                    nextRoot: tree1.root.hash.toString(), 
                    channelKey: test.encryptionSeed, 
                    nextChannelKey: test.nextEncSeed, 
                    index: index
                });
                var length = mamTransactions[0].message.length;
            }
        });

    })
});