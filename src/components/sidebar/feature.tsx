import React from "react";

interface FeatureList {
	id: number;
	text: string;
}

const listItems: FeatureList[] = [
	{ id: 0, text: "All" },
	{ id: 1, text: "UI" },
	{ id: 2, text: "UX" },
	{ id: 3, text: "Enhancement" },
	{ id: 4, text: "Bug" },
	{ id: 5, text: "Feature" },
];

function Feature() {
	return (
		<div className="sidebar-feature">
			<ul className="sidebar-feature__list">
				{listItems.map((item) => (
					<li
						key={item.id}
						id={item.text}
						className="sidebar-feature__list--item"
					>
						{item.text}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Feature;
