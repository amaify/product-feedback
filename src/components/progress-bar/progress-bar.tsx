import React from "react";

interface Props {
	delay: number;
}

function ProgressBar({ delay }: Props) {
	const [progress, setProgress] = React.useState<number>(1);
	const [width, setWidth] = React.useState<any>("");
	React.useEffect(() => {
		// let counter = 1;
		// const interval = setInterval(() => {
		// 	counter++;
		// 	setProgress(counter);
		// 	if (counter === 100) {
		// 		clearInterval(interval);
		// 	}
		// }, 100);
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
		// margin: 50,
	};

	const fillerStyles = {
		height: "100%",
		// width: `calc(100% - ${progress}%)`,
		width: `${width}%`,
		borderRadius: 50,
		backgroundColor: "#c75af6",
		transition: "all 0.2s ease-out",
	};

	// console.log(progress);

	return (
		<div style={containerStyles}>
			<div style={fillerStyles}></div>
		</div>
	);
}

export default ProgressBar;
