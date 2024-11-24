import cors from "cors";

const corsMiddleware = cors({
  origin: process.env.GATEWAY_HOST,
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,
});


export default corsMiddleware;
