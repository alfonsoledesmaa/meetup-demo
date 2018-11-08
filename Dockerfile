# Pull Node 8 image
FROM node:8-alpine

# Move to working directory
WORKDIR /usr/src/app

# Copy dependencies file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy content from the directory
COPY . .

# Command to start the API
CMD ["npm", "start"]