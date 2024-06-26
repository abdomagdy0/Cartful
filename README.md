# Cartful
Cartful is a full-stack web application for managing items, built using Node.js, Express.js, EJS Templating Engine, MySQL, and MongoDB.
Functionality
![GITHUB](https://github.com/abdomagdy0/Cartful/assets/91535529/5b4c3182-5ef4-4330-9c40-cc8f78957661)
For Users:
```
View Products:
        Users can browse a catalog of products available on the platform.
   Add to Cart:
        Users can add products to their shopping cart.
  Edit Cart:
        Users can update the quantity of products in their cart.
    Remove from Cart:
        Users can remove products from their cart.
  View Orders:
        Users can view orders placed, including details such as order ID, products ordered, quantity, and total amount.
```
For Admins:

    Admin Dashboard:
        Administrators have access to a dashboard to manage products and orders.
    Add Product:
        Admins can add new products to the platform, specifying details like name, description, price, and availability.
    Edit Product:
        Admins can modify existing product details such as name, description, price, and availability.
    Delete Product:
        Admins can delete products from the platform.

    

Technologies Used

- Node.js: Backend server environment.
- Express.js: Web framework for building RESTful APIs and web applications.
- EJS Templating Engine: Used for server-side rendering of HTML templates.
- MySQL: Relational database management system for storing product and user data.
- MongoDB: NoSQL database used for storing unstructured or semi-structured data, possibly used for session storage or additional data storage.

Folder Structure
- controllers/: Contains controllers handling the business logic.
- models/: Defines data models for both MySQL and MongoDB databases.
- routes/: Defines the routes and endpoints of the application.
- public/: Stores static assets such as CSS, images, and client-side JavaScript.
- views/: Contains the EJS templates for rendering HTML.
- util/: Utility functions used across the application.


