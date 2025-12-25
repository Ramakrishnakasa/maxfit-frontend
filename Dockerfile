# 1️⃣ Base image (Node + npm)
FROM node:20-alpine


# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy dependency files first (for caching)
COPY package*.json ./

# 4️⃣ Install dependencies inside image
RUN npm install

# 5️⃣ Copy rest of the frontend code
COPY . .

# 6️⃣ Tell Docker which port app uses
EXPOSE 5173

# 7️⃣ Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
