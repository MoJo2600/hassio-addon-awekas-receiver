#!/command/with-contenv bashio
# ==============================================================================
# Home Assistant Add-on: AWEKAS Receiver
# Runs the AWEKAS Receiver application
# ==============================================================================

bashio::log.info "Starting AWEKAS Receiver..."

# Validate required configuration before starting the app to avoid restart loops
required_keys=(influx_url influx_token influx_org influx_bucket hash_salt enabled_users)
for key in "${required_keys[@]}"; do
    if ! bashio::config.has_value "${key}"; then
        bashio::log.error "Missing required configuration option: ${key}."
        bashio::log.error "Set the required options in the add-on configuration and restart the add-on."
        bashio::log.error "Add-on will remain stopped until configuration is complete."
        exit 0
    fi
done
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

bashio::log.info "Connecting to InfluxDB at ${INFLUX_URL}"

# Start the application
cd /app || bashio::exit.nok "Could not change to app directory"
exec node dist/index.js
