import React, { useState } from "react";
import { Board } from "./Board";

export const Game = () => {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];
	const [reversedList, setReversedList] = useState(false);

	function handleReverse() {
		setReversedList(!reversedList);
	}

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}

	function makeListOfMoves(history, currentMove) {
		let rowColumn = 0;
		if (history.length >= 2) {
			rowColumn = history[history.length - 1].findIndex(
				(item, index) => item !== history[history.length - 2][index]
			);
		}
		const listOfMoves = [];
		const moves = history.map((squares, move) => {
			let description;
			if (move === currentMove) {
				description = "Current move";
			} else if (move > 0) {
				description = `Go to move ${move} Row:${
					Math.floor(rowColumn / 3) + 1
				} Col:${(rowColumn % 3) + 1}`;
			} else {
				description = "Go to game start";
			}
			listOfMoves.push(
				<li keys={move}>
					<button onClick={() => jumpTo(move)}>{description}</button>
				</li>
			);
		});
		return reversedList ? listOfMoves.reverse() : listOfMoves;
	}

	let moves = makeListOfMoves(history, currentMove);

	return (
		<div className="game">
			<div className="game-board">
				<Board
					xIsNext={xIsNext}
					squares={currentSquares}
					onPlay={handlePlay}
				/>
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
			<div className="">
				<button onClick={handleReverse}>Toggle order</button>
			</div>
		</div>
	);
};
