DSET.util = (function () {
	function Observable() {
		this.observers = {};
	}
	
	Observable.prototype.addObserver = function (event, observer) {
		if(typeof observer !== "function") {
			throw new TypeError("observer should be function");
		}
		
		if(!this.observers[event]) {
			this.observers[event] = [];
		}
		
		this.observers[event].push(observer);
	};
	
	Observable.prototype.hasObserver = function (event, observer) {
		if(!this.observers[event]) {
			return false;
		}
		return this.observers[event].indexOf(observer) >= 0;
	};
	
	Observable.prototype.notify = function (event) {
		if(!this.observers[event]) {
			return;
		}
		
		var args = Array.prototype.slice.call(arguments, 1);
		this.observers[event].forEach( function (observer) {
			observer.apply(this, args);
		}, this);
	};
	
	return {
		Observable: Observable
	};
}());