import { RaceBy } from "@uiball/loaders";

export const Loader = () => {
	return (
		<div className="loader">
			<div className="loader-content">
				<h1 className="loader-heading">LOADING</h1>
				<RaceBy size={200} lineWeight={5} speed={1.4} color="#ad1fea" />
			</div>
		</div>
	);
};
