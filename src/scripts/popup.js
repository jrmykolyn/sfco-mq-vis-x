// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var submitCta = document.getElementById( 'submit' );
var formElem = document.querySelector( 'form' );
var featureWrapElems = document.querySelectorAll( '.query-feature-wrap' );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function send( data ) {
	var data = ( data && typeof data === 'object' ) ? data : {};

	chrome.tabs.query( { active: true, currentWindow: true }, function( tabs ) {
		var tab = tabs[ 0 ];

		chrome.tabs.sendMessage( tab.id, data, function( response ) {
			/// TEMP - DO THE CALLBACK THING
		} );
	} );
}

// --------------------------------------------------
// REGISTER EVENTS
// --------------------------------------------------
window.onload = function( e ) {
	send( { msg: 'INIT' } );
}

window.addEventListener( 'click', function( e ) {
	if ( e.target.classList.contains( 'js--toggle' ) ) {
		e.preventDefault();

		let toggleParent = e.target.parentNode.parentNode; /// FIXME[@jrmykolyn] - Too brittle.

		if ( toggleParent ) {
			( toggleParent.classList.contains( 'is-active' ) ) ? toggleParent.classList.remove( 'is-active') : toggleParent.classList.add( 'is-active' );
		}
	}
} );

formElem.addEventListener( 'submit', function( e ) {
	e.preventDefault();

	var formData = new FormData( e.target ); /// TEMP
	var entries = formData.entries();
	var query = {
		type: 'all',
		features: []
	};

	for ( let entry of entries ) {
		let [ key, value ] = entry;

		if ( value ) {
			query.features.push( { key, value } );
		}
	}

	send( { msg: 'UPDATE', queries: [ query ] } );
} );
