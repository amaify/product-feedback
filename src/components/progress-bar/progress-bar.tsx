import React from "react";

interface Props {
	delay: number;
}

function ProgressBar({ delay }: Props) {
	const [width, setWidth] = React.useState<string | number>("");
	React.useEffect(() => {
		frame();
		return () => cancelAnimationFrame(0);
	}, []);

	let endTime = Date.now() + delay;

	const frame = () => {
		let timeLeft = Math.max(0, endTime - Date.now());
		setWidth((100 * timeLeft) / delay);
		if (timeLeft === 0) return;
		requestAnimationFrame(frame);
	};

	const containerStyles = {
		height: 5,
		width: "100%",
		backgroundColor: "transparent",
		borderRadius: 50,
	};

	const fillerStyles = {
		height: "100%",
		width: `${width}%`,
		borderRadius: 50,
		backgroundColor: "#c75af6",
		transition: "all 0.2s ease-out",
	};

	return (
		<div style={containerStyles}>
			<div style={fillerStyles}></div>
		</div>
	);
}

export default ProgressBar;
