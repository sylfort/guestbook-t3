import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { TranslateButton } from "../components/translateButton";

const Messages = () => {
  const { data: session, status } = useSession();
  const { data: messages, isLoading } = trpc.useQuery(["guestbookgetAll"], {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
  });

  if (isLoading) return <div>Fetching messages...</div>;

  return (
    <div className="flex flex-col gap-4">
      {messages?.map((msg, index) => (
        <div className="flex-wrap flex-column gap-4" key={index}>
          <div className="flex-nowrap flex-row gap-4 border-b-2 border-red-800">
            <div>{msg.message}</div>
            <div>
              {session ? (
                <TranslateButton message={msg.message} />
              ) : (
                <p className="`ml-2 p-1 text-xs font-semibold text-amber-500 decoration-sky-800/30">
                  Login to try the new
                  <br />
                  AI translation feature!
                </p>
              )}
            </div>
          </div>
          <span>{msg.name}</span>
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const ctx = trpc.useContext();
  const postMessage = trpc.useMutation("guestbookpostMessage", {
    onMutate: () => {
      ctx.cancelQuery(["guestbookgetAll"]);

      let optimisticUpdate = ctx.getQueryData(["guestbookgetAll"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["guestbookgetAll"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["guestbookgetAll"]);
    },
  });

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl pt-4 text-center">
        Welcome to Shiru&apos;s Interactive Corner!
      </h1>
      <br />
      <p className="text-center">Share insights in our dynamic guestbook</p>
      <p className="text-sm text-center text-gray-600">
        <code>
          powered by TypeScript, TRPC, Next.js, AWS RDS and OpenAI API
        </code>
      </p>

      <div className="pt-10">
        {session ? (
          <div>
            <p className="pb-4">hi {session.user?.name}</p>
            <button
              onClick={() => signOut()}
              className="bg-white text-black p-1 rounded border text-xs border-gray-300 hover:bg-gray-100"
            >
              Logout
            </button>

            <div className="pt-6">
              <form
                className="flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();

                  postMessage.mutate({
                    name: session.user?.name as string,
                    message,
                  });

                  setMessage("");
                }}
              >
                <input
                  type="text"
                  value={message}
                  placeholder="Your message..."
                  maxLength={100}
                  onChange={(event) => setMessage(event.target.value)}
                  className="px-4 py-2 rounded-md border-2 border-zinc-800 bg-neutral-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 rounded-md border-2 border-zinc-800 focus:outline-none"
                >
                  Submit
                </button>
              </form>
            </div>

            <div className="pt-10">
              <Messages />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 text-sm">
            <button
              onClick={() => signIn("discord")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login with Discord
            </button>
            <button
              onClick={() => signIn("github")}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Login with GitHub
            </button>

            <div className="pt-10" />
            <Messages />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
