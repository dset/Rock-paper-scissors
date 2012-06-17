TestCase("computerTest", {
	"test computer should be object": function () {
		var computer = new DSET.rockpaperscissors.Computer(null);
		assertObject(computer);
	},
	
	"test computer should generate rocks": function () {
		var computer = new DSET.rockpaperscissors.Computer(function () {
			return Math.random() * 0.33;
		});
		for (var i = 0; i <= 10; i++) {
			assertTrue(computer.getRandomMove() instanceof DSET.rockpaperscissors.Rock);
		}
	},
	
	"test computer should generate paper": function () {
		var computer = new DSET.rockpaperscissors.Computer(function () {
			return 0.333334 + Math.random() * 0.33;
		});
		for (var i = 0; i <= 10; i++) {
			assertTrue(computer.getRandomMove() instanceof DSET.rockpaperscissors.Paper);
		}
	},
	
	"test computer should generate scissors": function () {
		var computer = new DSET.rockpaperscissors.Computer(function () {
			return 0.6666667 + Math.random() * 0.33;
		});
		for (var i = 0; i <= 10; i++) {
			assertTrue(computer.getRandomMove() instanceof DSET.rockpaperscissors.Scissors);
		}
	}
});