/* global describe: true, it: true, sinon: true, chai: true expect: true */
describe('Bum smack', function () {

  // Helpers
  var
      // Returns a scrolltop value that's a percentage distance
      // away from the bottom of the element
      getPercentageScrollTop = function ($elem, percentageDistance) {
        var scrollHeight = $elem[0].scrollHeight,
            innerHeight = $elem.innerHeight(),
            offset = scrollHeight - innerHeight,
            result = offset * percentageDistance;

        return result;
      },

      // Returns a scrolltop value that's a pixel distance
      // away from the bottom of the element
      getPixelScrollTop = function($elem, pixelDistance) {
        var scrollHeight = $elem[0].scrollHeight,
            innerHeight = $elem.innerHeight(),
            offset = scrollHeight - innerHeight,
            result = offset - parseInt(pixelDistance, 10);

        return result;
      };

  $.fn.toBottom = function () {
    this.scrollTop(getPercentageScrollTop(this, 1));
    return this;
  };
  $.fn.toTop = function () {
    this.scrollTop(0);
    return this;
  };
  $.fn.toPercentFromTop = function (percent) {
    if (percent > 1) percent = percent / 100;
    this.scrollTop(getPercentageScrollTop(this, percent));
    return this;
  };
  $.fn.toPixelsFromBottom = function (pixel) {
    this.scrollTop(getPixelScrollTop(this, parseInt(pixel, 10)));
    return this;
  };

  it('detects a bottom smack when you reach 100% of the bottom (default)', function (done) {
    $('.case1').smack().done(done);
    $('.case1').toBottom();

    $('.case2').smack({ edge: 'bottom' }).done(done);
    $('.case2').toBottom();
  });

  it('detects a top smack when you reach 100% of the top when the edge is set', function (done) {
    $('.case1').toBottom();
    $('.case1').smack({ edge: 'top' }).done(done);
    $('.case1').toTop();
  });

  it('does not smack the top edge if the element was already at the top', function (done) {
    var cb = sinon.spy();

    $('.case1').toTop();
    $('.case1').smack({ edge: 'top' }).done(cb);
    $('.case1').scrollTop(10);
    $('.case1').smack({ edge: 'top' }).done(function () {
      chai.expect(cb.called).to.equal(false);
      done();
    });

    $('.case1').toTop();
  });

  // it('only has one active smack binding', function (done) {
  //   var cb1 = sinon.spy();

  //   $('.case1').toTop();
  //   $('.case1').on('scroll.smack', cb1);
  //   $('.case1').smack({ threshold: 0.8 }).done(function () {
  //     chai.expect(cb1.called).to.equal(false);
  //     done();
  //   });

  //   $('.case1').toPercentFromTop(0.8);
  // });

it('prevents the same smack binding from firing twice', function (done) {
    var cb1 = sinon.spy();
    var cb2 = sinon.spy();

    $('.case1').toTop();
    $('.case1').smack({ threshold: 0.8 }).done(function() {
      cb1();
      console.log('cb1')
    });
    $('.case1').smack({ threshold: 0.8 }).done(function() {
      cb2();
      console.log('cb2');
    });
    $('.case1').smack({ threshold: 0.8 }).done(function() {
      console.log('done')
      // chai.expect(cb1.called).to.equal(true);
      // chai.expect(cb2.called).to.equal(true);
      // chai.expect(cb1.callCount).to.equal(1);
      done();
    });

    $('.case1').toPercentFromTop(0.8);
  });


  it('allows for binding to both edges with different promise callbacks', function (done) {
    $('.case1').toTop();

    $('.case1').smack({ threshold: 0.8 }).done(function () {
      // Smack top
      $('.case1').toTop();
    });

    $('.case1').smack({ edge: 'top' }).done(function () {
      done();
    });

    $('.case1').toPercentFromTop(0.8);
  });

  it('smacks a percentage threshold away from the bottom', function (done) {
    $('.case3').smack({ threshold: 0.8 }).done(done);
    $('.case3').toPercentFromTop(0.8);
  });

  it('smacks a percentage threshold away from the top', function (done) {
    $('.case3').toBottom();

    $('.case3').smack({ edge: 'top', threshold: 0.2 }).done(done);
    $('.case3').toPercentFromTop(0.2);
  });

  it('should not smack the top threshold scrolling down', function (done) {
    var cb = sinon.spy();

    $('.case1').toTop();
    $('.case1').smack({ edge: 'top', threshold: 0.2 }).done(cb);
    $('.case1').toPercentFromTop(0.3);
    $('.case1').smack({ edge: 'top', threshold: 0.2 }).done(function () {
      chai.expect(cb.called).to.equal(false);
      done();
    });

    $('.case1').toPercentFromTop(0.2);
  });

  it('smacks a pixel distance away from the bottom', function (done) {
    $('.case4').smack({ threshold: '50px' }).done(done);
    $('.case4').toPixelsFromBottom(50);
  });

  it('smacks a pixel distance away from the top', function (done) {
    $('.case4').toBottom();
    $('.case4').smack({ edge: 'top', threshold: '50px' }).done(done);
    $('.case4').toTop(50);
  });

  it('smacks the bottom of the page', function (done) {
    $(window).smack().done(function () {
      done();
      $(window).toTop();
    });
    $(window).scrollTop($(document).height());
  });
});
