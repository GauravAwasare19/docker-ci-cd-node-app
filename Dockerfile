# 1. Use a lightweight Node.js image as the base
FROM node:18-alpine

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json first (for caching npm install)
COPY package*.json ./

# 4. Install dependencies
RUN npm install --production

# 5. Copy the rest of the project files
COPY . .

# 6. Expose the port your app runs on
EXPOSE 5000

# 7. Start the app
CMD ["npm", "start"]
