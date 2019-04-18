# OISP SOCIAL PLATFORM
**Lecturer:** Quan Thanh Tho

**Group members:**
- Long Kim - 1652758
- Thinh Tran - 1652578
- Nhu Vo - 1652458
- An Nguyen - 1552005
- Duy Ly - 1652099

## Summary
Occasionally, we might hear people say: “Better learn from your friend than your teacher”. As a student, that saying is actually very true. We can learn so much from our friends. A right friend can be our helping hand for not only spiritual support but also academic learning.

Base on that, our group decided to do something about it. In the beginning, we wanted to make an online platform (website application) for finding study buddy. However, after a couple of meetings, we settled on the plan of **creating a platform** for students to **discuss and solve problems**.

## Technologies
- **React:** Front-end
- **Node:** Server-side, API
- **MongoDB & MySQL:** Database

## Additional Tools
- **Postman**: Test your APIs.
- **Git Client**: Sourcetree or Sublime Merge is good, or use the one included in VSCode or Atom.

## Set-up Project

0. Get MySQL (included with XAMPP) then create a database using utf8_unicode_ci
1. Clone source code from branch `develop` (or fork your own branch)
2. Run `npm install`
3. Create `.env` file from `.env-example` and modify `config.json` in `src/backend/database/config`
4. Set up database: cd to `/src/backend/database` then run these commands:
```
npx runmigration
npx sequelize db:seed:all
```
5. Run `npm run dev` (for front-end + server) or `npm run server` (for server only)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the React app and Node server.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run server`

Runs the server application.
