TestCase("resultControllerTest", {
	"test should be object": function () {
		var rc = new DSET.rockpaperscissors.ResultController();
		assertObject(rc);
	}
});

TestCase("resultControllerSetViewTest", {
	setUp: function () {
		/*:DOC view = <div><p>Hello</p><p>World</p><p>!</p></div> */
		this.ptags = this.view.getElementsByTagName("p");
		this.rc = new DSET.rockpaperscissors.ResultController();
	},
	
	"test should have setView method": function () {
		assertFunction(this.rc.setView);
	},
	
	"test should set class of three first p-tags": function () {
		this.rc.setView(this.view);
		
		assertClassName("js-invisible", this.ptags[0]);
		assertClassName("js-invisible", this.ptags[1]);
		assertClassName("js-invisible", this.ptags[2]);
	},
	
	"test should not set class of additional tags": function () {
		var additional = document.createElement("p");
		this.view.appendChild(additional);
		
		this.rc.setView(this.view);
		
		assertClassName("", this.ptags[3]);
	},
	
	"test should throw exception if view undefined": function () {
		assertException((function () {
			this.rc.setView();
		}).bind(this), "SyntaxError");
	},
	
	"test should throw if view does not have at least three p-tags": function () {
		this.view.removeChild(this.view.firstChild);
		assertException((function () {
			this.rc.setView(this.view);
		}).bind(this), "SyntaxError");
	}
});

TestCase("resultControllerOnChoiceTest", {
	setUp: function () {
		this.rc = new DSET.rockpaperscissors.ResultController();
		this.rc.determineWinner = sinon.spy();
	},
	
	"test should have onUserChoice method": function () {
		assertFunction(this.rc.onUserChoice);
	},
	
	"test should have onComputerChoice method": function () {
		var rc = new DSET.rockpaperscissors.ResultController();
		assertFunction(rc.onComputerChoice);
	},
	
	"test should not determine winner if only user choice": function () {
		this.rc.onUserChoice.call(this.rc);
		assertFalse(this.rc.determineWinner.called);
	},
	
	"test should not determine winner if only computer choice": function () {
		this.rc.onComputerChoice.call(this.rc);
		assertFalse(this.rc.determineWinner.called);
	},
	
	"test should determine winner on user choice after computer choice": function () {
		this.rc.onComputerChoice.call(this.rc, {});
		
		this.rc.onUserChoice.call(this.rc);
		
		assertTrue(this.rc.determineWinner.called);
	},
	
	"test should determine winner on computer choice after user choice": function () {
		this.rc.onUserChoice.call(this.rc, {});
		
		this.rc.onComputerChoice.call(this.rc);
		
		assertTrue(this.rc.determineWinner.called);
	},
	
	"test should reset after winner determined": function () {
		this.rc.onUserChoice.call(this.rc, {compareTo: sinon.stub()});
		this.rc.onComputerChoice.call(this.rc, {compareTo: sinon.stub()});
		this.rc.determineWinner.reset();
		
		this.rc.onUserChoice.call(this.rc, {});
		
		assertFalse(this.rc.determineWinner.called);
	}
});

TestCase("resultControllerDetermineWinnerTest", {
	setUp: function () {
		/*:DOC view = <div><p>Computer Wins!</p><p>Draw!</p><p>Player wins!</p></div> */
		this.rc = new DSET.rockpaperscissors.ResultController();
		this.rc.setView(this.view);
		this.ptags = this.view.getElementsByTagName("p");
	},
	
	"test should have determineWinner method": function () {
		assertFunction(this.rc.determineWinner);
	},
	
	"test should set class of first p-tag on computer win": function () {
		this.rc.onUserChoice.call(this.rc, new DSET.rockpaperscissors.Scissors());
		this.rc.onComputerChoice.call(this.rc, new DSET.rockpaperscissors.Rock());
		
		assertClassName("js-visible", this.ptags[0]);
	},
	
	"test should set class of second p-tag on draw": function () {
		this.rc.onUserChoice.call(this.rc, new DSET.rockpaperscissors.Rock());
		this.rc.onComputerChoice.call(this.rc, new DSET.rockpaperscissors.Rock());
		
		assertClassName("js-visible", this.ptags[1]);
	},
	
	"test should set class of third p-tag on user win": function () {
		this.rc.onUserChoice.call(this.rc, new DSET.rockpaperscissors.Paper());
		this.rc.onComputerChoice.call(this.rc, new DSET.rockpaperscissors.Rock());
		
		assertClassName("js-visible", this.ptags[2]);
	},
	
	"test should reset class of previous p-tag": function () {
		this.rc.onUserChoice.call(this.rc, new DSET.rockpaperscissors.Rock());
		this.rc.onComputerChoice.call(this.rc, new DSET.rockpaperscissors.Rock());
		this.rc.onUserChoice.call(this.rc, new DSET.rockpaperscissors.Scissors());
		this.rc.onComputerChoice.call(this.rc, new DSET.rockpaperscissors.Rock());
		
		assertClassName("js-invisible", this.ptags[1]);
	}
});