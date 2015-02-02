var assert = chai.assert,
    ajaxSettings = jQuery.ajaxSettings;

suite( 'jQuery AJAX Native plugin', function () 
{
    suite( 'AJAX settings initialization', function () {
        test('ajaxSettings.responseFields.native well set', function () {
            assert.equal(ajaxSettings.responseFields.native, 'responseNative', 
            'ajaxSettings native should equal to responseNative');
        });
        test('ajaxSettings.converters["* native"] well set', function () {
            assert.equal($.ajaxSettings.converters['* native'], true, 
            'ajaxSettings native should equal to responseNative');
        });
    });

    //Success Callback with native request test  
    var successCallbackTest = function ( done ) {
        return function( data, status, jqXHR ) {
            assert.strictEqual( data, jqXHR.responseNative, 'The responseNative attribute contains the response' );
            assert.ok(data instanceof ArrayBuffer, 'The data retrieved is an ArrayBuffer instance' );
            var array = new Uint8Array( data );
            assert.strictEqual(array.length, 4, 'Check for response length' );
            assert.deepEqual( [ array[ 0 ], array[ 1 ], array[ 2 ], array[ 3 ] ], [ 0, 1 ,2 , 3 ], 'Check for response content' );
            done();
        }
    }

    suite( 'AJAX native data type behaviour', function () {
        test( 'native dataType ajax request', function ( done ) {
            $.ajax({
                dataType: 'native',
                url: 'native.bin',
                xhrFields: {
                    responseType: 'arraybuffer'
                },
                success: successCallbackTest( done )
            });
        });
    });

    suite( '$.getNative behaviour', function () {
        test('native dataType ajax request', function ( done ) {
            $.getNative( 'native.bin', successCallbackTest( done ) );
        });
    });

});