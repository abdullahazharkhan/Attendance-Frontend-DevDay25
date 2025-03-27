import Squares from "./components/Squares";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import "./App.css";
import { AttForm } from "./components/Form";
import Certificate from "./components/Certificate"; // Import Certificate component
import { Toaster } from "@/components/ui/sonner";
import Info from "./components/ui/Info";

function App() {
	const [currPage, setCurrPage] = useState("Attendance"); // "Attendance" or "Certificate"

	return (
		<div className="h-screen bg-gradient-to-br from-[#141414] to-[#0a0a0a] relative py-20 font-poppins p-3">
			<Squares squareSize={40} borderColor="rgb(66 65 65)" />

			{/* Page Toggle Buttons */}
			<div className="relative flex gap-2 mx-auto w-fit p-1 rounded-lg bg-white/9 backdrop-blur-sm font-semibold tracking-wide text-lg">
				<button
					onClick={() => setCurrPage("Attendance")}
					disabled={currPage === "Attendance"}
					className={`p-1 px-3 rounded-md flex items-center gap-2 ${
						currPage === "Attendance"
							? "bg-[#ff33339f] cursor-pointer"
							: "cursor-not-allowed"
					}`}>
					Attendance
					{currPage !== "Attendance" && <FaLock className="text-sm" />}
				</button>
				<button
					onClick={() => setCurrPage("Certificate")}
					disabled={currPage === "Certificate"}
					className={`p-1 px-3 rounded-md flex items-center gap-2 ${
						currPage === "Certificate"
							? "bg-[#ff33339f] cursor-pointer"
							: "cursor-not-allowed"
					}`}>
					Certificate
					{currPage !== "Certificate" && <FaLock className="text-sm" />}
				</button>
			</div>

			{/* Display Either Attendance or Certificate Page */}
			<div className="mt-10 w-fit flex flex-col gap-4 justify-center items-center mx-auto rounded-xl p-8 text-white text-center relative z-50 bg-white/9 backdrop-blur-sm">
				<img
					src="/logo.png"
					alt="DevDay'25"
					className="cursor-pointer mx-auto w-[400px]"
				/>
				<h1 className="font-semibold text-3xl">
					{currPage === "Attendance"
						? "MARK YOUR ATTENDANCE"
						: "Download Team Certificates"}
				</h1>

				{/* Show AttForm when Attendance is selected, otherwise show Certificate */}
				{currPage === "Attendance" ? <AttForm /> : <Certificate />}
			</div>
			<Info />

			<Toaster position={"bottom-center"} />
		</div>
	);
}

export default App;
