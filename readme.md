## Project Management Tool - README

# $\color{red}{\text{Backend Part}}$

# $\color{#4169E1}{\text{Project Management Tool - Package.json Guide}}$

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

# $\color{#4169E1}{\text{Project Configuration Settings Guide}}$

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

# $\color{#4169E1}{\text{ Authentication API Documentation }}$

## $\color{darkorange}{\text{Register}}$

**$\color{purple}{\text{POST}}$**
**Endpoint:**
$\color{blue}{\text{`http://127.0.0.1:5000/api/auth/register`}}$

### Request Body (urlencoded)

| Field                            | Value                                       |
| -------------------------------- | ------------------------------------------- |
| $\color{green}{\text{username}}$ | $\color{orange}{\text{day7User}}$           |
| $\color{green}{\text{email}}$    | $\color{orange}{\text{day7User@gmail.com}}$ |
| $\color{green}{\text{password}}$ | $\color{orange}{\text{day7User}}$           |

---

## $\color{darkorange}{\text{Login}}$

**$\color{purple}{\text{POST}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/api/auth/login`}}$

### Request Body (urlencoded)

| Field                            | Value                                        |
| -------------------------------- | -------------------------------------------- |
| $\color{green}{\text{username}}$ | $\color{orange}{\text{firstUsre}}$           |
| $\color{green}{\text{email}}$    | $\color{orange}{\text{firstUsre@gmail.com}}$ |
| $\color{green}{\text{password}}$ | $\color{orange}{\text{firstUsre}}$           |

---

## $\color{darkorange}{\text{Logout}}$

**$\color{purple}{\text{POST}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/api/auth/logout`}}$

---

## $\color{darkorange}{\text{Get Me}}$

**$\color{purple}{\text{GET}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/api/auth/me`}}$

---

# $\color{#4169E1}{\text{Board API Documentation}}$

## $\color{darkorange}{\text{Create Board}}$

**$\color{purple}{\text{POST}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/board/`}}$

### Request Body (urlencoded)

| Field                               | Value                                          |
| ----------------------------------- | ---------------------------------------------- |
| $\color{green}{\text{title}}$       | $\color{orange}{\text{Project}}$               |
| $\color{green}{\text{description}}$ | $\color{orange}{\text{for checking the card}}$ |

---

## $\color{darkorange}{\text{Duplicate Board}}$

**$\color{purple}{\text{POST}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/board/duplicate/66e554542988bc8ff325f91a`}}$

---

## $\color{darkorange}{\text{Get Boards}}$

**$\color{purple}{\text{GET}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/board/`}}$

---

## $\color{darkorange}{\text{Get Board by ID}}$

**$\color{purple}{\text{GET}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/board/66f8335e424c7ec778690bcb`}}$

---

## $\color{darkorange}{\text{Update Board}}$

**$\color{purple}{\text{PATCH}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/board/66f94d30cc3120bb6d727ba8`}}$

### Request Body (urlencoded)

| Field                               | Value                                            |
| ----------------------------------- | ------------------------------------------------ |
| $\color{green}{\text{title}}$       | $\color{orange}{\text{update Activity Board 1}}$ |
| $\color{green}{\text{description}}$ | $\color{orange}{\text{this is updated des}}$     |

---

## $\color{darkorange}{\text{Archive Board}}$

**$\color{purple}{\text{PATCH}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/board/archive/66e55124c1701e0421648e50`}}$

---

## $\color{darkorange}{\text{Delete Board}}$

**$\color{purple}{\text{DELETE}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/board/66f94d30cc3120bb6d727ba8`}}$

---

# $\color{#4169E1}{\text{List API Documentation}}$

## $\color{darkorange}{\text{Create List}}$

**$\color{purple}{\text{POST}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/list/66f8335e424c7ec778690bcb`}}$

### Request Body (urlencoded)

| Field                         | Value                                        |
| ----------------------------- | -------------------------------------------- |
| $\color{green}{\text{title}}$ | $\color{orange}{\text{1st list in board 5}}$ |

---

## $\color{darkorange}{\text{Get Lists}}$

**$\color{purple}{\text{GET}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba`}}$

---

## $\color{darkorange}{\text{Get List}}$

**$\color{purple}{\text{GET}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f83391424c7ec778690bd3`}}$

---

## $\color{darkorange}{\text{Update List}}$

**$\color{purple}{\text{PATCH}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f7bc80350a55a557239150`}}$

### Request Body (urlencoded)

| Field                         | Value                                             |
| ----------------------------- | ------------------------------------------------- |
| $\color{green}{\text{title}}$ | $\color{orange}{\text{this is update 4th again}}$ |

---

## $\color{darkorange}{\text{Duplicate List}}$

**$\color{purple}{\text{POST}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f7bc80350a55a557239150/duplicate`}}$

---

## $\color{darkorange}{\text{Comment on List}}$

**$\color{purple}{\text{POST}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f7bc80350a55a557239150/comment`}}$

### Request Body (urlencoded)

| Field                           | Value                                      |
| ------------------------------- | ------------------------------------------ |
| $\color{green}{\text{comment}}$ | $\color{orange}{\text{this is comment 3}}$ |

---

## $\color{darkorange}{\text{Archive/Unarchive List}}$

**$\color{purple}{\text{PATCH}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f7c737cccb3190c2bfc6a0/archive`}}$

---

## $\color{darkorange}{\text{Delete List}}$

**$\color{purple}{\text{DELETE}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/list/66f7aeda99b231d0cba179ba/66f7afa186ddc0e5cd14621d`}}$

---

# $\color{#4169E1}{\text{Card API Documentation}}$

## $\color{darkorange}{\text{Create Card}}$

**$\color{purple}{\text{POST}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/card/66f83391424c7ec778690bd3`}}$

### Request Body (urlencoded)

| Field                                   | Value                                                    |
| --------------------------------------- | -------------------------------------------------------- |
| $\color{green}{\text{title}}$           | $\color{orange}{\text{active card}}$                     |
| $\color{green}{\text{description}}$     | $\color{orange}{\text{lets check it is created or not}}$ |
| $\color{green}{\text{dueDate}}$         | $\color{orange}{\text{20/11/2024}}$                      |
| $\color{green}{\text{labels}}$          | $\color{orange}{\text{soket}}$                           |
| $\color{green}{\text{assignedMembers}}$ | $\color{orange}{\text{-}}$                               |

---

## $\color{darkorange}{\text{Update Card}}$

**$\color{purple}{\text{PATCH}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/card/66f83391424c7ec778690bd3/66f933f3ca1c6ff23c63526b`}}$

### Request Body (urlencoded)

| Field                                   | Value                                                           |
| --------------------------------------- | --------------------------------------------------------------- |
| $\color{green}{\text{title}}$           | $\color{orange}{\text{soket card update}}$                      |
| $\color{green}{\text{description}}$     | $\color{orange}{\text{lets check it is created or not update}}$ |
| $\color{green}{\text{dueDate}}$         | $\color{orange}{\text{25/11/2024}}$                             |
| $\color{green}{\text{labels}}$          | $\color{orange}{\text{update}}$                                 |
| $\color{green}{\text{assignedMembers}}$ | $\color{orange}{\text{-}}$                                      |

---

## $\color{darkorange}{\text{Delete Card}}$

**$\color{purple}{\text{DELETE}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/card/66f83391424c7ec778690bd3/66f933f3ca1c6ff23c63526b`}}$

---

## $\color{darkorange}{\text{Get Cards}}$

**$\color{purple}{\text{GET}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/card/66f83391424c7ec778690bd3`}}$

---

## $\color{darkorange}{\text{Get Card by ID}}$

**$\color{purple}{\text{GET}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/card/66f83391424c7ec778690bd3/66f8350f459a401ba1afbb7c`}}$

---

# $\color{#4169E1}{\text{Comment API Documentation}}$

## $\color{darkorange}{\text{Add Comment}}$

**$\color{purple}{\text{POST}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/comment/66f8350f459a401ba1afbb7c`}}$

### Request Body (urlencoded)

| Field                           | Value                                        |
| ------------------------------- | -------------------------------------------- |
| $\color{green}{\text{content}}$ | $\color{orange}{\text{This is the comment}}$ |

---

## $\color{darkorange}{\text{Get Comments}}$

**$\color{purple}{\text{GET}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/comment/66f8350f459a401ba1afbb7c`}}$

---

## $\color{darkorange}{\text{Get Comment by ID}}$

**$\color{purple}{\text{GET}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/comment/66f8350f459a401ba1afbb7c/66f93a3562e5582674a48775`}}$

---

## $\color{darkorange}{\text{Delete Comment}}$

**$\color{purple}{\text{DELETE}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/comment/66f93a3562e5582674a48775`}}$

---

# $\color{#4169E1}{\text{Activity Log API Documentation}}$

## $\color{darkorange}{\text{Get All Activity}}$

**$\color{purple}{\text{GET}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/activityLog`}}$

---

# $\color{#4169E1}{\text{Search Cards API Documentation}}$

## $\color{darkorange}{\text{Search Cards}}$

**$\color{purple}{\text{GET}}$**
**Endpoint:**$\color{blue}{\text{`http://127.0.0.1:5000/search/cards?query=Project`}}$

### Query Parameters

| Parameter                     | Value                            |
| ----------------------------- | -------------------------------- |
| $\color{green}{\text{query}}$ | $\color{orange}{\text{Project}}$ |

---
