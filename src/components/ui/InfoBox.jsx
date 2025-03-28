import React from "react";

const InfoBox = () => {
	return (
		<div className="absolute text-amber-50 border-4 bg-[#282828] p-8 rounded-md bottom-12 right-12">
			<ul className="flex-col">
				<li>Open Location</li>
				<li>Enter code</li>
				<li>Enter name</li>
			</ul>
		</div>
	);
};

export default InfoBox;
