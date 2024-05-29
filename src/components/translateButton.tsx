// import axios from "axios";
// import translateMessage from "../pages/api/translate";

// export const TranslateButton = ({
//   message
// }: {
//   message: string
// }) => (
//   <button
//     onClick={() => translateMessage(message)}
//     className="ml-2 bg-blue-500 text-white p-1 text-xs rounded w-24"
//   >
//     Translate to Japanese with AI!
//   </button>
// );

// import axios from "axios";
import { useState } from "react";

export const TranslateButton = ({ message }: { message: string }) => {
  const [translation, setTranslation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const msg = message;
  console.log(msg);
  const handleTranslate = async () => {
    setLoading(true);
    setError(null);
    try {
      // const response = await fetch("/api/translate", { text: message });
      // const response = await fetch("/api/translate", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: msg,
      // });
      const response = await fetch(`/api/translate?text=${msg}`);
      const data = await response.json();
      console.log(data.result); // Outputs: The passed variable is: someValue
      setTranslation(data.translation.message.content);
      console.log(data.translation.message.content);
    } catch (err) {
      setError("Failed to translate message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleTranslate}
        className={`ml-2 p-1 text-xs rounded w-24 ${
          translation ? "bg-gray-700 text-black" : "bg-blue-500 text-white"
        }`}
        disabled={!!translation}
      >
        {loading ? "Translating..." : "Translate to Japanese"}
      </button>
      {translation && (
        <p className="mt-2 text-green-500">Translation: {translation}</p>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};
