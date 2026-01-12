#!/usr/bin/with-contenv bashio

# Read configuration from Home Assistant
export PORT=3000
export NODE_ENV=production
export INFLUX_URL=$(bashio::config 'influx_url')
export INFLUX_TOKEN=$(bashio::config 'influx_token')
export INFLUX_ORG=$(bashio::config 'influx_org')
export INFLUX_BUCKET=$(bashio::config 'influx_bucket')
export HASH_SALT=$(bashio::config 'hash_salt')
export ENABLED_USERS=$(bashio::config 'enabled_users')

# Optional rate limiting configuration
if bashio::config.has_value 'rate_limit_max_requests'; then
    export RATE_LIMIT_MAX_REQUESTS=$(bashio::config 'rate_limit_max_requests')
else
    export RATE_LIMIT_MAX_REQUESTS=100
fi

if bashio::config.has_value 'rate_limit_window_minutes'; then
    export RATE_LIMIT_WINDOW_MINUTES=$(bashio::config 'rate_limit_window_minutes')
else
    export RATE_LIMIT_WINDOW_MINUTES=1
fi

if bashio::config.has_value 'rate_limit_delay_seconds'; then
    export RATE_LIMIT_DELAY_SECONDS=$(bashio::config 'rate_limit_delay_seconds')
else
    export RATE_LIMIT_DELAY_SECONDS=2
fi

bashio::log.info "Starting AWEKAS Receiver..."
bashio::log.info "Connecting to InfluxDB at ${INFLUX_URL}"

# Start the application
cd /app
exec node dist/index.js
