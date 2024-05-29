import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function translateMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.query;
  console.log(text);

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Translate the following text to Japanese and return just the translation:${text}`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
    });

    const translation = completion.choices[0];
    console.log(translation);
    res.status(200).json({ translation });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Failed to translate message" });
  }
}
