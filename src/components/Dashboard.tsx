import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { signOut, useSession, getSession } from "next-auth/react";

import remove from "../../utils/remove";
import addTask from "../../utils/add-task";
import subscribe from "../../utils/subscribe";
import LoadingSpinner from "./SVG/LoadingSpinner";
import Image from "next/image";
import User from "./SVG/User";

const Dashboard = () => {
  const { data: session } = useSession();
  const [loader, setLoader] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(
    session?.user.subscription
  );

  function subHelper() {
    setSubscribeStatus((prev) => !prev);
  }

  return (
    <div className="mt-8 w-full max-w-2xl rounded-xl bg-white/5 text-white">
      <div className="flex w-full justify-between p-4">
        {session && session.user.image && (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 p-1">
              <Image
                className="rounded-full"
                width={48}
                height={48}
                src={session.user.image}
                alt="profile image"
              />
            </div>
            <h1 className="text-2xl font-bold">{session.user.name}</h1>
          </div>
        )}
        {session && !session.user.image && (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <User />
            </div>
            <h1 className="text-2xl font-bold">{session.user.name}</h1>
          </div>
        )}
        <button
          onClick={() => {
            void signOut();
            setLoader(true);
          }}
          className="my-auto rounded-xl bg-white/10 py-2 px-4 hover:bg-white/20"
        >
          {loader ? (
            <h3 className="flex items-center gap-2 text-sm font-medium">
              <LoadingSpinner />
              Sign Out
            </h3>
          ) : (
            <h3 className="flex items-center gap-2 text-sm font-medium">
              Sign Out
            </h3>
          )}
        </button>
      </div>
      <hr className="w-full border-l border-gray-600" />
      <div className="mt-2 p-4">
        <div className="flex flex-col items-center justify-between text-start md:flex-row">
          <div className="mb-2 text-xl font-bold md:mb-0">
            Get Daily Leetcode Question{" "}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                void subscribe(session?.user.subscription);
                subHelper();
              }}
              className="max-w-xs rounded-md bg-white/10 py-1 px-4 text-center hover:bg-white/20"
            >
              <h3 className="text-lg font-medium">
                {subscribeStatus ? "✅ Subscribed" : "✨ Subscribe"}
              </h3>
            </button>
            <button
              onClick={() => void addTask()}
              className="rounded-md bg-[#DF4C4B] py-1 px-4 text-center hover:bg-[#c53727]"
            >
              <h3 className="text-lg font-medium">Add</h3>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 flex justify-end p-4">
        <button
          onClick={() => void remove()}
          className="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20"
        >
          <h3 className="text-sm font-medium">Delete Account</h3>
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;
