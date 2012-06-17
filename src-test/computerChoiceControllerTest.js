TestCase("computerChoiceControllerTest", {
	setUp: function () {
		this.ccc = new DSET.rockpaperscissors.ComputerChoiceController();
	},
	
	"test should be object": function () {
		assertObject(this.ccc);
	},
	
	"test should be observable": function () {
		assertFunction(this.ccc.hasObserver);
		assertFunction(this.ccc.addObserver);
		assertFunction(this.ccc.notify);
	}
});

TestCase("computerChoiceControllerSetView", {
	setUp: function () {
		this.ccc = new DSET.rockpaperscissors.ComputerChoiceController();
	},
	
	"test should have setView method": function () {
		assertFunction(this.ccc.setView);
	},
	
	"test should throw if view undefined": function () {
		assertException((function () {
			this.ccc.setView(undefined);
		}).bind(this), "SyntaxError");
	},
	
	"test should throw if view does not have at least 3 img tags": function () {
		/*:DOC wrongview = 	<div><img src="rock.png"></img>
		 * 					<img src="paper.png"></img></div> */
		assertException((function () {
			this.ccc.setView(this.wrongview);
		}).bind(this), "SyntaxError");
	},
	
	"test should set class of 3 imgs in view": function () {
		/*:DOC view = 	<div><img src="rock.png"></img>
		 * 				<img src="paper.png"></img>
		 * 				<img src="scissors.png"></img>
		 * 				<img src="unrelated.png"></img></div> */
		
		this.ccc.setView(this.view);
		
		var imgs = this.view.getElementsByTagName("img");
		assertClassName("js-invisible", imgs[0]);
		assertClassName("js-invisible", imgs[1]);
		assertClassName("js-invisible", imgs[2]);
		assertEquals("", imgs[3].className);
	}
});

TestCase("computerChoiceControllerOnUserChoice", {
	setUp: function () {
		/*:DOC view = 	<div><img src="rock.png"></img>
		 * 				<img src="paper.png"></img>
		 * 				<img src="scissors.png"></img></div> */
		this.getRandomMove = sinon.stub();
		this.computer = {getRandomMove: this.getRandomMove};
		this.ccc = new DSET.rockpaperscissors.ComputerChoiceController(this.computer);
		this.ccc.notify = sinon.spy();
		this.ccc.setView(this.view);
	},
	
	"test should have onUserChoice method": function () {
		assertFunction(this.ccc.onUserChoice);
	},
	
	"test should notify with 'computerChoice'": function () {
		this.ccc.onUserChoice.call(this.ccc);
		
		assertTrue(this.ccc.notify.calledOnce);
		assertTrue(this.ccc.notify.calledWith("computerChoice"));
	},
	
	"test should notify with computer data": function () {
		var data = new DSET.rockpaperscissors.Rock();
		this.getRandomMove.returns(data);
		
		this.ccc.onUserChoice.call(this.ccc);
		
		assertSame(data, this.ccc.notify.getCall(0).args[1]);
	},
	
	"test should set class of rock image when rock": function () {
		this.getRandomMove.returns(new DSET.rockpaperscissors.Rock());
		
		this.ccc.onUserChoice.call(this.ccc);
		
		assertClassName("js-visible", this.view.getElementsByTagName("img")[0]);
	},
	
	"test should set class of paper image when paper": function () {
		this.getRandomMove.returns(new DSET.rockpaperscissors.Paper());
		
		this.ccc.onUserChoice.call(this.ccc);
		
		assertClassName("js-visible", this.view.getElementsByTagName("img")[1]);
	},
	
	"test should set class of scissors image when scissors": function () {
		this.getRandomMove.returns(new DSET.rockpaperscissors.Scissors());
		
		this.ccc.onUserChoice.call(this.ccc);
		
		assertClassName("js-visible", this.view.getElementsByTagName("img")[2]);
	},
	
	"test should reset class of previous move on new move": function () {
		this.getRandomMove.returns(new DSET.rockpaperscissors.Rock());
		
		this.ccc.onUserChoice.call(this.ccc);
		this.getRandomMove.returns(new DSET.rockpaperscissors.Paper());
		this.ccc.onUserChoice.call(this.ccc);
		
		assertClassName("js-invisible", this.view.getElementsByTagName("img")[0]);
	}
});