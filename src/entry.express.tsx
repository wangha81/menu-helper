/*
 * WHAT IS THIS FILE?
 *
 * It's the  entry point for the express server when building for production.
 *
 * Learn more about the cloudflare integration here:
 * - https://qwik.builder.io/qwikcity/adaptors/node/
 *
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/node";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";
import express from "express";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import compression from "compression";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  addOrder,
  deprocateOrder,
  finishOrder,
  syncOrder,
  refreshOrder,
} from "./handlers";

// Directories where the static assets are located
const distDir = join(fileURLToPath(import.meta.url), "..", "..", "dist");
const buildDir = join(distDir, "build");

// Create the Qwik City express middleware
const { router, notFound } = createQwikCity({ render, qwikCityPlan });

// Create the express server
// https://expressjs.com/
const app = express();

// Setup CORS config with default
// const allowlist = ["http://loaclhost:3000", "http://localhost:5173"];

// Enable gzip compression
app.use(compression());

// Static asset handlers
// https://expressjs.com/en/starter/static-files.html
app.use(`/build`, express.static(buildDir, { immutable: true, maxAge: "1y" }));
app.use(express.static(distDir, { redirect: false }));

// Use Qwik City's page and endpoint request handler
app.use(router);

// Use Qwik City's 404 handler
app.use(notFound);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("addOrder", addOrder(socket));
  socket.on("finishOrder", finishOrder(socket));
  socket.on("deprocateOrder", deprocateOrder(socket));
  socket.on("syncOrder", syncOrder());
  socket.on("refreshOrder", refreshOrder(socket));
});

// Constants
const PORT = process.env.PORT || 3000;

// Start the express server
httpServer.listen(PORT, async () => {
  const addr = httpServer.address();
  /* @ts-ignore */
  console.log(`Server starter: ${addr?.address}:${addr?.port}`);
});
