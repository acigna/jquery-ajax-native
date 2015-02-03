# Description
XHR2 provides a response attribute, that contains a converted response to a native object, depending on the responseType ("arraybuffer", "blob", "document", "json"). 

See:

https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html#the-response-attribute
http://www.html5rocks.com/en/tutorials/file/xhr2/?redirect_from_locale=fr

Using this mechanism provides better performances compared to a javascript way of conversion. For example, converting an ArrayBuffer, leads to a heavy loop (See: http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String).

This jQuery Plugin adds XHR2 responseType support, that is currently lacking support in jQuery.ajax and probably remains
in the future (See the last comments on this [pull request](https://github.com/jquery/jquery/pull/1525)).

Please, take a look at XHR2 current support [here](http://caniuse.com/#feat=xhr2) for more precision on the support status.

# Usage
The plugin provides two means to get a native ajax response as follows.

## Using jQuery.ajax
The Plugin provides the native data type for the ajax method that you should use to have a native response. You should also precise the responseType on xhrFields to precise the expected native data type. This usage method allows more customization but
it is more verbose.
``` javascript
$.ajax({
    dataType: 'native',
    url: dataUrl,
    xhrFields: {
      responseType: 'arraybuffer'
    },
    success: successCallback
});
```

## Using jQuery.getNative wrapper method
The getNative method is a shortened version of the previous method. It allows to specify a success callback only, but returns a promise, and so permets to add the error case.
``` javascript
//With success callback
$.getNative( dataUrl, successCallback );
//Using the returned promise (success and error callbacks respectively)
$.getNative( dataUrl ).then( successCallback, errorCallback );
```
