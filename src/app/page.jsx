"use client";

import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Axios from "axios";
import { useState, useEffect } from "react";
import "./globals.css";
import { set } from "local-storage";
const dotenv = require("dotenv");
dotenv.config();

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation:wght@400..700&family=Inter:wght@100..900&family=Krona+One&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');
</style>;

const api = Axios.create({
  withCredentials: true,
  credentials: "include",
});

export default function Component() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [electionData, setElectionData] = useState(null);
  const [ElectedPersonals, setElectedPersonals] = useState({});
  const [CastedVote, setCastedVote] = useState(false);
  const [ElectedPersonalsList, setElectedPersonalsList] = useState([]);
  const backend_url = "https://votexbackend.onrender.com";
  const [votingCode, setVotingCode] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (index, value) => {
    const updatedVotingCode = [...votingCode];
    updatedVotingCode[index] = value;
    setVotingCode(updatedVotingCode);
  };

  useEffect(() => {
    console.log(votingCode);
  }, [votingCode]);

  const fetchCookie = async () => {
    try {
      setInitialLoad(true);
      const electionCode = votingCode.join("");
      console.log(document.cookie);
      const response = await api.get(`${backend_url}/api/${electionCode}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://votex-mocha.vercel.app",
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (
        response.status === 400 &&
        response.data.message === "Election not found"
      ) {
        window.alert("Election not found");
      }

      if (
        response.status === 400 &&
        response.data.message === "Election has ended"
      ) {
        window.alert("Election has ended");
      }
      if (
        response.status === 400 &&
        response.data.message === "You have already voted"
      ) {
        window.alert("You have already voted");
      }
      if (response.status === 200) {
        window.alert("Election is live");
      }
      setInitialLoad(false);

      setElectionData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const castVote = async () => {
    try {
      const electionCode = votingCode.join("");
      const response = await api.post(
        `${backend_url}/api/${electionCode}/vote`,
        ElectedPersonals,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://votex-mocha.vercel.app",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      setCastedVote(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(ElectedPersonals);
  }, [ElectedPersonals]);

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4 HeadingClass">
            Please enter your Voting code
          </h1>

          <div className="flex justify-center align-middle ">
            <div className="grid grid-cols-6 gap-2 inputs">
              <Input
                className="border-2 border-blue-500 w-10 p-2 text-center"
                value={votingCode[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
              />
              <Input
                className="border-2 border-blue-500 w-10 p-2 text-center"
                value={votingCode[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
              />
              <Input
                className="border-2 border-blue-500 w-10 p-2 text-center"
                value={votingCode[2]}
                onChange={(e) => handleInputChange(2, e.target.value)}
              />
              <Input
                className="border-2 border-blue-500 w-10 p-2 text-center"
                value={votingCode[3]}
                onChange={(e) => handleInputChange(3, e.target.value)}
              />
              <Input
                className="border-2 border-blue-500 w-10 p-2 text-center"
                value={votingCode[4]}
                onChange={(e) => handleInputChange(4, e.target.value)}
              />
              <Input
                className="border-2 border-blue-500 w-10 p-2 text-center"
                value={votingCode[5]}
                onChange={(e) => handleInputChange(5, e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center mt-8 submit_button">
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded "
              onClick={fetchCookie}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!electionData) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );
  }

  if (CastedVote) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl thank">
        Thank you for casting your vote.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 bg">
      <header className="flex justify-between items-center mb-8">
        <div className="right-content">
          <Button
            className="bg-green-600 hover:bg-green-700 castvote"
            onClick={castVote}
          >
            {CastedVote ? "CAST" : "CAST"}
          </Button>
        </div>
        <div
          className="left-content"
          style={{ fontFamily: "Krona One, sans-serif" }} // Apply Krona One font
        >
          <p className="text-l font-light head1">{electionData.ElectionName}</p>
        </div>
      </header>

      <main>
        {electionData.CategoryAndCandidates.map((category, key) => (
          <section
            key={key}
            aria-labelledby="category-heading"
            className="mb-8"
          >
            <h2
              className="text-lg font-semibold mb-4 cheading"
              id="category-heading"
            >
              {category.CategoryName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {category.Candidates.map((candidate, key) => (
                <Card key={key} className="bg-gray-800 card">
                  <CardContent className="flex flex-col items-center p-4 cardcontent">
                    <div className="w-16 h-16 rounded-full border-2 border-gray-500 flex items-center justify-center mb-4 cardcontent2">
                      <div className="w-10 h-10 rounded-full bg-gray-600 cardcontent3" />
                    </div>
                    <h3 className="text-md font-semibold mb-1 cname">
                      {candidate.CandidateName}
                    </h3>
                    <p className="text-gray-400 mb-4 cid rollno">
                      ID: {candidate.CandidateIdno}
                    </p>
                    {ElectedPersonalsList.includes(candidate.CandidateName) ? (
                      <Button
                        className="bg-green-500 hover:bg-green-600 cardbtn"
                        onClick={() => {
                          setElectedPersonals({
                            ...ElectedPersonals,
                            [category.CategoryName]: candidate.CandidateName,
                          });
                          setElectedPersonalsList(
                            ElectedPersonalsList.filter(
                              (name) => name !== candidate.CandidateName
                            )
                          );
                        }}
                      >
                        UnSelect
                      </Button>
                    ) : (
                      <Button
                        className="bg-red-500 hover:bg-red-600 cardbtn"
                        onClick={() => {
                          setElectedPersonals({
                            ...ElectedPersonals,
                            [category.CategoryName]: candidate.CandidateName,
                          });
                          setElectedPersonalsList([
                            ...ElectedPersonalsList,
                            candidate.CandidateName,
                          ]);
                        }}
                      >
                        Select
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
