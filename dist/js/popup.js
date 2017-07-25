(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

		let toggleParent = e.target.parentNode;

		if ( toggleParent ) {
			( toggleParent.classList.contains( 'is-active' ) ) ? toggleParent.classList.remove( 'is-active') : toggleParent.classList.add( 'is-active' );
		}
	}
} );

formElem.addEventListener( 'submit', function( e ) {
	e.preventDefault();

	var formData = new FormData( e.target );
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

	// Reset inputs.
	e.target.reset();

	send( { msg: 'UPDATE', queries: [ query ] } );
} );

},{}]},{},[1])