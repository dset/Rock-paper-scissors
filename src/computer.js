(function () {
	function Computer(randomGenerator) {
		this.getRandomMove = function () {
			var rand = randomGenerator();
			if(rand < 1/3) {
				return new DSET.rockpaperscissors.Rock();
			} else if (rand < 2/3) {
				return new DSET.rockpaperscissors.Paper();
			} else {
				return new DSET.rockpaperscissors.Scissors();
			}
		};
	};
	
	DSET.rockpaperscissors.Computer = Computer;
}());