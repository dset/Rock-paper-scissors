TestCase("scissorsTest", {
	setUp: function () {
		this.scissors  = new DSET.rockpaperscissors.Scissors();
	},
	
	tearDown: function () {
		delete this.scissors;
	},
	
	"test scissors should be object": function () {
		assertObject(this.scissors);
	},
	
	"test scissors draws scissors": function () {
		assertEquals(0, this.scissors.compareTo(this.scissors));
	},
	
	"test scissors beats paper": function () {
		var paper = new DSET.rockpaperscissors.Paper();
		assertTrue(this.scissors.compareTo(paper) > 0);
	},
	
	"test scissors loses rock": function () {
		var rock = new DSET.rockpaperscissors.Rock();
		assertTrue(this.scissors.compareTo(rock) < 0);
	}
});