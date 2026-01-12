ARG BUILD_FROM=ghcr.io/home-assistant/amd64-base:latest
FROM $BUILD_FROM

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Set labels
LABEL io.hass.name="AWEKAS Receiver" \
      io.hass.description="Awekas receiver for Bresser weather stations to publish data on Influx DB" \
      io.hass.version="1.0.0" \
      io.hass.type="addon" \
      io.hass.arch="armhf|armv7|aarch64|amd64|i386" \
      maintainer="Christian Erhardt <christian.erhardt@mojo2k.de>" \
      org.opencontainers.image.authors="Rubén Hernández Vicente <contacto@rubenhernandez.es>, Christian Erhardt <christian.erhardt@mojo2k.de>" \
      org.opencontainers.image.title="AWEKAS Receiver" \
      org.opencontainers.image.description="Awekas receiver for Bresser weather stations to publish data on Influx DB" \
      org.opencontainers.image.source="https://github.com/MoJo2600/hassio-addon-awekas-receiver" \
      org.opencontainers.image.licenses="MIT"

# Build stage
WORKDIR /build

# Copy source files
COPY package*.json tsconfig.json ./
COPY src ./src

# Install dependencies and build
RUN npm ci && npm run build

# Production stage
WORKDIR /app

# Copy built files and install production dependencies only
RUN cp -r /build/dist . && \
    cp /build/package*.json . && \
    npm ci --omit=dev && \
    rm -rf /build

# Copy run script
COPY run.sh /
RUN chmod a+x /run.sh

CMD ["/run.sh"]
