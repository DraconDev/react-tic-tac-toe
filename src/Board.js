import React, { useState } from "react";
import Square from "./Square";

export const Board = ({ xIsNext, squares, onPlay }) => {
	// const [isNext, setIsNext] = useState(true);
	// const [squares, setSquares] = useState(Array(9).fill(null));
	const [gameState, setGameState] = useState(" ");
	const [winningSquares, setWinningSquares] = useState([]);

	function handleClick(i) {
		if (
			calculateWinner(squares) ||
			squares[i] === "X" ||
			squares[i] === "O"
		) {
			return;
		}
		const nextSquares = squares.slice();
		nextSquares[i] = xIsNext ? "X" : "O";
		// setSquares(nextSquares);

		onPlay(nextSquares);
		if (calculateWinner(nextSquares)) {
			setGameState(`${nextSquares[i]} is the winner`);
			setWinningSquares(calculateWinner(nextSquares));
		}
		if (
			squares.filter((square) => square != null).length + 1 ===
			squares.length
		) {
			// debugger;
			console.log("game over");
			setGameState("Draw");
		}

		// setGameState = `${i} is the winner`;
	}

	function calculateWinner(squares) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return lines[i];
			}
		}
		return null;
	}

	function setBoard() {
		const outerDivs = [];
		for (let i = 0; i < squares.length; i += 3) {
			const innerDivs = [];
			for (let j = i; j < i + 3; j++) {
				innerDivs.push(
					<Square
						key={j}
						value={squares[j]}
						onSquareClick={() => handleClick(j)}
						bgColor={winningSquares.includes(j) ? "green" : "gray"}
					/>
				);
			}
			outerDivs.push(<div className="board-row">{innerDivs}</div>);
		}
		return <>{outerDivs}</>;
	}

	return (
		<div className="game-table">
			{setBoard()}
			<div className="game-state">{gameState}</div>
		</div>
	);
};
