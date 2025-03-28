import Squares from './components/Squares'
import { useState } from 'react'
import { FaLock, FaInfo } from "react-icons/fa";
import './App.css'
import { AttForm } from './components/Form';
import { Toaster } from "@/components/ui/sonner"

function App() {
	const [currPage, setCurrPage] = useState("Attendance"); // "Attendance" or "Certificate"

	return (
		<div className="h-screen bg-gradient-to-br from-[#141414] to-[#0a0a0a] relative py-5 font-poppins p-3 flex flex-col justify-center items-center">
			<Squares borderColor="rgb(66 65 65)" />
			<div className="relative flex gap-2 mx-auto w-fit p-1 rounded-lg bg-white/9 backdrop-blur-sm font-semibold tracking-wide text-lg">
				<button
					onClick={() => setCurrPage("Attendance")}
					// disabled={currPage === "Attendance"}
					className={`p-1 px-3 rounded-md flex items-center gap-2 ${currPage === "Attendance" ? "bg-[#ff33339f] cursor-pointer" : "cursor-not-allowed"}`}>
					Attendance
					{currPage !== "Attendance" && <FaLock className='text-sm' />}
				</button>
				<button
					onClick={() => setCurrPage("Certificate")}
					// disabled={currPage !== "Certificate"}
					className={`p-1 px-3 rounded-md flex items-center gap-2 ${currPage === "Certificate" ? "bg-[#ff33339f] cursor-pointer" : "cursor-not-allowed"}`}>
					Certificate
					{currPage !== "Certificate" && <FaLock className='text-sm' />}
				</button>
			</div>
			<div className="mt-10 w-fit flex flex-col gap-4 justify-center items-center mx-auto rounded-xl p-8 text-white text-center relative z-50 bg-white/9 backdrop-blur-sm">
				<img src="/logo.png" alt="DevDay'25" className="cursor-pointer mx-auto w-[400px]" />
				<div className="flex flex-col gap-4 items-center">
					<h1 className='font-semibold text-3xl my-2'>
						{currPage === "Attendance" ? "MARK YOUR ATTENDANCE" : "DOWNLOAD CERTIFICATE"}
					</h1>
					<AttForm page={currPage} />
				</div>
			</div>
			<Toaster position={"bottom-center"} />
		</div>
	)
}

export default App
