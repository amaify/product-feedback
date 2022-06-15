interface Props {
	status: string;
	text: string;
}

export function FlashMessage({ status, text }: Props) {
	return (
		<div className={`flash flash-${status}`}>
			<p className="flash-text">{text}</p>
		</div>
	);
}
