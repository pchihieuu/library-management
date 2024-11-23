import cors from "cors";

const corsMiddleware = cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,
});


export default corsMiddleware;
