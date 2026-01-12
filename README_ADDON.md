# Home Assistant Add-on Repository

To add this add-on to your Home Assistant instance:

1. Navigate to **Settings** → **Add-ons** → **Add-on Store**
2. Click the three dots menu in the top right
3. Select **Repositories**
4. Add this repository URL: `https://github.com/MoJo2600/hassio-addon-awekas-receiver`
5. Click **Add**
6. Find "AWEKAS Receiver" in the add-on store
7. Click **Install**

## Local Development

To test this add-on locally:

1. Build the TypeScript code:
   ```bash
   npm run build
   ```

2. Test with Docker:
   ```bash
   docker build -t awekas-receiver --build-arg BUILD_FROM="ghcr.io/home-assistant/amd64-base:3.20" .
   ```

## Configuration

See [DOCS.md](DOCS.md) for detailed configuration instructions.
