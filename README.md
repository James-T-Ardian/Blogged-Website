Blogged-Website is a SQL-driven social media website written in Typescript using ReactJS (found in client folder) and Java using Spring Boot (found in server-java folder). The SQL script to create the database that will work with the Java server is in the sql-script.sql file. 

The backend was initially a Node ExpressJS server (found in server folder) utilizing server-side sessions as authentication, but it was later rewritten as a Java Spring Boot server with JWT authentication. The frontend code in the client folder has been updated such that it will now only run with the new Java server.

Versions:
  - Node 14.21.3
  - Java 17
  - Spring Boot 3.1.2

The website is deployed online using Netlify and Heroku. It can be accessed using this link: https://blogged-website.netlify.app/
