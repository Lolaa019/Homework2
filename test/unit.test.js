const Maths = require ('../Maths.js');
const assert = require ('assert');

describe ('Basic Maths test', function () {
    it ('tests if 1 is equal to 1', function (){
        assert.equal(1 , 1);
    })
})

describe ('Maths class test for add', function (){
    it ('tests if 1 + 1 = 2', function (){
        const actual = Maths.add (1, 1);
        const expected = 2;

        assert.equal (actual, expected);
    });
});

describe ('Basic maths test for sub', function (){
    it ('tests if result equals 4', function(){
        const actual = Maths.sub(17, 13);
        const expected = 4;

        assert.equal(actual, expected);
    })
})