ARG BUILD_FROM
FROM $BUILD_FROM

# Install Node.js and yarn
RUN apk add --no-cache nodejs yarn

LABEL io.hass.name="AWEKAS Receiver" \
      io.hass.description="Awekas receiver for Bresser weather stations to publish data on Influx DB" \
      io.hass.version="1.0.0" \
      io.hass.type="addon" \
      io.hass.arch="armhf|armv7|aarch64|amd64|i386" \
      maintainer="Christian Erhardt <christian.erhardt@mojo2k.de>" \
      org.opencontainers.image.authors="Rubén Hernández Vicente <contacto@rubenhernandez.es>, Christian Erhardt <christian.erhardt@mojo2k.de>" \
      org.label-schema.name="awekas-receiver" \
      org.label-schema.description="Awekas receiver for Bresser weather stations to publish data on Influx DB" \
      org.label-schema.vcs-url="https://github.com/MoJo2600/hassio-addon-awekas-receiver" \
      org.label-schema.license="MIT"

WORKDIR /app

# Copy built application
COPY dist /app/
COPY package.json /app/
COPY yarn.lock /app/

# Install production dependencies
RUN yarn install --production=true --frozen-lockfile

# Copy run script
COPY run.sh /
RUN chmod a+x /run.sh

CMD ["/run.sh"]
