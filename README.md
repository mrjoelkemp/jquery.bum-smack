For when you hit the bottom (or top)... of a dom element while scrolling.

### Motivation

Infinite scroll plugins do **way too much**:
internally keeping track of a scroll hitting the bottom of an element, fetching data,
rerendering, and then rebinding to repeat the process.

If you have a backbone app that requires infinite scrolling, then you often
have a list view that listens to a collection and handles rendering. **Infinite scrolling
should be as simple as being notified when you've hit the bottom of the (scrollable) element,
and letting you call fetch on the proper collection.**

After you've `smack`ed the bottom (or top), you have the option to call smack (if you want to be notified again).
For example, after you've loaded another page of results, you would want to detect when you've
smacked the bottom of the element. If you don't have any more results, then you wouldn't want to keep being notified.

### Demo:

http://jsfiddle.net/TLdSW/3/

### Usage

Detect when you've smacked to the bottom (default) of the element

```javascript
$(selector).smack()
    .done(function () {
      // Do stuff like fetch from a collection
    });
```

Detect when you've smacked the top of the element

```javascript
$(selector).smack({ edge: 'top' })
    .done(function () {
    });
```


Detect when you've smacked 80% of the way to the bottom of the element

```javascript
$(selector).smack({ threshold: 0.8 })
    .done(function () {
    });
```

Detect when you've smacked 80% of the way to the top of the element

```javascript
$(selector).smack({ edge: 'top', threshold: 0.8 })
    .done(function () {
    });
```

Detect when you've smacked within 200px of the bottom of the element

```javascript
$(selector).smack({ threshold: '200px' })
    .done(function () {
    });
```

Detect when you've smacked within 200px of the top of the element

```javascript
$(selector).smack({ edge: 'top', threshold: '200px' })
    .done(function () {
    });
```

Detect when smacking the bottom of the page itself

```javascript
$(window).smack()
    .done(function () {
    });
```

### Example infinite scroll
```javascript
// Infinite scroll binding
var that = this;
(function infiniteScroll () {

    $(window).smack({ threshold: 0.8 })
      .then(function () {
        return that.collection.fetch();
      })
      .done(function (resp) {
        // However your response indicates more results
        if (resp.hasMore) infiniteScroll();
      });

})();
```

### Options

*threshold*: float between 0 and 1 or string px value in the format `'150px'`

* represents scrolling through anywhere from 0 to 100% of the element or, if a pixel value is supplied,
the distance from the bottom of the element

* default = 1; you're notified when you hit the bound edge of the element

*edge*: allows you to bind to either the `'top'` or `'bottom'` (default) edge of an element

### Building & Testing

* To build, run `npm install` and then `grunt`
* To run the tests, point your browser to `test/runner.html`