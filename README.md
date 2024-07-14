README
Sapling Stock Management Application

This application provides an interface for managing and displaying sapling stock data by warehouse. It fetches sapling master data and sapling stock data from JSON files and presents the data in a tabular format.
Table of Contents

    Installation
    Project Structure
    Features
    Usage
    Styling
    Conclusion

Installation

    Clone the repository:

    bash

git clone https://github.com/your-repo/sapling-stock-management.git
cd sapling-stock-management

Install dependencies:

bash

npm install

Run the application:

bash

    npm start

Project Structure

java

sapling-stock-management/
├── public/
│   ├── saplings_master.json
│   ├── saplinginwardoutward.json
│   └── index.html
├── src/
│   ├── App.css
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md

Features

    Data Fetching: Fetches saplings master data and sapling stock data from JSON files.
    Data Processing: Aggregates sapling stock data by saplings and warehouses.
    Data Display: Displays data in a table format with fixed headers and first column for better readability.

Usage

    Fetching Data:
        The application fetches sapling master data from saplings_master.json.
        It also fetches sapling stock data from saplinginwardoutward.json.

    Data Processing:
        Sapling stock data is aggregated to calculate total stock, total distribute, and balance stock for each sapling.
        The data is further grouped by warehouse for detailed display.

    Data Display:
        The main interface is a table with saplings as columns and warehouses as rows.
        Each cell displays the total stock, total distribute, and balance stock for the respective sapling and warehouse.

Styling

    The application uses custom CSS for styling, located in App.css.
    Fonts are imported from Google Fonts.
    Table headers and first column are sticky for better navigation.
    Different colors and styles are applied to distinguish between total stock, distribute, and balance stock.

Conclusion

This application provides a comprehensive view of sapling stock data, allowing users to easily manage and analyze sapling stocks across different warehouses. The use of React ensures a dynamic and responsive user interface, while the custom styling enhances readability and user experience.