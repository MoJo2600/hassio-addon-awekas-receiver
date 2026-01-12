# Home Assistant Add-on: AWEKAS Receiver

## About

This add-on allows you to receive weather information from Bresser WiFi weather stations in AWEKAS format and store it in InfluxDB.

## Configuration

### InfluxDB Settings

- **influx_url**: The URL of your InfluxDB instance (e.g., `http://influxdb:8086`)
- **influx_token**: Your InfluxDB API token (required)
- **influx_org**: Your InfluxDB organization ID (required)
- **influx_bucket**: The bucket name where weather data will be stored (default: `weather`)

### Authentication

- **hash_salt**: Salt to use in password hashing (default: `awekas`)
- **enabled_users**: Comma-separated list of users enabled to publish data (default: `TORRE01`)

### Rate Limiting (Optional)

- **rate_limit_max_requests**: Maximum number of requests before throttling starts (default: 100)
- **rate_limit_window_minutes**: Time window in minutes to count requests (default: 1)
- **rate_limit_delay_seconds**: Delay in seconds for throttled requests (default: 2)

## Example Configuration

```yaml
influx_url: http://influxdb:8086
influx_token: your-influxdb-token-here
influx_org: your-org-id
influx_bucket: weather
hash_salt: awekas
enabled_users: TORRE01,STATION02
rate_limit_max_requests: 100
rate_limit_window_minutes: 1
rate_limit_delay_seconds: 2
```

## How to Use

1. Install the InfluxDB add-on if you haven't already
2. Create a bucket in InfluxDB for weather data
3. Generate an API token in InfluxDB with write permissions to the bucket
4. Configure this add-on with your InfluxDB details
5. Configure your Bresser weather station to send data to `http://homeassistant.local:3000` (or your Home Assistant URL)

## Support

For issues and questions, visit: https://github.com/MoJo2600/hassio-addon-awekas-receiver
