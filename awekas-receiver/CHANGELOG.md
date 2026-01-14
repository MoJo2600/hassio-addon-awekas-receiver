## 1.0.14

- Add `/state` endpoint to expose latest weather measurements to Home Assistant via REST sensor

## 1.0.13

- Handle uncaught exceptions and unhandled rejections gracefully, logging errors and allowing watchdog to restart the container

## 1.0.12

- Stop restarting on missing configuration by validating in run.sh and exiting cleanly until the user fixes settings

## 1.0.10

- Block add-on startup when required configuration values are missing to avoid running with incomplete setup

## 1.0.9

- Fix add-on watchdog URL to satisfy Supervisor schema requirements (tcp://[HOST]:3000)

## 1.0.0

- Initial release as Home Assistant add-on
- Support for receiving AWEKAS format weather data from Bresser WiFi weather stations
- InfluxDB integration for data storage
- Configurable rate limiting
- User authentication support
