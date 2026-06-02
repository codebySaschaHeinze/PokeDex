# PokeDex

## Short Project Description

PokeDex is a static Pokédex web application that fetches Pokémon data from the PokéAPI and displays it in an interactive browser interface. The project focuses on API-based data loading, dynamic rendering, and responsive frontend behavior.

## Live Demo

[https://pokedex.saschaheinze.de](https://pokedex.saschaheinze.de)

## Tech Stack

- HTML
- CSS
- JavaScript
- Fetch API
- PokéAPI
- JSDoc for generated documentation

## Features

- Pokémon cards rendered dynamically from PokéAPI data.
- Generation selection for loading Pokémon by region.
- Cached generation data after the first load to avoid repeated API requests for the same generation.
- Search by Pokémon name within the currently loaded generation.
- Detail card with Pokémon artwork, basic information, and stats.
- About and Stats tabs inside the detail view.
- Previous and next navigation inside the detail card.
- Pokémon cry playback from API-provided audio data.
- Compare mode for selecting and viewing two Pokémon side by side.
- Type-based card colors and detail styling.
- Loading spinner and basic error states for API requests.
- Responsive layout adjustments for smaller screens.
- Keyboard support for Enter search, Escape close behavior, and focus handling in the detail card.

## Local Setup

This is a static frontend project without a build step for running the application.

To run it locally:

1. Clone or download the repository.
2. Open the project folder in a code editor.
3. Serve the project with a local static server, for example the Visual Studio Code Live Server extension.
4. Open `index.html` through the local server in your browser.

## Project Status

This is a portfolio project and may be improved further with additional features, refinements, and documentation updates.
