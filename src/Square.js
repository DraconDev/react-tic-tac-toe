import React from "react";

const Square = ({ value, onSquareClick, bgColor }) => {
	// const [value, setValue] = useState("_");
	return (
		<button
			className="square"
			onClick={onSquareClick}
			style={{ backgroundColor: bgColor }}
		>
			{value}
		</button>
	);
};

export default Square;
