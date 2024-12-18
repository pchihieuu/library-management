# Stage 1: Build stage
FROM node:18-alpine AS build

# Set the working directory for build stage
WORKDIR /usr/src/app

# Copy package files and install dependencies (including devDependencies)
COPY package.json package-lock.json ./
RUN npm install

# Copy source code into the container
COPY . .

# Build the app (if needed, e.g. TypeScript build)
# RUN npm run build  # Uncomment if using TypeScript or need to compile

# Stage 2: Production stage
FROM node:18-alpine

# Set the working directory for production
WORKDIR /usr/src/app

# Copy only production dependencies and built app from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm install --only=production

# Expose the backend port
EXPOSE 8000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "start"]

