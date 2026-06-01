FROM node:24-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS builder

ARG VITE_API_HOST=http://localhost:8080
ENV VITE_API_HOST=$VITE_API_HOST

COPY . .
RUN npm run build

FROM node:24-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8181

COPY --from=builder /app/.output ./.output

EXPOSE 8181

CMD ["node", ".output/server/index.mjs"]
