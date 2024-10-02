# Use the official Bun image as a base
FROM oven/bun:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy bun.lockb and package.json
COPY bun.lockb package.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["bun", "src/index.js"]
