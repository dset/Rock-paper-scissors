TestCase("userChoiceControllerTest", {
	setUp: function () {
		this.ucc = new DSET.rockpaperscissors.UserChoiceController();
	},
	
	"test userChoiceController should be object": function () {
		assertObject(this.ucc);
	},
	
	"test userChoiceController should be observable": function () {
		assertFunction(this.ucc.addObserver);
		assertFunction(this.ucc.hasObserver);
		assertFunction(this.ucc.notify);
	}
});

TestCase("userChoiceControllerSetViewTest", {
	setUp: function () {
		/*:DOC view = 	<div>
		 * 					<img src="rock.png"></img>
		 * 					<img src="paper.png"></img>
		 * 					<img src="scissors.png"></img>
		 * 				</div> */
		this.view.addEventListener = sinon.spy();
		this.ucc = new DSET.rockpaperscissors.UserChoiceController();
	},
	
	"test should have setView method": function () {
		assertFunction(this.ucc.setView);
	},
	
	"test should throw if view does not contain at least 3 imgs": function () {
		/*:DOC wrongview = 	<div><img src="rock.png"></img></div> */
		var u = this.ucc;
		var v = this.wrongview;
		assertException(function () {
			u.setView(v);
		}, "SyntaxError");
	},
	
	"test setView should register click listener": function () {
		this.ucc.setView(this.view);
		
		assertTrue(this.view.addEventListener.called);
		assertEquals("click", this.view.addEventListener.getCall(0).args[0]);
		assertFunction(this.view.addEventListener.getCall(0).args[1]);
	},
	
	"test setView should use bound handleClick as click listener": function () {
		this.ucc.handleClick = sinon.spy();
		this.ucc.setView(this.view);
		this.view.addEventListener.getCall(0).args[1]({});
		
		assertTrue(this.ucc.handleClick.called);
		assertTrue(this.ucc.handleClick.calledOn(this.ucc));
	}
});

TestCase("userChoiceControllerHandleClick", {
	setUp: function () {
		/*:DOC view = 	<div>
		 * 					<img src="rock.png"></img>
		 * 					<img src="paper.png"></img>
		 * 					<img src="scissors.png"></img>
		 * 					<p>SomeText</p>
		 * 				</div> */
		this.ucc = new DSET.rockpaperscissors.UserChoiceController();
		this.ucc.setView(this.view);
		this.observer = sinon.stub();
		this.ucc.addObserver("userChoice", this.observer);
		this.imgs = this.view.getElementsByTagName("img");
	},
	
	"test should notify with rock when first image clicked": function () {
		this.ucc.handleClick( {target: this.imgs[0]});
		
		assertTrue(this.observer.calledOnce);
		assertTrue(this.observer.getCall(0).args[0] instanceof DSET.rockpaperscissors.Rock);
	},
	
	"test should notify with paper when second image clicked": function () {
		this.ucc.handleClick( {target: this.imgs[1]} );
		
		assertTrue(this.observer.calledOnce);
		assertTrue(this.observer.getCall(0).args[0] instanceof DSET.rockpaperscissors.Paper);
	},
	
	"test should notify with scissors when third image clicked": function () {
		this.ucc.handleClick( {target: this.imgs[2]} );
		
		assertTrue(this.observer.calledOnce);
		assertTrue(this.observer.getCall(0).args[0] instanceof DSET.rockpaperscissors.Scissors);
	},
	
	"test should not notify if nonimage clicked": function () {
		var element = this.view.getElementsByTagName("p")[0];
		this.ucc.handleClick( {target: element} );
		
		assertFalse(this.observer.called);
	}
});