# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code into the container
COPY . .

# Expose the backend port
EXPOSE 8000

# Set the environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "start"]
