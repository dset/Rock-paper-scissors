(function () {
	var Rock = DSET.rockpaperscissors.Rock;
	var Paper = DSET.rockpaperscissors.Paper;
	var Scissors = DSET.rockpaperscissors.Scissors;
	
	function UserChoiceController() {};
	
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
	
	DSET.rockpaperscissors.UserChoiceController = UserChoiceController;
}());