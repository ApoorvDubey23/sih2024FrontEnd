import React, { useState } from 'react';
import SideDrawer from "./OffCanvas.js";
import DragDropFiles from './DragDrop.js';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import GaugeChart from 'react-gauge-chart'

function Home() {
  const [BOWpercent,setBOWpercent]=useState(0);
  const [BERTpercent,setBERTpercent]=useState(0);
  const [Cosinepercent,setCosinepercent]=useState(0);
  const CompareResume = async () => {
    const interviwerresume = window.sessionStorage.getItem("InterviewerResume");
    const interviweeresume = window.sessionStorage.getItem("IntervieweeResume");

    setBOWpercent(57);
    setBERTpercent(65);
    setCosinepercent(85);
    if (!interviweeresume || !interviwerresume) {
      toast.error("Both Resumes are required");
      return;
    }

    try {
      console.log("sending API request");

      const res = await axios.post("/pythonlink", {
        interviwerresume: interviwerresume,
        interviweeresume: interviweeresume,
      });

      window.sessionStorage.setItem("BOWdata", 57);
      window.sessionStorage.setItem("BERTdata", 65);
      window.sessionStorage.setItem("Cosinedata", 85);


      toast.success("Comparison completed successfully!");
    } catch (error) {
      toast.error("Some error occurred");
      console.error("Error with ML Backend", error);
    }
  };

  return (
    <div className="bg-neutral-900 w-full h-screen flex flex-col">
      <Toaster />
      <SideDrawer className="absolute" />

      <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
        <div className="w-full flex flex-col md:flex-row justify-evenly items-center space-y-6 md:space-y-0 md:space-x-6">
          <DragDropFiles  props={"interviewer"} />
          <DragDropFiles props={"interviewee"} />
        </div>

        <div className="mt-4">
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out"
            onClick={CompareResume}
          >
            Compare Resumes
          </button>
        </div>

      </div>
      <div className='text-white flex h-fit bg-neutral-900'>
      <GaugeChart id="gauge-chart3" 
        nrOfLevels={30} 
        colors={["white", "blue"]} 
        arcWidth={0.3} 
        percent={BOWpercent/100} 
        style={{ height: "30rem", width: "30rem" }}
      />
      <GaugeChart id="gauge-chart3" 
        nrOfLevels={30} 
        colors={["white", "blue"]} 
        arcWidth={0.3} 
        percent={BERTpercent/100} 
        style={{ height: "30rem", width: "30rem" }}
      />
      <GaugeChart id="gauge-chart3" 
        nrOfLevels={30} 
        colors={["white", "blue"]} 
        arcWidth={0.3} 
        percent={Cosinepercent/100} 
        style={{ height: "30rem", width: "30rem" }}
      />
      </div>
    </div>
  );
}

export default Home;
