# 👨‍💻 Code Crate

## 📜 Overview

Code Crate is a user friendly Snippet Manager application designed for developers to efficiently manage, organize, and reuse their code snippets. With its user-friendly interface, Code Crate allows users to easily add, categorize, and search for snippets, enhancing productivity and code management.

## 🛠️ Tech Stack

- **HTML5** : Provides the structure for web pages.
- **CSS3** : Used for styling and layout of the application.
- **JavaScript** : Enables dynamic content and interactive features.
- **EJS** : Template engine for rendering server-side HTML.
- **Node.js** : JavaScript runtime for server-side development.
- **Express** : Web framework for building the server and handling routes.
- **MongoDB** : NoSQL database for storing snippets and user data.

## 📚 Project Structure

```
Code Crate
│
├── /client
│ ├── /public
│ │ ├── /stylesheets
│ │ │ └── (CSS files for styling)
│ │ ├── /scripts
│ │ │ └── (JavaScript files for client-side functionality)
│ │ └── /img
│ │ └── (Images used in the application)
│ └── /views
│ ├── /layouts
│ │ └── (EJS template layouts for page structure)
│ └── /partials
│ └── (Reusable EJS partial components)
│
├── /server
│ ├── /database
│ │ └── (Database connection and setup files)
│ ├── /routes
│ │ └── (Defines application routes)
│ ├── /controllers
│ │ └── (Business logic for handling requests)
│ ├── /models
│ │ └── (Database models for MongoDB schemas)
│ └── /middlewares
│ └── (Custom middleware functions)
│
├── server.js
│ └── (Main entry point for the server application)
├── .gitignore
|-- .env
├── README.md
├── package.json
└── package-lock.json
```

## ⚙️ Project Setup

1. Open Github and navigate to official repository at ```https://github.com/NisargKaneriya/CodeCrate```
2. Then create a ```fork``` of the official repository into your account.
3. Now as you will be directed to your ```forked version``` of the repository.
4. From there ```copy``` your repository's ```https link``` from the ```Code``` section.
5. Now navigate to the location within your system where you would like to clone the project.
6. After navigating to the desired location ```open gitbash terminal``` and paste the below command there,
```
git clone <https link copied>
```
7. Then add the remote upstream to your cloned repository by,
```
git remote add upstream https://github.com/NisargKaneriya/CodeCrate
```
8. Now fetch the latest changes from Official repository of upstream inlcuding all the branches and everything just by executing,
```
git fetch upstream
```
9. Now if you want then you can create your owm new local branch in your forked repository by,
```
git checkout main
git checkout -b <new-branch-name>
```
10. To verify all your branches that you have including your remote/origin and remote/upstream branches you can execute,
```
git branch -a
```
10. So now you will be on the branch you created, After writting your piece of program, push all the changes from your side into your local repository by,
```
git add .
git commit -m "<commit message>"
git push origin <your-branch>
```
11. Now once you are all set-up to push all your changes from ```Your-Repository/<your-branch>``` branch to the ```Your-Repository/main``` branch, you can follow the below given stpes:
    - Go to ```www.github.com``` and navigate to your repository then navigate to ```<your-branch>``` branch.
    - Now click on ```Compare Branch``` and then,
    - Select the comparision criterias as below
        - ```Your-Repository```-```main``` <- ```Your-Repository```-```<your-branch>```
        - Add appropriate description for the Pull request.
    - Then navigate to ```Your-Repository/main``` and open ```Pull Requests``` tab and accept your pull request to push your changes into ```Your-Repository/main``` branch.
12. In order to push the contribution from ```Your-Repository/main``` branch to the ```NisargKaneriya/CodeCrate/Development``` branch, you can follow the below given steps:
    - Go to ```www.github.com``` and navigate to your repository then navigate to ```main``` branch.
    - Now click on ```Compare Branch``` and then,
    - Select the comparision criterias as below
        - ```NisargKaneriya```-```Development``` <- ```Your-Repository```-```main```
        - Add appropriate description for the Pull request.
        - And all set and done... your pull request will be merged by the Owner after verification.
13. Everytime you start working on the code, don't forget to first update ```Your-Repository/main``` and ```Your-Repository/<your-branch>``` branch by the latest changes from the official upstream repositories. 

```NOTE:``` Please avoid creating pull request for contributing your changes directly to ```NisargKaneriya/CodeCrate/main``` branch, in this case your pull request would not be accepted in any scenarios. 
you must be submitting your pull requests to ```NisargKaneriya/CodeCrate/Development``` branch only.

## ⚡ Starting the application

1. Open up the terminal in code editor.
2. Navigate to the root directory of project ```CodeCrate``` using the command,
```
cd CodeCrate
```
3. Then first you have to install all the required dependencies for the project, can be done by following command,
```
npm install
```
4. Then execute the below command to start the whole server/client application,
```
npm run dev 
```
5. Then open browser and type the link shown in the editor terminal, in case of local-machine it is ```http://localhost:<PORT>```