// src/server.ts

import "dotenv/config";
console.log("DATABASE_URL =", process.env.DATABASE_URL);

import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
