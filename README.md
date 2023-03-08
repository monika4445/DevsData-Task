# What Does the Event Registration Platform do?

The Event Registration Platform is a tool designed to simplify the event management process for organizers. It provides a comprehensive set of features to create and  manage events of all types and sizes.
The Event Registration Platform also enables clients to create reservations for events. Our reservation feature allows clients to reserve tickets for events, making it a convenient option for group bookings or for those who need to coordinate with multiple attendees.

# How to run the project?

1. First, download the repository by running the following command in your terminal or PowerShell:  git clone https://github.com/monika4445/Event-Registration-Platform.git
2. Open your terminal (for Linux and macOS) or PowerShell (for Windows).
3. Navigate to the corresponding folder, "Event-Registration-Platform",  by running the following command in your terminal: cd Event-Registration-Platform
4. Run the following command in your terminal to ensure you are in the correct directory: pwd
5. Install all dependencies by running the following command in your terminal:  npm install
6. Open the config/config.json file and configure your database settings accordingly.
7. Migrate all relations to your database by running the following command:  npx sequelize-cli db:migrate
8. Start the application by running the following command in your terminal:  npm run dev
9.  Once the application has started, you can access it at http://localhost:5000
10. Since the backend is the only available part of the app at the moment, you can test it by sending HTTP requests to the API endpoints using Postman.
