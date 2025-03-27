import React, { useState } from "react";
import InfoBox from "./InfoBox";

const Info = () => {
	const [showInfo, setShowInfo] = useState(false);

	return (
		<>
			{showInfo && <InfoBox />}
			<div
				onClick={() => setShowInfo((prev) => !prev)}
				className="border-4 absolute bottom-5 right-5 text-amber-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#ff3333] text-lg font-bold hover:translate-y-[-3px] cursor-pointer shadow-accent">
				{showInfo ? "X" : "?"}
			</div>
		</>
	);
};

export default Info;
