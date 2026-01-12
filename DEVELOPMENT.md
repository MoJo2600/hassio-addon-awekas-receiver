# Development Guide

## Structure

This repository contains a Home Assistant add-on. All source code and configuration is in the `awekas-receiver/` folder.

```
hassio-addon-awekas-receiver/
├── repository.json          # HA repository definition
├── README.md               # Repository overview
└── awekas-receiver/        # The add-on
    ├── src/                # TypeScript source code
    ├── package.json        # Dependencies
    ├── tsconfig.json       # TypeScript config
    ├── Dockerfile          # Container build
    ├── config.yaml         # Add-on configuration
    ├── run.sh             # Startup script
    └── DOCS.md            # User documentation
```

## Local Development

```bash
cd awekas-receiver
npm install
npm run build
npm start
```

## Testing the Docker Build

You can build the Docker image, but **cannot run it directly** because it requires Home Assistant's supervisor (s6-overlay):

```bash
# Build only (from repository root)
docker build awekas-receiver/
```

To actually test the addon, you need to:
1. Install it in a real Home Assistant instance
2. Or use the Home Assistant Builder for testing

## Testing Without Home Assistant

For local development without Home Assistant, run the app directly:

```bash
cd awekas-receiver

# Set environment variables
export PORT=3000
export INFLUX_URL=http://localhost:8086
export INFLUX_TOKEN=your-token
export INFLUX_ORG=your-org
export INFLUX_BUCKET=test
export HASH_SALT=awekas
export ENABLED_USERS=TORRE01

# Run the app
npm start
```

## Publishing

Simply commit and push your changes. Users add this repository to their Home Assistant instance, and it will build the add-on directly from source.

```bash
git add .
git commit -m "Update addon"
git push
```

Home Assistant will clone the repo and build the Dockerfile during installation.
