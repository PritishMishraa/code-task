import Head from "next/head";
import { useState } from "react";
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

import Footer from "../components/Footer";
import Question from "../components/Question";
import Todoist from "../components/SVG/Todoist";
import Dashboard from "../components/Dashboard";
import LoadingSpinner from "../components/SVG/LoadingSpinner";

const Home: NextPage = () => {
  const { data: session } = useSession()
  const [loader, setLoader] = useState(false)

  const meta = {
    title: 'Code Task',
    description: `Automating LeetCoding`,
    image: 'https://codetask.vercel.app/codetask-banner.png',
    type: 'website',
  };

  return (
    <>
      <Head>
        <title>Code Task</title>
        <meta name="description" content="Automating LeetCoding" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:url" content="https://codetask.vercel.app" />
        <link rel="canonical" href="https://codetask.vercel.app" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Pritish Mishra" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PritishhMishraa" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="max-w-2xl w-full mx-auto flex flex-col items-center justify-center px-2">
          <h1 className="md:text-7xl text-4xl md:mt-20 mt-10 font-extrabold tracking-tight text-white">
            LeetCode <span className="text-[hsl(280,100%,70%)]">X</span> Todoist
          </h1>
          <Question />
          {session ?
            <Dashboard />
            :
            <button
              onClick={() => {
                void signIn('todoist')
                setLoader(true)
              }}
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
