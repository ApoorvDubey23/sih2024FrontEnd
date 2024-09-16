import React, { useState } from 'react';
import SideDrawer from "./OffCanvas.js";
import DragDropFiles from './DragDrop.js';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import GaugeChart from 'react-gauge-chart';
import BasicExample from './Navbar.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Home() {
  const [BOWpercent, setBOWpercent] = useState(0);
  const [BERTpercent, setBERTpercent] = useState(0);
  const [Cosinepercent, setCosinepercent] = useState(0);

  // Checkbox states
  const [showAll, setShowAll] = useState(false);
  const [showBOW, setShowBOW] = useState(false);
  const [showBERT, setShowBERT] = useState(false);
  const [showCosine, setShowCosine] = useState(false);

  // Handle checkbox changes
  const handleCheckboxChange = (type) => {
    if (type === "all") {
      setShowAll(!showAll);
      setShowBOW(!showAll);
      setShowBERT(!showAll);
      setShowCosine(!showAll);
    } else {
      switch (type) {
        case "bow":
          setShowBOW(!showBOW);
          break;
        case "bert":
          setShowBERT(!showBERT);
          break;
        case "cosine":
          setShowCosine(!showCosine);
          break;
        default:
          break;
      }
    }
  };

  const CompareResume = async () => {
    const interviwerresume = window.sessionStorage.getItem("InterviewerResume");
    const interviweeresume = window.sessionStorage.getItem("IntervieweeResume");

    if (!interviweeresume || !interviwerresume) {
      toast.error("Both Resumes are required");
      return;
    }

    try {
      console.log("sending API request");

      const res = await axios.post("http://127.0.0.1:5000/download", {
        interviwerresume: interviwerresume,
        interviweeresume: interviweeresume,
      });
      console.log(res.data);
      
      window.sessionStorage.setItem("BOWdata", res.data.similarity_percentage_bow);
      window.sessionStorage.setItem("BERTdata", res.data.similarity_percentage_tfidf);
      window.sessionStorage.setItem("Cosinedata", res.data.similarity_percentage);
      setBOWpercent(res.data.similarity_percentage_bow);
      setBERTpercent(res.data.similarity_percentage_tfidf);
      setCosinepercent(res.data.similarity_percentage);

      toast.success("Comparison completed successfully!");
    } catch (error) {
      toast.error("Some error occurred");
      console.error("Error with ML Backend", error);
    }
  };

  return (
    <div className="bg-neutral-900 w-full h-screen flex flex-col">
      <Toaster />
      <BasicExample />
      <SideDrawer className="absolute" />
      <div className='flex w-100 text-6xl font-semibold font-sans p-2 text-white justify-center items-center'>SkillSync</div>

      <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
        <div className="w-full flex flex-col md:flex-row justify-evenly items-center">
          <DragDropFiles props={"interviewer"} />
          <DragDropFiles props={"interviewee"} />
        </div>

        <div className="mt-4">
          <button
            className="px-6 py-3 bg-[#292C94] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out"
            onClick={CompareResume}
          >
            Compare Resumes
          </button>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <DropdownButton title="Select Comparison Type" className='custom-dropdown' style={{ backgroundColor: '#292C94', color: 'white' }}>
          <Dropdown.Item as="div">
            <label>
              <input
                type="checkbox"
                checked={showAll}
                onChange={() => handleCheckboxChange("all")}
              /> Show All
            </label>
          </Dropdown.Item>
          <Dropdown.Item as="div">
            <label>
              <input
                type="checkbox"
                checked={showBOW}
                onChange={() => handleCheckboxChange("bow")}
              /> BOW(Skill Overlap Score)
            </label>
          </Dropdown.Item>
          <Dropdown.Item as="div">
            <label>
              <input
                type="checkbox"
                checked={showBERT}
                onChange={() => handleCheckboxChange("bert")}
              /> TF-IDF(Skill Importance Score)
            </label>
          </Dropdown.Item>
          <Dropdown.Item as="div">
            <label>
              <input
                type="checkbox"
                checked={showCosine}
                onChange={() => handleCheckboxChange("cosine")}
              /> Cosine(Skill Relevance Score)
            </label>
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <div className='text-white flex flex-wrap h-fit bg-neutral-900 min-h-[300px] justify-center items-center'>
        {showBOW && (
          <div className='items-center justify-center flex flex-col'>
          <GaugeChart
            id="gauge-chart-bow"
            nrOfLevels={30}
            colors={["white", "#292C94"]}
            arcWidth={0.3}
            percent={BOWpercent / 100}
            style={{  width: "25rem" }}
          />
          <div className='text-2xl font-semibold'>BOW(Skill Overlap Score)</div>
          </div>
          
        )}
        {showBERT && (
           <div className='items-center justify-center flex flex-col'>
          
           <GaugeChart
             id="gauge-chart-bert"
             nrOfLevels={30}
             colors={["white", "#292C94"]}
             arcWidth={0.3}
             percent={BERTpercent / 100}
             style={{  width: "25rem" }}
           />
           <div className='text-2xl font-semibold'>TF-IDF(Skill Importance Score)</div>
           </div>
        )}
        {showCosine && (
           <div className='items-center justify-center flex flex-col'>
         <GaugeChart
            id="gauge-chart-cosine"
            nrOfLevels={30}
            colors={["white", "#292C94"]}
            arcWidth={0.3}
            percent={Cosinepercent / 100}
            style={{  width: "25rem" }}
          />
           <div className='text-2xl font-semibold'>Cosine(Skill Relevance Score)</div>
           </div>
          
        )}
      </div>
    </div>
  );
}

export default Home;
