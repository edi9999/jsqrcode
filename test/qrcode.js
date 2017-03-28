var expect = require('chai').expect;
var fs = require('fs');
var QrCode = require('../dist/index.js');
var ImageParser = require("image-parser");

function copy(input) {
  return JSON.parse(JSON.stringify(input));
}

it('should work with basic image', function(done) {
  var c = fs.readFileSync(__dirname + '/image.png');
  var img = new ImageParser(c);
  img.parse(function(err) {
    if (err) {
      return done(err);
    }
    var qr = new QrCode();
    qr.callback = function(error, result) {
      if (error) {
        return done(error);
      }
      expect(copy(result)).to.deep.equal({
        "result": 'Test',
        "points": [
          {
            "count": 2,
            "estimatedModuleSize": 8,
            "x": 36,
            "y": 148,
          },
          {
            "count": 2,
            "estimatedModuleSize": 8,
            "x": 36,
            "y": 36,
          },
          {
            "count": 2,
            "estimatedModuleSize": 8,
            "x": 148,
            "y": 36,
          }
        ]
      });
      done();
    };
    qr.decode({width: img.width(), height: img.height()}, img._imgBuffer);
  });
});

it('should work with imageData format', function(done) {
  var c = fs.readFileSync(__dirname + '/image.png');
  var img = new ImageParser(c);
  img.parse(function(err) {
    if (err) {
      return done(err);
    }
    var qr = new QrCode();
    qr.callback = function(error, result) {
      if (error) {
        return done(error);
      }
      expect(copy(result)).to.deep.equal({
        "result": 'Test',
        "points": [
          {
            "count": 2,
            "estimatedModuleSize": 8,
            "x": 36,
            "y": 148,
          },
          {
            "count": 2,
            "estimatedModuleSize": 8,
            "x": 36,
            "y": 36,
          },
          {
            "count": 2,
            "estimatedModuleSize": 8,
            "x": 148,
            "y": 36,
          }
        ]
      });
      done();
    };
    qr.decode({height: img.height(), width: img.width(), data: img._imgBuffer});
  });
});
