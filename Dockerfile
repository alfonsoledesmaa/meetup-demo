# Pull Node 8 image
FROM node:8-alpine

# Move to working directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy content from the directory
COPY . .

# Expose PORT
EXPOSE 3000

CMD ["npm", "start"]