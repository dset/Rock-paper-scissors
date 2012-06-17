var DSET = {};
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
	
	return {
		Rock: Rock,
		Paper: Paper,
		Scissors: Scissors
	};
}());