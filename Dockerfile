# syntax=docker/dockerfile:1.7

FROM ghcr.io/pnpm/pnpm:11.5.2 AS base
RUN pnpm runtime set node 24 -g
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch
COPY package.json ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --offline

FROM deps AS builder
ARG VITE_API_HOST=http://localhost:8080
ARG PASTEY_VERSION=""
ARG ORIANA_VERSION=""
ARG COMMIT=""
ARG COMMIT_TIME=""
ENV VITE_API_HOST=$VITE_API_HOST
ENV VITE_PASTEY_VERSION=$PASTEY_VERSION
ENV VITE_ORIANA_VERSION=$ORIANA_VERSION
ENV VITE_ORIANA_COMMIT=$COMMIT
ENV VITE_ORIANA_COMMIT_TIME=$COMMIT_TIME
COPY . .
RUN pnpm run build

FROM nginx:1.29-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8181
