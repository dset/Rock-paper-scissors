TestCase("observableTest", {
	setUp: function () {
		this.observable = new DSET.util.Observable();
		this.observer1 = sinon.stub();
		this.observer2 = sinon.stub();
	},
	
	"test observable should be object": function () {
		assertObject(this.observable);
	},
	
	"test observable should have addObserver method": function () {
		assertFunction(this.observable.addObserver);
	},
	
	"test addObserver should expect functions": function () {
		var ob = this.observable;
		assertException(function () {
			ob.addObserver("event", {});
		}, "TypeError");
	},
	
	"test observable should have hasObserver method": function () {
		assertFunction(this.observable.hasObserver);
	},
	
	"test observable should have added observers": function () {
		this.observable.addObserver("event1", this.observer1);
		this.observable.addObserver("event2", this.observer2);
		assertTrue(this.observable.hasObserver("event1", this.observer1));
		assertTrue(this.observable.hasObserver("event2", this.observer2));
	},
	
	"test hasObserver should not throw for unobserved events": function () {
		var ob = this.observable;
		assertNoException(function () {
			ob.hasObserver("eventWithNoObservers", null);
		});
	},
	
	"test observable should have notify method": function () {
		assertFunction(this.observable.notify);
	},
	
	"test observable should notify observers": function () {
		this.observable.addObserver("event", this.observer1);
		this.observable.addObserver("event", this.observer2);
		this.observable.notify("event");
		assertTrue(this.observer1.calledOnce);
		assertTrue(this.observer2.calledOnce);
	},
	
	"test notify should not throw for unobserved events": function () {
		var ob = this.observable;
		assertNoException(function () {
			ob.notify("eventWithNoObservers");
		});
	},
	
	"test notify should only notify relevant observers": function () {
		var observer3 = sinon.stub();
		this.observable.addObserver("someEvent", this.observer1);
		this.observable.addObserver("someEvent", this.observer2);
		this.observable.addObserver("otherEvent", observer3);
		this.observable.notify("someEvent");
		assertTrue(this.observer1.called);
		assertTrue(this.observer2.called);
		assertFalse(observer3.called);
	},
	
	"test notify should bind observable as this in observer": function () {
		this.observable.addObserver("event", this.observer1);
		this.observable.notify("event");
		assertTrue(this.observer1.calledOn(this.observable));
	},
	
	"test notify should pass data arguments to observer": function () {
		this.observable.addObserver("event", this.observer1);
		var args = ["bla", "ble", {}];
		this.observable.notify("event", args[0], args[1], args[2]);
		assertTrue(this.observer1.calledWithExactly(args[0], args[1], args[2]));
	}
});