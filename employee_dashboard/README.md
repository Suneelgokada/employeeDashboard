# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# employeeDashboard



### Features
- Login Authentication--Mock login system to secure the dashboard.
- Employee CRUD Operations--Add, Read, Update, and Delete employee profiles.
- Search & Filters Functions Implemented---Combined filtering by Name, Gender, and Employment Status
- Image Upload (present )
- Print

Image Handling & Technical Decisions
Base64 Encoding: For this project, I handled image uploads using the FileReader API to convert images into Base64 strings.

Reasoning: Since this is a standalone assignment, I chose this method to keep the project lightweight and ensure images persist in Local Storage without needing an external database or backend.

Scalability Note: In a real-world production app, I would use a CDN (Content Delivery Network) or cloud storage like Cloudinary/AWS S3 to store images and save only the URLs in the database to optimize performance and storage limits.

-Data Persistence---Uses Browser Local Storage to ensure data is not lost on page refresh.
-Print Functionality---Optimized print view for generating employee lists.



### Tech Stack
- React.js
- Material UI
- Local Storage
- Routing: React Router DOM
- Icons: MUI Icons
- State Management: React Hooks (useState, useEffect)

### Run Project
npm install
npm run dev
