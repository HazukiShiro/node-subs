var assert = require('assert')
  , path = require('path');

var ssa = require('../lib/ssa');

describe('SSA', function(){


  describe('#parseLine(line)', function(){
  
    it('should return an object with `line`, `type` and `data` keys', function(done){
      var result = ssa.parseLine();
      assert.equal(result.hasOwnProperty('line'), true);
      assert.equal(result.hasOwnProperty('type'), true);
      assert.equal(result.hasOwnProperty('data'), true);
      done();
    });
  
    it('should return an empty result when called without arguments', function(done){
      var expected = {
        line: '',
        type: null,
        data: {}
      };
      assert.deepEqual(ssa.parseLine(), expected);
      done();
    });
  
    it('should set `type` to `null` if line is invalid', function(done){
      [
        'This is an invalid line',
        '[This section] is invalid',
        ' [Section]', // Section headers can't have leading spaces
        'Key:Value' // There must be a space after the colon
      ].forEach(function(line){
        var msg = "`"+line+"` should not be treated as a valid line.";
        
        assert.equal(ssa.parseLine(line).type, null, msg);
      });
      done();
    });
  
    it('should handle lines starting with `;`', function(done){
      var line = '; 3 is the point of the 1. For the 1-5-6 are 2. ';
      var expected = {
        line: line,
        type: 'comment',
        data: {
          key: null,
          value: ' 3 is the point of the 1. For the 1-5-6 are 2. '
        }
      };
      var result = ssa.parseLine(line);
      
      assert.equal(result.line, expected.line);
      assert.equal(result.type, expected.type);
      assert.deepEqual(result.data, expected.data);
      done();
    });
    
  });


  describe('#parseFile(file, callback)', function(){
  
    it('should pass a filled container to the callback if `err` is `null`', function(done){
    
      var file = path.join(__dirname, 'sns-3x11.ass');
      
      ssa.parseFile(file, function(err, container){
        assert.equal(err, null);
        assert.equal((container instanceof ssa.Container), true);
        done();
      });
    });
  });


  describe('Item', function(){
  
    describe('.fromLine(line)', function(){
      
      it('should throw an error if line is not like "key: value"');
    });
  
    describe('#setFormat(formatString)', function(){
    
      it("should do nothing if it's a `Format` item");
      it('should update Item.format');
      it('should set Item.value to an array of strings');
    });
  
    describe('#get(key)', function(){
    
      it('should return `null` if Item has no format');
      it('should return the correct value based on the given key');
    });
  
    describe('#set(key, value)', function(){
    
      it("should do nothing if it's a `Format` item");
      it('should return `null` if Item has no format');
      it('should return `null` if the given key is not defined in the format');
      it('should change the value corresponding to the given key and return `true`');
    });
  
    describe('#dump(outs[, EOL])', function(){
      
      it('should write "<key>: <value>" (formatted) into the given stream');
    });
  });


  describe('Section', function(){
  
  
    describe('#addItem(key, value)', function(){
    
      it('should format the item if the Section already has a format');
      
      describe('when key=="Format"', function(){
      
        it("shouldn't be added to the `Section.items` array");
        it('should update the format of any item at `Section.items`');
      });
    });
  
  
    describe('#setFormat(formatString)', function(){
    
      it('should change `Section.format` into an array of strings');
      it("should update the format of any item at `Section.items`");
    });
  
  
    describe('#dump(outs[, EOL])', function(){
      it('should write "[<section name>]" to `outs`, dump every ' +
         '`Section.item` to that stream, and finish with an ' +
         'empty line');
    });
  
  
    describe('#each(key, callback)', function(){
      
      it('should execute `callback(item)` for any item matching the '+
         'given key');
    });
  });


  describe('Container', function(){
  
    describe('#addSection(name)', function(){
    
      it('should add a new section to the container and return it');
    });
  
    describe('#section(name)', function(){
      
      it('should return the first section with that [name]');
    });
  
    describe('#sectionNames()', function(){
    
      it('should return an array with the names of the sections');
    });
  
    describe('#dump(outs[, EOL])', function(){
    
      it('should dump every section to that stream');
    });
  });
});
