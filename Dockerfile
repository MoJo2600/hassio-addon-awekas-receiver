FROM node:22-alpine

LABEL org.opencontainers.image.authors="Rubén Hernández Vicente <contacto@rubenhernandez.es>, Christian Erhardt <christian.erhardt@mojo2k.de>" \
      org.opencontainers.image.title="AWEKAS Receiver" \
      org.opencontainers.image.description="Awekas receiver for Bresser weather stations to publish data on Influx DB" \
      org.opencontainers.image.source="https://github.com/MoJo2600/hassio-addon-awekas-receiver" \
      org.opencontainers.image.licenses="MIT"

WORKDIR /app

# Copy built application
COPY dist /app/dist
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

# Install production dependencies
RUN yarn install --production=true --frozen-lockfile

USER node

CMD ["node", "dist/index.js"]
