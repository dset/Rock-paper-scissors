TestCase("rockTest", {
	setUp: function () {
		this.rock = new DSET.rockpaperscissors.Rock();
	},
	
	tearDown: function () {
		delete this.rock;
	},
	
	"test rock should be object": function () {
		assertObject(this.rock);
	},
	
	"test rock draws rock": function () {
		assertEquals(0, this.rock.compareTo(this.rock));
	},
	
	"test rock beats scissors": function () {
		var scissors = new DSET.rockpaperscissors.Scissors();
		assertTrue(this.rock.compareTo(scissors) > 0);
	},
	
	"test rock loses paper": function () {
		var paper = new DSET.rockpaperscissors.Paper();
		assertTrue(this.rock.compareTo(paper) < 0);
	}
});