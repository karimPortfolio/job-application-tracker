FROM node:20-alpine
WORKDIR /app

# 1. Copy ONLY the package files first
COPY package*.json ./

# 2. Install dependencies (This layer is cached!)
RUN npm install

# 3. Copy the rest of your code
# If only code changes, Docker skips step 1 and 2 and goes straight here
COPY . .

CMD ["npm", "run", "start:dev"]