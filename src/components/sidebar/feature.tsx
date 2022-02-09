import React, { useState } from "react";
import { ListOfArray } from "../../utils/model";

const listItems: ListOfArray[] = [
	{ id: 0, text: "All" },
	{ id: 1, text: "UI" },
	{ id: 2, text: "UX" },
	{ id: 3, text: "Enhancement" },
	{ id: 4, text: "Bug" },
	{ id: 5, text: "Feature" },
];

function Feature() {
	const [activeFeature, setActiveFeature] = useState(0);

	const setActiveFeatureHandler = (item: { id: number; text: string }) => {
		setActiveFeature(item.id);
	};

	return (
		<div className="sidebar-feature">
			<ul className="sidebar-feature__list">
				{listItems.map((item) => (
					<li
						key={item.id}
						id={item.text}
						className={`sidebar-feature__list--item ${
							item.id === activeFeature ? "active" : null
						}`}
						onClick={() => setActiveFeatureHandler(item)}
					>
						{item.text}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Feature;
