# Home Assistant Add-on: AWEKAS Receiver

[![GitHub Release][releases-shield]][releases]
![Project Stage][project-stage-shield]

Receive weather information from Bresser WiFi weather stations in AWEKAS format and store it in InfluxDB.

## About

This Home Assistant add-on allows you to receive weather data from Bresser WiFi weather stations using the AWEKAS protocol and automatically store it in an InfluxDB database.

Perfect for:
- Bresser weather station owners
- Users running InfluxDB
- Weather data enthusiasts who want local storage

## Installation

1. Add this repository to your Home Assistant instance:
   - Navigate to **Settings** → **Add-ons** → **Add-on Store**
   - Click the **⋮** menu (three dots) in the top right
   - Select **Repositories**
   - Add: `https://github.com/MoJo2600/hassio-addon-awekas-receiver`
   - Click **Add**

2. Install the AWEKAS Receiver add-on:
   - Find "AWEKAS Receiver" in the add-on store
   - Click **Install**

3. Configure the add-on (see Configuration section in [DOCS.md](awekas-receiver/DOCS.md))

4. Start the add-on

## Configuration

The add-on requires InfluxDB connection details. See the [documentation](awekas-receiver/DOCS.md) for detailed configuration options.

## Development

To work on this add-on locally:

```bash
cd awekas-receiver
npm install
npm run build
npm start
```

## Support

- [GitHub Issues](https://github.com/MoJo2600/hassio-addon-awekas-receiver/issues)

## License

MIT License - see [LICENSE](LICENSE) file

[releases-shield]: https://img.shields.io/github/release/MoJo2600/hassio-addon-awekas-receiver.svg
[releases]: https://github.com/MoJo2600/hassio-addon-awekas-receiver/releases
[project-stage-shield]: https://img.shields.io/badge/project%20stage-production%20ready-brightgreen.svg
