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

## Testing the Build

```bash
# From repository root
docker build awekas-receiver/
```

## Publishing

Simply commit and push your changes. Users add this repository to their Home Assistant instance, and it will build the add-on directly from source.

```bash
git add .
git commit -m "Update addon"
git push
```

Home Assistant will clone the repo and build the Dockerfile during installation.
