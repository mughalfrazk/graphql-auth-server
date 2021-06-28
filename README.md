This is the Backend of the Apollo Graphql Authentication.

You can find the frontend on this link:
https://github.com/mughalfrazk/graphql-auth-client

About this project:
This is an apollo graphql authenticaiton server, following technologies are used in this project.
- Apollo Express Server
- MongoDB Cloud Atlas
- Mongoose ORM for MongoDB
- Babel Transpiler


To run this project first of all ypou need to add a valid .env file.
.env.sample is added to this repository, you can use it or create a new one.

1. First Env Vairiable in .env is: MONGODB_CONNECTION_STRING

MongoDB Cloud Atlas is used as the database server for this project.
So this variable is for MongoDB Cloud Atlas Connection String, which looks something like this:
mongodb+srv://<username>:<password>@cluster0.zlbb8.mongodb.net/<database_name>?retryWrites=true&w=majority
But with real username, password and database_name parameters.

2. Second Variable is the JWT Secret String:
This could be any unique secret string.

3. Third & Fourth are the Gmail's EMAIL and PASSWORD through which the emails will be sent to the registered users for verification.
For this to work "Less secure app access" should be turned ON from this email address so that this project can use your gmail account to send emails.

Once the .env is set up
In the project directory, you can run:

### `npm install` to install the dependencies

and then

### `npm start`

This runs the app in the development mode.\
Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to view it in the browser.

Now apollo graphql server will be runnning in frontend of you.
You can check the schema from here and check the Graphql APIs or you can use the frontend, all the APIs are integrated into the frontend, the link for the frontend Repo is stated above.

