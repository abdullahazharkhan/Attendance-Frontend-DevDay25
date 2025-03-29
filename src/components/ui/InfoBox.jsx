import React from "react";

const InfoBox = () => {
	return (
		<div className="absolute text-amber-50 border-4 bg-[#282828] p-8 rounded-md bottom-12 right-12">
			<div className="space-y-2 text-white-800">
				<h2 className="text-lg font-semibold">How to Mark Your Attendance:</h2>
				<ul className="list-disc list-inside space-y-1">
					<li>
						<strong>Turn on Location</strong> – Ensure your device’s location is
						enabled.
					</li>
					<li>
						<strong>Enter Code</strong> – Type the{" "}
						<span className="font-medium">7-digit attendance code</span>.
					</li>
					<li>
						<strong>Mark Attendance</strong> – Tap{" "}
						<span className="font-medium">"Mark as Present"</span> to confirm.
					</li>
				</ul>
			</div>
		</div>
	);
};

export default InfoBox;
