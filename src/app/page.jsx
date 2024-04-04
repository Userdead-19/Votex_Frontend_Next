"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "./globals.css"; // Import your CSS file
<style>
@import url('https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation:wght@400..700&family=Inter:wght@100..900&family=Krona+One&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap')
</style>
const api = Axios.create({
  withCredentials: true,
});

export default function Component() {
  const [electionData, setElectionData] = useState(null);
  const [ElectedPersonals, setElectedPersonals] = useState({});
  const [CastedVote, setCastedVote] = useState(false);
  const backend_url = "https://votexbackend.onrender.com";

  const fetchCookie = async () => {
    try {
      const response = await api.get(`${backend_url}/api/tDihBL`);
      setElectionData(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const castVote = async () => {
    try {
      const response = await api.post(`${backend_url}/api/tDihBL/vote`, {
        ElectedPersonals,
      });
      setCastedVote(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCookie();
  }, []);

  useEffect(() => {
    console.log(ElectedPersonals);
  }, [ElectedPersonals]);

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
            CAST
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
          <section key={key} aria-labelledby="category-heading" className="mb-8">
            <h2 className="text-lg font-semibold mb-4 cheading" id="category-heading">
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
                    <Button
                      className="bg-green-500 hover:bg-green-600 cardbtn"
                      onClick={() =>
                        setElectedPersonals({
                          ...ElectedPersonals,
                          [category.CategoryName]: candidate.CandidateName,
                        })
                      }
                    >
                      SELECT
                    </Button>
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
