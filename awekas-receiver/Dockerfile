ARG BUILD_FROM
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

# Create app directory
WORKDIR /app

# Copy built application from parent directory
COPY ../dist /app/dist
COPY ../package.json /app/package.json
COPY ../package-lock.json* /app/
COPY ../yarn.lock* /app/

# Install production dependencies
RUN if [ -f yarn.lock ]; then \
      yarn install --production=true --frozen-lockfile; \
    else \
      npm ci --omit=dev; \
    fi

# Copy run script
COPY run.sh /
RUN chmod a+x /run.sh

CMD ["/run.sh"]
