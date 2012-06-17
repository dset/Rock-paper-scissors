(function () {
	function ResultController() {};
	
	ResultController.prototype.setView = function (view) {
		if(!view || view.getElementsByTagName("p").length < 3) {
			throw new SyntaxError("view must have at least three p-tags");
		}
		
		var ptags = view.getElementsByTagName("p");
		ptags[0].className = "js-invisible";
		ptags[1].className = "js-invisible";
		ptags[2].className = "js-invisible";
		
		this.view = view;
	};
	
	ResultController.prototype.onUserChoice = function (move) {
		this.userMove = move;
		
		if(this.computerMove) {
			this.determineWinner();
			this.userMove = undefined;
			this.computerMove = undefined;
		}
	};
	
	ResultController.prototype.onComputerChoice = function (move) {
		this.computerMove = move;
		
		if(this.userMove) {
			this.determineWinner();
			this.userMove = undefined;
			this.computerMove = undefined;
		}
	};
	
	ResultController.prototype.determineWinner = function () {
		var ptags = this.view.getElementsByTagName("p");
		for(var i = 0; i < 3; i++) {
			ptags[i].className = "js-invisible";
		}
		
		if (this.userMove.compareTo(this.computerMove) < 0) {
			ptags[0].className = "js-visible";
		} else if (this.userMove.compareTo(this.computerMove) === 0) {
			ptags[1].className = "js-visible";
		} else if (this.userMove.compareTo(this.computerMove) > 0) {
			ptags[2].className = "js-visible";
		}
	};
	
	DSET.rockpaperscissors.ResultController = ResultController;
}());