import Squares from './components/Squares'
import { useState } from 'react'
import { FaLock } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaArrowUpLong, FaArrowTurnUp } from "react-icons/fa6";
import './App.css'
import { AttForm } from './components/Form';
import { Toaster } from "@/components/ui/sonner"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

function App() {
	const [currPage, setCurrPage] = useState("Certificate"); // "Attendance" or "Certificate"
	const [showInfo, setShowInfo] = useState(false);
	const [attendedTeam, setAttendedTeam] = useState(null);
	const [isAlreadyMarked, setIsAlreadyMarked] = useState(false);

	return (
		<div className="h-screen bg-gradient-to-br from-[#141414] to-[#0a0a0a] relative py-5 font-poppins p-3 flex flex-col justify-center items-center">
			<Squares borderColor="rgb(66 65 65)" />
			<div className="relative flex gap-2 mx-auto w-fit p-1 rounded-lg bg-white/9 backdrop-blur-sm font-semibold tracking-wide text-lg">
				<button
					onClick={() => { setCurrPage("Attendance"); setAttendedTeam(null); setIsAlreadyMarked(false) }}
					disabled={currPage !== "Attendance"}
					className={`p-1 px-3 rounded-md flex items-center gap-2 ${currPage === "Attendance" ? "bg-[#ff33339f] cursor-pointer" : "cursor-not-allowed"}`}>
					Attendance
					{currPage !== "Attendance" && <FaLock className='text-sm' />}
				</button>
				<button
					onClick={() => { setCurrPage("Certificate"); setAttendedTeam(null); setIsAlreadyMarked(false) }}
					disabled={currPage !== "Certificate"}
					className={`p-1 px-3 rounded-md flex items-center gap-2 ${currPage === "Certificate" ? "bg-[#ff33339f] cursor-pointer" : "cursor-not-allowed"}`}>
					Certificate
					{currPage !== "Certificate" && <FaLock className='text-sm' />}
				</button>
			</div>
			<div className="mt-10 w-fit flex flex-col gap-4 justify-center items-center mx-auto rounded-xl p-8 text-white text-center relative bg-white/9 backdrop-blur-sm">
				<img src="/logo.png" alt="DevDay'25" className="cursor-pointer mx-auto w-[400px]" />
				<div className="flex flex-col gap-4 items-center">
					{attendedTeam ? (
						<h1 className='font-semibold text-xl'>
							Attendance of the team <br />
							<span className='text-3xl font-bold '>
								{attendedTeam.Team_Name.length > 30
									? attendedTeam.Team_Name.substring(0, 27) + "..."
									: attendedTeam.Team_Name}
							</span> <br />
							{isAlreadyMarked ? "is already marked!" : "marked successfully!"}
						</h1>
					) : (
						<>
							<h1 className='font-semibold text-3xl my-2'>
								{currPage === "Attendance" ? "MARK YOUR ATTENDANCE" : "DOWNLOAD CERTIFICATE"}
							</h1>
							<AttForm page={currPage} setAttendedTeam={setAttendedTeam} setIsAlreadyMarked={setIsAlreadyMarked} />
						</>
					)}
				</div>
			</div>
			<div
				onClick={() => setShowInfo(!showInfo)}
				className='absolute bottom-0 left-10 w-[227px] bg-[#ff33339f] backdrop-blur-sm rounded-tl-md rounded-tr-md flex flex-col items-center cursor-help'>
				<h3 className='text-lg font-medium my-0.5'>
					Instructions
				</h3>
				<div className={`z-50 text-xs w-full border-t py-2  px-3 pb-2 ${showInfo ? " block" : "translate-y-0 hidden"} transition-all duration-300 ease-in-out`}>
					<ul className='flex flex-col'>
						{/* <li className='flex gap-2 items-center'> <FaArrowTurnUp className='rotate-90' /> Enable your device's location.</li> */}
						<li className='flex gap-2 items-center'> <FaArrowTurnUp className='rotate-90' /> Enter the attendance code emailed to you.</li>
						<li className='flex gap-2 items-center'> <FaArrowTurnUp className='rotate-90' /> Download the participation certificates for your team members.</li>
						<li className='mt-2'> <strong>Tip:</strong> If the certificate has expired, refresh the page and re-enter the code.</li>
					</ul>
				</div>
			</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							onClick={() => window.open("https://automation.devday25.com/#team", "_blank")}
							className="glowing-button flex justify-center items-center group absolute bottom-10 right-10 w-[50px] aspect-square cursor-pointer rounded-full bg-[#ff33339f] p-2 text-white transition-all duration-300 ease-in-out"
						>
							<IoMdInformationCircleOutline size={34} className="opacity-90" />
						</button>
					</TooltipTrigger>
					<TooltipContent>
						<p className="text-center text-md font-medium">
							Know about <br /> the Developers
						</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<Toaster position={"bottom-center"} />
		</div>
	)
}

export default App
