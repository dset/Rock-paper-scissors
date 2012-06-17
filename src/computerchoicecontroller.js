(function () {
	var Rock = DSET.rockpaperscissors.Rock;
	var Paper = DSET.rockpaperscissors.Paper;
	var Scissors = DSET.rockpaperscissors.Scissors;
	
	function ComputerChoiceController(computer) {
		this.computer = computer;
	};
	
	ComputerChoiceController.prototype = new DSET.util.Observable();
	
	ComputerChoiceController.prototype.setView = function (view) {
		if(isInvalid(view)) {
			throw new SyntaxError("view has to have at least 3 img tags");
		}
		
		var imgs = view.getElementsByTagName("img");
		for(var i = 0; i < 3; i++) {
			imgs[i].className = "js-invisible";
		}
		
		this.view = view;
	};
	
	function isInvalid(view) {
		return !view || !view.getElementsByTagName || view.getElementsByTagName("img").length < 3;
	}
	
	ComputerChoiceController.prototype.onUserChoice = function () {
		var imgs = this.view.getElementsByTagName("img");
		for(var i = 0; i < 3; i++) {
			imgs[i].className = "js-invisible";
		}
		var move = this.computer.getRandomMove();
		if (move instanceof Rock) {
			imgs[0].className = "js-visible";
		} else if (move instanceof Paper) {
			imgs[1].className = "js-visible";
		} else if (move instanceof Scissors) {
			imgs[2].className = "js-visible";
		}
		this.notify("computerChoice", move);
	};
	
	DSET.rockpaperscissors.ComputerChoiceController = ComputerChoiceController;
}());