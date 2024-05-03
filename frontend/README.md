# Client Connect Hub - Frontend

[Back](../README.md)

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
    -   [Install Node.js](#1-install-nodejs)
    -   [Clone the Project](#2-clone-the-project)
-   [Usage](#usage)
    -   [Install dependencies](#1-install-dependencies)
    -   [Start the project](#2-start-the-project)
-   [Contributing](#contributing)
    -   [Create a new Task](#1-create-a-new-task)
    -   [Local setup](#2-local-setup)

## Prerequisites

Before getting started, ensure you have the following installed on your system:

-   [Visual Studio Code](https://code.visualstudio.com/)
-   [Git](https://git-scm.com/)

## Installation

### 1. Install Node.js

We are using NodeJS `v20.11.1 LTS`.<br>
Follow these steps to install Node.js:<br>

-   Download Node.js from [here](https://nodejs.org/en).
-   Install Node.js and npm by following the installation instructions provided for your operating system.

To verify that Node.js is installed correctly, open a terminal (or PowerShell) and run the following command:

```
node -v
```

If Node.js is installed successfully, it will print the installed version, for example:

```
v20.11.1
```

### 2. Clone the Project

To clone the project to your system, follow these steps:

-   Open a terminal (or PowerShell).
-   Navigate to the directory where you want to clone the project. For example:

```
cd C:/Users/marcb/Projects/418-Development
```

Replace _C:/Users/marcb/Projects/418-Development_ with the actual path to your desired directory.

-   Clone the project using Git by running the following command:

```
git clone https://github.com/418-Development/frontend.git
```

Once the cloning process is complete, navigate into the project directory:

```
cd frontend
```

## Usage

### 1. Install dependencies

To run the project locally, follow these steps:

-   Open a terminal (or command prompt).
-   Navigate to the project directory:

```
cd C:/Users/marcb/Projects/418-Development/frontend
```

-   Install all project dependencies using npm:

```
npm i
```

### 2. Start the Project

To start the development server run:

```
npm run dev
```

This will start the project in development mode and automatically reload the page whenever changes are detected in the files.

## Contributing

### 1. Create a new Task

To contribute to the project you first have to create a new task or find a open task in the Sprit Planing [here](https://github.com/orgs/418-Development/projects/1).

### 2. Local setup

You should work on the branch that is assigned to the user stoy you are working on.

-   Change your local branch with:

```
git fetch
git checkout <userStory-name>
```

Replace `<userStory-name>` with an appropriate name for your branch.

-   When you have finished the task or want to push your current state, stage your changes with:

```
git add .
```

-   Commit your changes with a descriptive commit message:

```
git commit -m"Your descriptive commit message here"
```

-   Push your changes:

```
git push
```

-   If the user story is done, create a pull request on GitHub's repository page.
-   Include `Closes #<issue-id>` to automatically close the issue, moves the user story to 'done' and finishes it.
