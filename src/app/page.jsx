"use client";

import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import Axios from "axios";
import { useState, useEffect } from "react";
import localStorage, * as localstorage from "local-storage";
const dotenv = require("dotenv");
dotenv.config();

const api = Axios.create({
  withCredentials: true,
  credentials: "include",
});

export default function Component() {
  const [electionData, setElectionData] = useState(null);
  const [ElectedPersonals, setElectedPersonals] = useState({});
  const [CastedVote, setCastedVote] = useState(false);
  const backend_url = "https://votexbackend.onrender.com";
  const fetchCookie = async () => {
    try {
      console.log(document.cookie);
      const response = await api.get(`${backend_url}/api/tDihBL`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://votex-mocha.vercel.app",
          "Access-Control-Allow-Credentials": true,
        },
      });

      setElectionData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const castVote = async () => {
    try {
      const response = await api.post(
        `${backend_url}/api/tDihBL/vote`,
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
      <div className="flex justify-center items-center h-screen text-2xl">
        Thank you for casting your vote.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-bold">Election Central</h1>
          <p className="text-gray-400">{electionData.ElectionName}</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={castVote}>
          Cast My Vote
        </Button>
      </header>
      <main>
        {electionData.CategoryAndCandidates.map((category, key) => {
          return (
            <section aria-labelledby="category-heading" className="mb-8">
              <h2 className="text-lg font-semibold mb-4" id="category-heading">
                {category.CategoryName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {category.Candidates.map((candidate, key) => {
                  return (
                    <Card className="bg-gray-800">
                      <CardContent className="flex flex-col items-center p-4">
                        <div className="w-16 h-16 rounded-full border-2 border-gray-500 flex items-center justify-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-gray-600" />
                        </div>
                        <h3 className="text-md font-semibold mb-1">
                          {candidate.CandidateName}
                        </h3>
                        <p className="text-gray-400 mb-4">
                          ID: {candidate.CandidateIdno}
                        </p>
                        <Button
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => {
                            setElectedPersonals({
                              ...ElectedPersonals,
                              [category.CategoryName]: candidate.CandidateName,
                            });
                          }}
                        >
                          Select
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
