# Stage 1: Build the Vue.js application
FROM node:20-alpine AS builder

# The README mentions pnpm, so we'll install it
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package manifests and install dependencies
# This leverages Docker's layer caching
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# Copy the rest of the application source code
COPY . .

# Run the build script to generate static files in the /app/dist directory
RUN pnpm build


# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine AS production

# Copy the built static files from the 'builder' stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]