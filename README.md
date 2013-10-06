For when you hit the bottom... of a dom element while scrolling.

### Motivation

Infinite scrolling plugins do **way too much**: 
internally keep track of a scroll hitting the bottom of an element, fetch, then render, and rebind.

If you have a backbone app that requires infinite scrolling, then you often 
have a list view that listens to a collection and handles rendering. **Infinite scrolling
should be as simple as being notified when you've hit the bottom of the (scrollable) element,
and letting you call fetch on the proper collection.**

### Usage

```javascript
$(selector).smack()
    .done(function () {
      // Do stuff like fetch from a collection
    });


// Detect when smacking the bottom of the page itself
$(window).smack()
    .done(function () {
      // Do stuff like fetch from a collection
    });    
```

### Demo:

http://jsfiddle.net/mrjoelkemp/TLdSW/