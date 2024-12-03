import { app } from "./app";
import "dotenv/config";

async function index() {
  const PORT = process.env.APP_PORT || 8080;

  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  // Graceful shutdown on SIGINT (Ctrl+C) or SIGTERM (e.g., from Docker/Kubernetes)
  process.on("SIGINT", () => {
    console.log("Received SIGINT. Closing server...");
    server.close(() => {
      console.log("Server closed");
      process.exit(0); // Exit gracefully
    });
  });

  process.on("SIGTERM", () => {
    console.log("Received SIGTERM. Closing server...");
    server.close(() => {
      console.log("Server closed");
      process.exit(0); // Exit gracefully
    });
  });
}

index();
