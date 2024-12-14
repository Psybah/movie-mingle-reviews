# Movie Mingle Reviews

Movie Mingle Reviews is a single-page movie database application where users can search for movies, read detailed descriptions, and share their own reviews. The app leverages modern web development tools and practices to deliver an interactive and visually appealing experience.

## Features
- **Search Bar:** Quickly search for movies by title.
- **Movie Details:** View detailed descriptions, ratings, and other metadata for each movie.
- **Comment Section:** Leave and read reviews for each movie.
- **Responsive Design:** Optimized for various screen sizes and devices.
- **Movie API Integration:** Fetches movie data from a third-party API.

## Tech Stack
This project is built with:
- **[Vite](https://vitejs.dev/):** For fast and efficient development.
- **[TypeScript](https://www.typescriptlang.org/):** Ensures type safety and scalability.
- **[React](https://reactjs.org/):** A robust library for building the user interface.
- **[Tailwind CSS](https://tailwindcss.com/):** For utility-first, responsive styling.
- **[shadcn/ui](https://shadcn.dev/):** Provides elegant UI components to enhance the design.

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Psybah/movie-mingle-reviews.git
   cd movie-mingle-reviews
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Configuration

1. Sign up for an API key from a movie database provider like [OMDb API](https://www.omdbapi.com/) or [TMDB](https://www.themoviedb.org/).
2. Create a `.env` file in the root directory and add your API key:
   ```env
   VITE_API_KEY=your_api_key_here
   VITE_API_BASE_URL=https://api.themoviedb.org/3
   ```
3. Restart the development server to apply the changes.

## Scripts

Here are the commonly used npm scripts for this project:
- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run preview`**: Previews the production build.
- **`npm run lint`**: Runs linters to ensure code quality.

## Folder Structure

The project follows a structured folder hierarchy for maintainability:
```
movie-mingle-reviews/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── services/         # API-related logic
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript types
│   └── App.tsx           # Main application component
├── public/               # Static assets
├── .env                  # Environment variables
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Project metadata and dependencies
```

## Contributions

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add your commit message"
   git push origin feature/your-feature-name
   ```
4. Submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any inquiries or feedback, feel free to reach out through the repository's [issues page](https://github.com/Psybah/movie-mingle-reviews/issues).

---
Thank you for exploring **Movie Mingle Reviews**! Enjoy your journey into the world of movies!
