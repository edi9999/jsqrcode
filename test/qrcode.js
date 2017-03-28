var expect = require('chai').expect;
var fs = require('fs');
var QrCode = require('../dist/index.js');
var ImageParser = require("image-parser");

it('should work with basic image', function(done) {
  var c = fs.readFileSync(__dirname + '/image.png');
  var img = new ImageParser(c);
  img.parse((err) => {
    if (err) {
      return done(err);
    }
    var qr = new QrCode();
    qr.callback = function(result) {
      expect(result).to.equal('Test');
      done();
    };
    qr.decode({width: img.width(), height: img.height()}, img._imgBuffer);
  });
});

it('should work with imageData format', function(done) {
  var c = fs.readFileSync(__dirname + '/image.png');
  var img = new ImageParser(c);
  img.parse((err) => {
    if (err) {
      return done(err);
    }
    var qr = new QrCode();
    qr.callback = function(result) {
      expect(result).to.equal('Test');
      done();
    };
    qr.decode({
      height: img.height(),
      width: img.width(),
      data: img._imgBuffer
    });
  });
});
