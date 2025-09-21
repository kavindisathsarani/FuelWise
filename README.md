# FuelWise

A simple and practical mobile application designed to help users keep track of their fuel usage and expenses. Built with React Native, Expo, Tailwind CSS, and Firebase.

## Features

- **Fuel Entry Tracking**: Log every fuel refill with details such as:
  - Fuel type (petrol or diesel)
  - Date and time
  - Quantity filled (in liters)
  - Price per unit
  - Total cost (automatically calculated)
  - Optional odometer readings
  - Location and notes

- **Fuel History**: View all your fuel entries in an organized list with:
  - Edit and delete functionality
  - Search and filter capabilities
  - Detailed entry information

- **Statistics & Analytics**: Get helpful insights including:
  - Total fuel consumed
  - Total money spent
  - Average fuel efficiency (km/liter)
  - Fuel type breakdown
  - Monthly and yearly summaries

- **User-Friendly Interface**: Clean and intuitive design with:
  - Modern UI using Tailwind CSS
  - Responsive layout
  - Easy navigation
  - Real-time data updates

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Firebase** for backend services:
  - Firestore for data storage
  - Authentication for user management
- **Expo Router** for navigation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Expo Go app on your mobile device

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd fuelwise
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure Firebase
   - Create a new Firebase project
   - Enable Firestore and Authentication
   - Update the Firebase configuration in `firebase.ts`

4. Start the development server
   ```bash
   npm start
   ```

5. Run the app
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go app on your phone

## Project Structure

```
fuelwise/
├── app/                    # App screens and navigation
│   ├── (auth)/            # Authentication screens
│   ├── (dashboard)/       # Main app screens
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── FuelEntryForm.tsx  # Fuel entry form
│   ├── FuelHistoryList.tsx # Fuel history display
│   └── FuelStatistics.tsx # Statistics and analytics
├── context/               # React contexts
├── services/              # API and Firebase services
├── types/                 # TypeScript type definitions
└── assets/               # Images and fonts
```

## Usage

1. **Sign Up/Login**: Create an account or login to access the app
2. **Add Fuel Entry**: Tap the "+" button to add a new fuel entry
3. **View History**: Browse through all your fuel entries
4. **Check Statistics**: View detailed analytics and insights
5. **Edit/Delete**: Modify or remove existing entries as needed

## 📺 Demo Video

Check out the FuelWise app in action on YouTube:

[Watch the Demo](https://youtu.be/n5RnXNIr-hA?si=vord80adkPKwgUN_)

## Download

📦 **Download APK:** [Google Drive Link](https://drive.google.com/file/d/1z61ycfeMNFJO26yv8YsTfl_0YZRhwyIA/view?usp=sharing)


## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.