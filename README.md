Doctor Listing Page

Welcome to the Doctor Listing Page project! This React-based web application allows users to search, filter, and sort a list of doctors based on various criteria such as name, specialty, consultation type, and location. The application is designed to be user-friendly, responsive, and efficient, with all filtering and sorting handled client-side for optimal performance.
Table of Contents

Features
Technologies Used
Installation
Usage
Project Structure
API Integration
Testing
Contributing
License

Features

Autocomplete Search Bar: Search for doctors by name with real-time suggestions (top 3 matches).
Filter Panel:
Consultation Type: Single-select filter for "Video Consult" or "In Clinic".
Specialties: Multi-select filter for doctor specialties.
Locations: Multi-select filter for clinic locations.
Sort Options: Sort doctors by fees (ascending) or experience (descending).


Responsive Design: Fully responsive layout for mobile, tablet, and desktop screens.
URL Parameter Sync: Filters are reflected in the URL for easy sharing and navigation.
Client-Side Filtering: All filtering and sorting are performed on the frontend for speed.
Professional Styling: Modern UI with gradients, shadows, and hover effects using CSS.

Technologies Used

React: JavaScript library for building user interfaces.
React Router: For handling URL parameters and navigation.
Axios: For making API requests to fetch doctor data.
Framer Motion: For smooth animations in the search suggestions.
React Icons: For icons used in the UI (e.g., search, clear).
CSS: Custom styles for a professional and responsive design.

Installation
To run this project locally, follow these steps:

Clone the repository:git clone https://github.com/your-username/doctor-listing-page.git


Navigate to the project directory:cd doctor-listing-page


Install dependencies:npm install


Start the development server:npm start


Open the application:
Visit http://localhost:3000 in your browser.



Usage

Search for Doctors:

Use the search bar at the top to find doctors by name. Suggestions will appear as you type.
Click a suggestion or press Enter to filter the list.


Apply Filters:

Consultation Type: Select "Video Consult" or "In Clinic".
Specialties: Check multiple specialties to filter doctors.
Locations: Check multiple locations to filter by clinic locality.
Sort: Choose to sort by fees or experience.


Clear Filters:

Click "Clear All" to reset all filters and show the full doctor list.


Navigation:

Filters are saved in the URL, allowing you to share or bookmark specific views.
Use the browser's back/forward buttons to navigate through filter states.



Project Structure
doctor-listing-page/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── SearchBar.js
│   │   ├── FilterPanel.js
│   │   └── DoctorCard.js
│   ├── pages/
│   │   └── DoctorListingPage/
│   │       └── index.jsx
│   ├── styles/
│   │   ├── DoctorListingPage.css
│   │   ├── SearchBar.css
│   │   ├── FilterPanel.css
│   │   └── DoctorCard.css
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
└── README.md


components/: Reusable components like SearchBar, FilterPanel, and DoctorCard.
pages/DoctorListingPage/: Main page component for the doctor listing.
styles/: CSS files for styling each component and the main page.

API Integration

API Endpoint: https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
Usage: Fetches doctor data on component mount and performs all filtering/sorting client-side.
Data Structure:
Each doctor object includes name, photo, specialities, experience, fees, clinic, etc.



Testing

Manual Testing:
Search for doctors by name and verify suggestions and filtering.
Apply various combinations of filters and sorting options.
Check responsiveness on different screen sizes (mobile, tablet, desktop).


Automated Testing:
Use data-testid attributes for key elements to support test automation.
Example test IDs: autocomplete-input, doctor-card, filter-specialty-Dentist, etc.



Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and commit (git commit -m 'Add YourFeature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.

![image](https://github.com/user-attachments/assets/ab103731-4f50-412c-84c8-a20e936ae8de)


Please ensure your code follows the project's coding standards and includes relevant tests.
License
This project is licensed under the MIT License - see the LICENSE file for details.
