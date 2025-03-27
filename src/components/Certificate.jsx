const Certificate = () => {
	return (
		<div className="flex flex-col items-center justify-center text-white p-6 bg-white/9 backdrop-blur-sm rounded-xl w-fit mx-auto">
			<h1 className="text-3xl font-semibold">Download Your Certificate</h1>
			<p className="text-lg mt-2">
				Enter your details to generate your certificate.
			</p>
			<form className="flex flex-col gap-4 mt-4">
				<input
					type="text"
					placeholder="Enter Your Name"
					className="p-2 rounded-md text-black w-72"
				/>
				<button className="bg-[#ff33339f] p-2 rounded-md text-white font-semibold">
					Generate Certificate
				</button>
			</form>
		</div>
	);
};

export default Certificate;
