( function() {
	// --------------------------------------------------
	// IMPORT MODULES
	// --------------------------------------------------
	var MqVis = require( 'sfco-mq-vis' );

	// --------------------------------------------------
	// DECLARE VARS
	// --------------------------------------------------
	/// TODO[@jrmykolyn] - Review, remove if possible.
	var CONFIG = {
		identifiers: {
			wrapper: '.sfco-mq-vis--wrapper'
		}
	};
	var mqVisInstance = null;

	// --------------------------------------------------
	// DECLARE FUNCTIONS
	// --------------------------------------------------
	function init( opts ) {
		if ( !mqVisInstance ) {
			mqVisInstance = new MqVis( opts );
		}
	}

	function update( opts ) {
		if ( !mqVisInstance || !mqVisInstance instanceof MqVis ) {
			console.error( 'Please ensure that an `MqVis` instance has been created before trying to update it.' );
		}

		mqVisInstance.update( opts );
	}

	function handleRequest( request ) {
		request = ( request && typeof request === 'object' ) ? request : null;

		switch ( request.msg ) {
			case 'INIT':
				init( { queries: request.queries } );
				break;
			case 'UPDATE':
				update( { queries: request.queries } );
				break;
			default:
				// DO NO THINGS;
		}
	}

	try {
		chrome.extension.onMessage.addListener( function( request, sender, sendResponse  ) {
			console.log( 'INSIDE `onMessage`' ); /// TEMP
			console.log( request ); /// TEMP

			handleRequest( request );
		} );
	} catch ( err ) {
		console.log( `Media Query Visualizer failed to initialize!` );
		console.log( err );
	}
} )();
