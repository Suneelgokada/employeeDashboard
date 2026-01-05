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
