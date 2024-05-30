import { useState } from "react";

export const TranslateButton = ({ message }: { message: string }) => {
  const [translation, setTranslation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const msg = message;

  const handleTranslate = async () => {
    setLoading(true);
    setError(null);
    try {
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
    <div className="flex justify-center">
      {!translation && (
        <button
          onClick={handleTranslate}
          className={`m-2 p-1 text-xs font-semibold rounded w-24 ${
            translation ? "bg-gray-700 text-black" : "bg-green-600 text-white"
          }`}
          disabled={!!translation}
        >
          {loading ? "Translating..." : "Translate to Japanese"}
        </button>
      )}
      {translation && (
        <p className="mt-2 text-green-500">Translation: {translation}</p>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};
