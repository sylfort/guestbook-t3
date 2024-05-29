// import { createRouter } from "./context";
// import { z } from "zod";
// import { translate } from "../api/translate"; // Assuming you have a service for translation

// export const translateRouter = createRouter().query("translate", {
//   input: z.object({
//     text: z.string(),
//   }),
//   async resolve({ input }) {
//     const translation = await translate(input.text);
//     return { translation };
//   },
// });

// // Export type definition of API
// export type AppRouter = typeof appRouter;
