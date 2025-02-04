import {AppData} from './app.js';

/*
	Makes dealing cookies easier.
*/

export default class Cookie {
	constructor(name, value, prependNameWithVersion = true) {
		if ( prependNameWithVersion ) {
			this.name	= `OCLibrary_${AppData.version}_${name}`;
		} else {
			this.name	= name;
		}
		this.value		= value;
	}

	store(exdays = 365) {
		let date	= new Date();
    	date.setTime(date.getTime() + (exdays*24*60*60*1000));
		let expires = "expires=" + date.toUTCString();
		document.cookie = this.toString() + expires + ";path=/";
	}

	destroy() {
		this.store(0);
	}

	toString() {
		return this.name + "=" + this.value + ";"
	}

	static get(nameInput, prependNameWithVersion = true) {
		let cookies		= document.cookie.split("; ");
		var returnValue = null;

		if ( prependNameWithVersion ) {
			name = `OCLibrary_${AppData.version}_${nameInput}`;
		} else {
			name = nameInput;
		}

		cookies.forEach(cookie => {
			let cookieArray	= cookie.split("=");
			let cookieName	= cookieArray[0];
			if ( cookieName == name ) {
				cookieArray.shift();
				returnValue = new Cookie(cookieName, cookieArray.join("="), false);
			}
		});

		return returnValue;
	}
}
