import { useState, useEffect } from "react";
import Feature from "./feature";
import Roadmap from "./roadmap";
import SidePanel from "./Sidepanel";
import MenuIcon from "../../assets/images/shared/mobile/icon-hamburger.svg";
import CloseIcon from "../../assets/images/shared/mobile/icon-close.svg";
import BackgroundHeader from "../../assets/images/suggestions/desktop/background-header.png";

function Sidebar() {
	const [showSidePanel, setShowSidePanel] = useState<boolean>(false);
	const [mobileView, setMobileView] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 600) {
				setMobileView(false);
			} else if (window.innerWidth < 600) {
				setMobileView(true);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const onShowSidePanel = () => setShowSidePanel((prevState) => !prevState);

	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<img src={BackgroundHeader} alt="Background Header" />
				<div className="sidebar-header__text">
					<h1>Frontend Mentor</h1>
					<p>Feedback Board</p>
				</div>

				<div className="sidebar-mobile">
					<div className="sidebar-mobile__menu" onClick={onShowSidePanel}>
						<img
							src={showSidePanel ? CloseIcon : MenuIcon}
							alt="Menu Actions"
						/>
					</div>
				</div>
			</div>

			<SidePanel
				handleShowSidePanel={onShowSidePanel}
				showSidePanel={showSidePanel}
			>
				<Feature />
				<Roadmap />
			</SidePanel>

			{!mobileView && (
				<div className="sidebar-children">
					<Feature />
					<Roadmap />
				</div>
			)}
		</div>
	);
}

export default Sidebar;
