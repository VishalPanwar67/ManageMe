## Project Management Tool - README

# <span style="color: Red;">Backend Part</span>

# <span style="color: #4169E1;"> # Project Management Tool - Package.json Guide </span>

This document explains the structure and contents of the `package.json` file for the Project Management Tool. This file is essential for managing project dependencies, scripts, and metadata.

## 1. Basic Information

The basic information about the project is defined in the following fields:

- **name**: The name of the project.
  - Example: `"name": "projectmanagementtool"`
- **version**: The current version of the project, following [Semantic Versioning](https://semver.org/).
  - Example: `"version": "1.0.0"`
- **description**: A brief description of what the project does.
  - Example: `"description": "this is project management tool"`
- **main**: The main entry point for the application.
  - Example: `"main": "backend/server.js"`
- **author**: The name of the author of the project.
  - Example: `"author": "Vishal Panwar"`
- **license**: The license under which the project is distributed.
  - Example: `"license": "ISC"`
- **type**: Indicates that the project uses ES modules.
  - Example: `"type": "module"`

## 2. Scripts

Scripts are commands that can be run using npm. The following scripts are defined:

| Command | Description                                                                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `dev`   | Runs the server in development mode using `nodemon`. This automatically restarts the server when file changes are detected. |
| `start` | Starts the server normally using Node.js.                                                                                   |

### Example:

```bash
npm run dev   # For development mode
npm start     # To start the server
```

---

# <span style="color: #4169E1;"> # Project Configuration Settings Guide </span>

This document outlines the configuration settings for your project, detailing the necessary environment variables and their purposes.

Create the .env file and add this values:=>

## 1. MongoDB Configuration

- **MONGODB_URL**: The connection string used to connect to your MongoDB database.
  - **Example**:
    ```
    mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority&appName=<app-name>
    ```

## 2. Server Configuration

- **PORT**: The port on which your server will run.

  - **Example**: `5000`

- **NODE_ENV**: The environment in which the application is running (e.g., development, production).
  - **Example**: `development`

## 3. JWT Configuration

- **JWT_SECRET**: A secret key used to sign JSON Web Tokens for authentication.
  - **Example**: `your_jwt_secret`

## 4. Cloudinary Configuration

Cloudinary is used for media management (images, videos).

- **CLOUDINARY_CLOUD_NAME**: Your Cloudinary account cloud name.

  - **Example**: `your_cloud_name`

- **CLOUDINARY_API_KEY**: The API key for accessing Cloudinary services.

  - **Example**: `your_api_key`

- **CLOUDINARY_API_SECRET**: The secret key associated with your Cloudinary account.

  - **Example**: `your_api_secret`

- **CLOUDINARY_URL**: The complete Cloudinary URL used for API access.
  - **Example**:
    ```
    cloudinary://<api_key>:<api_secret>@<cloud_name>
    ```

For more information on managing environment variables in Node.js, refer to the [dotenv documentation](https://www.npmjs.com/package/dotenv).

---

# <span style="color: #4169E1;"> Authentication API Documentation </span>

## <span style="color: darkorange;">Register</span>

**<span style="color: purple;">POST</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/api/auth/register`</span>

### Request Body (urlencoded)

| Field                                       | Value                                                  |
| ------------------------------------------- | ------------------------------------------------------ |
| <span style="color: green;">username</span> | <span style="color: orange;">day7User</span>           |
| <span style="color: green;">email</span>    | <span style="color: orange;">day7User@gmail.com</span> |
| <span style="color: green;">password</span> | <span style="color: orange;">day7User</span>           |

---

## <span style="color: darkorange;">Login</span>

**<span style="color: purple;">POST</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/api/auth/login`</span>

### Request Body (urlencoded)

| Field                                       | Value                                                   |
| ------------------------------------------- | ------------------------------------------------------- |
| <span style="color: green;">username</span> | <span style="color: orange;">firstUsre</span>           |
| <span style="color: green;">email</span>    | <span style="color: orange;">firstUsre@gmail.com</span> |
| <span style="color: green;">password</span> | <span style="color: orange;">firstUsre</span>           |

---

## <span style="color: darkorange;">Logout</span>

**<span style="color: purple;">POST</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/api/auth/logout`</span>

---

## <span style="color: darkorange;">Get Me</span>

**<span style="color: purple;">GET</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/api/auth/me`</span>

---

# <span style="color: #4169E1;">Board API Documentation</span>

## <span style="color: darkorange;">Create Board</span>

**<span style="color: purple;">POST</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/board/`</span>

### Request Body (urlencoded)

| Field                                          | Value                                                     |
| ---------------------------------------------- | --------------------------------------------------------- |
| <span style="color: green;">title</span>       | <span style="color: orange;">Project</span>               |
| <span style="color: green;">description</span> | <span style="color: orange;">for checking the card</span> |

---

## <span style="color: darkorange;">Duplicate Board</span>

**<span style="color: purple;">POST</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/board/duplicate/66e554542988bc8ff325f91a`</span>

---

## <span style="color: darkorange;">Get Boards</span>

**<span style="color: purple;">GET</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/board/`</span>

---

## <span style="color: darkorange;">Get Board by ID</span>

**<span style="color: purple;">GET</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/board/66f8335e424c7ec778690bcb`</span>

---

## <span style="color: darkorange;">Update Board</span>

**<span style="color: purple;">PATCH</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/board/66f94d30cc3120bb6d727ba8`</span>

### Request Body (urlencoded)

| Field                                          | Value                                                       |
| ---------------------------------------------- | ----------------------------------------------------------- |
| <span style="color: green;">title</span>       | <span style="color: orange;">update Activity Board 1</span> |
| <span style="color: green;">description</span> | <span style="color: orange;">this is updated des</span>     |

---

## <span style="color: darkorange;">Archive Board</span>

**<span style="color: purple;">PATCH</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/board/archive/66e55124c1701e0421648e50`</span>

---

## <span style="color: darkorange;">Delete Board</span>

**<span style="color: purple;">DELETE</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/board/66f94d30cc3120bb6d727ba8`</span>

---

# <span style="color: #4169E1;">List API Documentation</span>

## <span style="color: darkorange;">Create List</span>

**<span style="color: purple;">POST</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/list/66f8335e424c7ec778690bcb`</span>

### Request Body (urlencoded)

| Field                                    | Value                                                   |
| ---------------------------------------- | ------------------------------------------------------- |
| <span style="color: green;">title</span> | <span style="color: orange;">1st list in board 5</span> |

---

## <span style="color: darkorange;">Get Lists</span>

**<span style="color: purple;">GET</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba`</span>

---

## <span style="color: darkorange;">Get List</span>

**<span style="color: purple;">GET</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f83391424c7ec778690bd3`</span>

---

## <span style="color: darkorange;">Update List</span>

**<span style="color: purple;">PATCH</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f7bc80350a55a557239150`</span>

### Request Body (urlencoded)

| Field                                    | Value                                                        |
| ---------------------------------------- | ------------------------------------------------------------ |
| <span style="color: green;">title</span> | <span style="color: orange;">this is update 4th again</span> |

---

## <span style="color: darkorange;">Duplicate List</span>

**<span style="color: purple;">POST</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f7bc80350a55a557239150/duplicate`</span>

---

## <span style="color: darkorange;">Comment on List</span>

**<span style="color: purple;">POST</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f7bc80350a55a557239150/comment`</span>

### Request Body (urlencoded)

| Field                                      | Value                                                 |
| ------------------------------------------ | ----------------------------------------------------- |
| <span style="color: green;">comment</span> | <span style="color: orange;">this is comment 3</span> |

---

## <span style="color: darkorange;">Archive/Unarchive List</span>

**<span style="color: purple;">PATCH</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f7c737cccb3190c2bfc6a0/archive`</span>

---

## <span style="color: darkorange;">Delete List</span>

**<span style="color: purple;">DELETE</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f7afa186ddc0e5cd14621d`</span>

---

# <span style="color: #4169E1;">Card API Documentation</span>

## <span style="color: darkorange;">Create Card</span>

**<span style="color: purple;">POST</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/card/66f83391424c7ec778690bd3`</span>

### Request Body (urlencoded)

| Field                                              | Value                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------- |
| <span style="color: green;">title</span>           | <span style="color: orange;">active card</span>                     |
| <span style="color: green;">description</span>     | <span style="color: orange;">lets check it is created or not</span> |
| <span style="color: green;">dueDate</span>         | <span style="color: orange;">20/11/2024</span>                      |
| <span style="color: green;">labels</span>          | <span style="color: orange;">soket</span>                           |
| <span style="color: green;">assignedMembers</span> | <span style="color: orange;">-</span>                               |

---

## <span style="color: darkorange;">Update Card</span>

**<span style="color: purple;">PATCH</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/card/66f83391424c7ec778690bd3/66f933f3ca1c6ff23c63526b`</span>

### Request Body (urlencoded)

| Field                                              | Value                                                                      |
| -------------------------------------------------- | -------------------------------------------------------------------------- |
| <span style="color: green;">title</span>           | <span style="color: orange;">soket card update</span>                      |
| <span style="color: green;">description</span>     | <span style="color: orange;">lets check it is created or not update</span> |
| <span style="color: green;">dueDate</span>         | <span style="color: orange;">25/11/2024</span>                             |
| <span style="color: green;">labels</span>          | <span style="color: orange;">update</span>                                 |
| <span style="color: green;">assignedMembers</span> | <span style="color: orange;">-</span>                                      |

---

## <span style="color: darkorange;">Delete Card</span>

**<span style="color: purple;">DELETE</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/card/66f83391424c7ec778690bd3/66f933f3ca1c6ff23c63526b`</span>

---

## <span style="color: darkorange;">Get Cards</span>

**<span style="color: purple;">GET</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/card/66f83391424c7ec778690bd3`</span>

---

## <span style="color: darkorange;">Get Card by ID</span>

**<span style="color: purple;">GET</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/card/66f83391424c7ec778690bd3/66f8350f459a401ba1afbb7c`</span>

---

# <span style="color: #4169E1;">Comment API Documentation</span>

## <span style="color: darkorange;">Add Comment</span>

**<span style="color: purple;">POST</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/comment/66f8350f459a401ba1afbb7c`</span>

### Request Body (urlencoded)

| Field                                      | Value                                                   |
| ------------------------------------------ | ------------------------------------------------------- |
| <span style="color: green;">content</span> | <span style="color: orange;">This is the comment</span> |

---

## <span style="color: darkorange;">Get Comments</span>

**<span style="color: purple;">GET</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/comment/66f8350f459a401ba1afbb7c`</span>

---

## <span style="color: darkorange;">Get Comment by ID</span>

**<span style="color: purple;">GET</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/comment/66f8350f459a401ba1afbb7c/66f93a3562e5582674a48775`</span>

---

## <span style="color: darkorange;">Delete Comment</span>

**<span style="color: purple;">DELETE</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/comment/66f93a3562e5582674a48775`</span>

---

# <span style="color: #4169E1;">Activity Log API Documentation</span>

## <span style="color: darkorange;">Get All Activity</span>

**<span style="color: purple;">GET</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/activityLog`</span>

---

# <span style="color: #4169E1;">Search Cards API Documentation</span>

## <span style="color: darkorange;">Search Cards</span>

**<span style="color: purple;">GET</span>**
**Endpoint:** <span style="color: blue;">`http://127.0.0.1:5000/search/cards?query=Project`</span>

### Query Parameters

| Parameter                                | Value                                       |
| ---------------------------------------- | ------------------------------------------- |
| <span style="color: green;">query</span> | <span style="color: orange;">Project</span> |

---
