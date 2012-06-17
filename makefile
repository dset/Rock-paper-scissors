all:
	juicer merge -s -f -o rockpaperscissors.min.js \
		src/moves.js \
		src/observable.js \
		src/computer.js \
		src/userchoicecontroller.js \
		src/computerchoicecontroller.js \
		src/resultcontroller.js \
		src/rockpaperscissors.js