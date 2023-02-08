import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import { signOut, useSession } from "next-auth/react";

import remove from "../../utils/remove";
import addTask from "../../utils/add-task";
import subscribe from "../../utils/subscribe";
import LoadingSpinner from "./SVG/LoadingSpinner";
import Image from "next/image";
import User from "./SVG/User";

const Dashboard = () => {
    const { data: session } = useSession()
    const [loader, setLoader] = useState(false)

    return (
        <div className="w-full max-w-2xl rounded-xl mt-8 bg-white/5 text-white">
            <div className="flex w-full justify-between p-4">
                {session && session.user.image &&
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 p-1 rounded-full bg-white/20 flex items-center justify-center">
                            <Image className="rounded-full" width={48} height={48} src={session.user.image} alt="profile image" />
                        </div>
                        <h1 className="font-bold text-2xl">{session.user.name}</h1>
                    </div>
                }
                {session && !session.user.image &&
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                            <User />
                        </div>
                        <h1 className="font-bold text-2xl">{session.user.name}</h1>
                    </div>
                }
                <button
                    onClick={() => { void signOut(); setLoader(true) }}
                    className="rounded-xl bg-white/10 my-auto py-2 px-4 hover:bg-white/20">
                    {
                        loader ?
                            <h3 className="text-sm font-medium flex items-center gap-2"><LoadingSpinner />Sign Out</h3> :
                            <h3 className="text-sm font-medium flex items-center gap-2">Sign Out</h3>
                    }
                </button>
            </div>
            <hr className="w-full border-gray-600 border-l" />
            <div className="mt-2 p-4">
                <div className="flex flex-col md:flex-row justify-between text-start items-center">
                    <div className="font-bold mb-2 md:mb-0 text-lg">Get Daily Leetcode Question </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => void subscribe(session?.user.subscription)}
                            className="max-w-xs rounded-md text-center bg-white/10 py-1 px-4 hover:bg-white/20">
                            <h3 className="font-medium">{session?.user.subscription ? "✅ Subscribed" : "✨ Subscribe"}</h3>
                        </button>
                        <button
                            onClick={() => void addTask()}
                            className="bg-[#DF4C4B] rounded-md text-center py-1 px-4 hover:bg-[#c53727]">
                            <h3 className="font-medium">Add</h3>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-1 p-4">
                <div className="flex justify-between text-start items-center">
                    <div className="text-gray-400">
                        <p>• Subscribe to receive the daily LeetCode Question on your Todoist daily tab. You can cancel your subscription at any time. (To view the difference after subscribing, refresh the page.)</p>
                        <br />
                        <p>• To receive the daily LeetCode question in your Todoist daily tab, RIGHT NOW, click Add.</p>
                    </div>
                </div>
            </div>
            <div className="mt-2 p-4 flex justify-end">
                <button
                    onClick={() => void remove()}
                    className="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20">
                    <h3 className="text-sm font-medium">Delete Account</h3>
                </button>
            </div>
            <Toaster />
        </div>
    )
}

export default Dashboard