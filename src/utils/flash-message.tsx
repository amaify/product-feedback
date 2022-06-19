import ProgressBar from "../components/progress-bar/progress-bar";

interface Props {
	status: string;
	text: string;
	delay?: number | any;
	flashType: string;
}

export function FlashMessage({ status, text, delay, flashType }: Props) {
	return (
		<div className={`flash flash-${status} flash-${flashType}`}>
			<p className="flash-text">{text}</p>
			<ProgressBar delay={delay} />
		</div>
	);
}
