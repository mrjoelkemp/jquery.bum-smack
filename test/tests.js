/* global describe: true, it: true */
describe('Bum smack', function () {

  it('detect a smack when you reach 100% of the bottom (default)', function (done) {
    $('.case1').smack().done(done);
    $('.case1').scrollTop($('.case1')[0].scrollHeight);

    $('.case2').smack().done(done);
    $('.case2').scrollTop($('.case2')[0].scrollHeight);
  });

  it('detects a percentage threshold smack', function (done) {
    var $case3 = $('.case3'),
        scrollHeight = $case3[0].scrollHeight,
        innerHeight = $case3.innerHeight(),
        offset = scrollHeight - innerHeight,
        eightyPercent = offset * 0.8;

    $('.case3').smack({ threshold: 0.8 }).done(done);
    $('.case3').scrollTop(eightyPercent);
  });

  it('detects a pixel distance smack', function (done) {
    var $case4 = $('.case4'),
        scrollHeight = $case4[0].scrollHeight,
        innerHeight = $case4.innerHeight(),
        offset = scrollHeight - innerHeight,
        fiftyPixelsAway = offset - 50;

    $('.case4').smack({ threshold: '50px' }).done(done);
    $('.case4').scrollTop(fiftyPixelsAway);
  });

  it('detects smacking the bottom of the page', function (done) {
    $(window).smack().done(function () {
      done();
      $(window).scrollTop(0);
    });
    $(window).scrollTop($(document).height());
  });

});