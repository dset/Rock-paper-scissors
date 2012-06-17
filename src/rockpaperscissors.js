(function () {
	var userChoicesView = document.getElementById("userChoices");
	var ucc = new DSET.rockpaperscissors.UserChoiceController();
	ucc.setView(userChoicesView);
	
	var computerChoicesView = document.getElementById("computerChoices");
	var computer = new DSET.rockpaperscissors.Computer(Math.random);
	var ccc = new DSET.rockpaperscissors.ComputerChoiceController(computer);
	ccc.setView(computerChoicesView);
	ucc.addObserver("userChoice", ccc.onUserChoice.bind(ccc));
	
	var resultView = document.getElementById("resultDiv");
	var rc = new DSET.rockpaperscissors.ResultController();
	rc.setView(resultView);
	ucc.addObserver("userChoice", rc.onUserChoice.bind(rc));
	ccc.addObserver("computerChoice", rc.onComputerChoice.bind(rc));
}());