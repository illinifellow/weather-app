## Quick start

Run `npm i` to install dependencies.  
Run `npm start` to start development server.

## Build

Run `npm run build` to build a static app for deployment.

## What's done:

- Home, favorites and 404 screens
- Location & city autodetect
- City search & autocomplete
- Weather & 5-days-forecast cards
- Favorites indicator, cache & functionality
- Fahrenheit/Celsius metric system switcher & cache
- Mobile devices responsive design
- Optimized for 'add to home screen' iOS feature
- Colors, styles & animations instead of dark theme
- Mock data backup

## What's missing:

- Cities imagery can be improved with another API due to current API does not provide a picture for any requested city. Placed a placeholder instead.
- Error handling is not implemented because API error responses backed up by mock data for development/preview purposes.
- Default city (Tel Aviv) is not set because of location autodetect has been implemented instead.
- Autocomplete input to be further optimized for keyboard interaction.
- The side effects of some cases of adding/removing to favorites are not fixed and moved to the next sprint :)
