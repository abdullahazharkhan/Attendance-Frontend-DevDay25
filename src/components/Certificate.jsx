const Certificate = () => {
	// IDK just made this code...
	const teamMembers = [
		{ id: 1, name: "Member 1" },
		{ id: 2, name: "Member 2" },
		{ id: 3, name: "Member 3" },
	];

	const handleGenerateCertificate = (member) => {
		alert(`Generating certificate for ${member.name}`);
		// yahan logic lagadena k kese certificate aiga or show hoga
	};

	return (
		<div className="flex flex-col items-center justify-center text-white p-6 bg-white/9 backdrop-blur-sm rounded-xl w-fit mx-auto">
			<p className="text-lg mt-2">Click below to generate certificates.</p>

			<div className="flex flex-col sm:flex-row gap-6 mt-4">
				{teamMembers.map((member) => (
					<button
						key={member.id}
						onClick={() => handleGenerateCertificate(member)}
						className="cursor-pointer bg-[#ff33339f] drop-shadow-lg sm:hover:translate-y-[-3px] p-4 rounded-full font-medium text-white outline-1 outline-red-500">
						{member.name}'s Certificate
					</button>
				))}
			</div>
		</div>
	);
};

export default Certificate;
