import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/SVG/LoadingSpinner";
import Question from "../components/Question";
import Todoist from "../components/SVG/Todoist";

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const [loader, setLoader] = useState(false)

  return (
    <>
      <Head>
        <title>Code Task</title>
        <meta name="description" content="Helping people code consistensly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="max-w-2xl w-full mx-auto flex flex-col items-center justify-center">
          <h1 className="md:text-7xl text-4xl mt-20 font-extrabold tracking-tight text-white">
            LeetCode <span className="text-[hsl(280,100%,70%)]">X</span> Todoist
          </h1>
          <Question />
          {session ?
            <Dashboard />
            :
            <button
              onClick={() => { signIn('todoist'); setLoader(true) }}
              className="mt-16 max-w-xs rounded-xl bg-white/10 px-4 py-2 text-white hover:bg-white/20">
              {
                loader ?
                  <h3 className="text-2xl font-bold flex items-center gap-2"><LoadingSpinner />Todoist</h3> :
                  <h3 className="text-2xl font-bold flex items-center gap-2"><Todoist />Todoist</h3>
              }
            </button>
          }
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Home;
