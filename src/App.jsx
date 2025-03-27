import Squares from './components/Squares'
import { useState } from 'react'
import { FaLock } from "react-icons/fa";
import './App.css'

function App() {
  const [currPage, setCurrPage] = useState("Attendance"); // "Attendance" or "Certificate"

  return (
    <div className="h-screen bg-gradient-to-br from-[#141414] to-[#0a0a0a] relative py-20">
      <Squares
        squareSize={40}
        borderColor="rgb(66 65 65)"
      />
      <div className="relative flex gap-2 mx-auto w-fit p-1 rounded-lg bg-white/9 backdrop-blur-sm font-semibold tracking-wide text-lg uppercase">
        <button
          onClick={() => setCurrPage("Attendance")}
          disabled={currPage === "Attendance"}
          className={`p-1 px-3 rounded-md flex items-center gap-2 ${currPage === "Attendance" ? "bg-[#ff33339f] cursor-pointer" : "cursor-not-allowed"}`}>
          Attendance
          {currPage !== "Attendance" && <FaLock className='text-sm'/>}
        </button>
        <button
          onClick={() => setCurrPage("Certificate")}
          disabled={currPage !== "Certificate"}
          className={`p-1 px-3 rounded-md flex items-center gap-2 ${currPage === "Certificate" ? "bg-[#ff33339f] cursor-pointer" : "cursor-not-allowed"}`}>
          Certificate
          {currPage !== "Certificate" && <FaLock className='text-sm'/>}
        </button>
      </div>
      <div className="mt-20 w-fit flex justify-center items-center mx-auto rounded-xl p-4 text-white text-center relative z-50 bg-white/9 backdrop-blur-sm">
        <img src="/logo.webp" alt="DevDay'25" className="cursor-pointer" />
      </div>
    </div>
  )
}

export default App
