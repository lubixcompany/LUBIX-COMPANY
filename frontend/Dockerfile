FROM node:20-alpine

WORKDIR /app

# Install pnpm package manager
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

EXPOSE 5173

# Run development server
CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]






 