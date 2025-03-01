FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    curl gnupg ca-certificates lsb-release
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate  
WORKDIR /app
COPY . .
WORKDIR /app/front-end
RUN pnpm install && pnpm build
WORKDIR /app/back-end
RUN pnpm install && pnpm build
CMD ["pnpm", "start:prod"]
EXPOSE 3000