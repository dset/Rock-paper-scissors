DSET.rockpaperscissors = (function() {
	function Rock() {};
	
	Rock.prototype.compareTo = function (move) {
		if (move instanceof Rock) {
			return 0;
		} else if (move instanceof Scissors) {
			return 1;
		} else if (move instanceof Paper) {
			return -1;
		}
	};
	
	function Paper() {};
	
	Paper.prototype.compareTo = function (move) {
		if (move instanceof Paper) {
			return 0;
		} else if (move instanceof Rock) {
			return 1;
		} else if (move instanceof Scissors) {
			return -1;
		}
	};
	
	function Scissors() {};
	
	Scissors.prototype.compareTo = function (move) {
		if (move instanceof Scissors) {
			return 0;
		} else if (move instanceof Paper) {
			return 1;
		} else if (move instanceof Rock) {
			return -1;
		}
	};
	
	function Computer(randomGenerator) {
		this.getRandomMove = function () {
			var rand = randomGenerator();
			if(rand < 1/3) {
				return new Rock();
			} else if (rand < 2/3) {
				return new Paper();
			} else {
				return new Scissors();
			}
		};
	};
	
	function UserChoiceController() {
		
	};
	
	UserChoiceController.prototype = new DSET.util.Observable();
	
	UserChoiceController.prototype.setView = function (view) {
		if (isInvalid(view)) {
			throw new SyntaxError("View must contain at least 3 img tags");
		}
		
		view.addEventListener("click", this.handleClick.bind(this));
		this.view = view;
	};
	
	function isInvalid(view) {
		return !view || !view.getElementsByTagName || view.getElementsByTagName("img").length < 3;
	}
	
	UserChoiceController.prototype.handleClick = function (event) {
		var imgs = this.view.getElementsByTagName("img");
		if (imgs[0] === event.target) {
			this.notify("userChoice", new Rock());
		} else if (imgs[1] === event.target){
			this.notify("userChoice", new Paper());
		} else if (imgs[2] === event.target) {
			this.notify("userChoice", new Scissors());
		}
	};
	
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
	
	return {
		Rock: Rock,
		Paper: Paper,
		Scissors: Scissors,
		Computer: Computer,
		UserChoiceController: UserChoiceController,
		ComputerChoiceController: ComputerChoiceController,
		ResultController: ResultController
	};
}());