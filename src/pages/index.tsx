import { trpc } from "../utils/trpc";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { TranslateButton } from "../components/translateButton";

const Messages = () => {
  const { data: session, status } = useSession();
  const { data: messages, isLoading } = trpc.useQuery(["guestbookgetAll"], {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
  });

  if (isLoading) return <div>Fetching messages...</div>;

  return (
    <div className="flex flex-col gap-4 rounded-lg p-4 border-2 border-zinc-700">
      <h3 className="text-lg font-semibold">Messages:</h3>
      {!session && (
        <p className="`ml-2 text-center p-1 text-xs font-semibold text-amber-500 decoration-sky-800/30">
          Login to try the new
          <br />
          AI translation feature!
        </p>
      )}
      {messages?.map((msg, index) => (
        <div className="flex-wrap flex-column gap-4" key={index}>
          <div
            className={`grid grid-cols-[repeat(2,minmax(0,0.5fr))] gap-1 ${
              !session && "border-red-800" && "border-b-2"
            }`}
          >
            <div className="flex items-center">{msg.message}</div>
            <div>{session && <TranslateButton message={msg.message} />}</div>
          </div>
          <span className="text-xs font-bold text-blue-400">/{msg.name}</span>
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
          powered by TypeScript, TRPC, Next.js, PostgresSQL and OpenAI API
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

      <footer className="flex flex-col items-center pt-10 pb-2 text-sm">
        <p>
          Made with ❤️ by{" "}
          <a href="https://github.com/sylfort">
            <span className="hover:text-blue-500">github.com/sylfort</span>
          </a>
        </p>
      </footer>
    </main>
  );
};

export default Home;
