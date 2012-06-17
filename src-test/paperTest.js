TestCase("paperTest", {
	setUp: function () {
		this.paper = new DSET.rockpaperscissors.Paper();
	},
	
	tearDown: function () {
		delete this.paper;
	},
	
	"test paper should be object": function () {
		assertObject(this.paper);
	},
	
	"test paper draws paper": function () {
		assertEquals(0, this.paper.compareTo(this.paper));
	},
	
	"test paper beats rock": function () {
		var rock = new DSET.rockpaperscissors.Rock();
		assertTrue(this.paper.compareTo(rock) > 0);
	},
	
	"test paper loses scissors": function () {
		var scissors = new DSET.rockpaperscissors.Scissors();
		assertTrue(this.paper.compareTo(scissors) < 0);
	}
});