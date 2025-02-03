# **Project Name: Earthquake Monitoring System**
An earthquake monitoring system that collects data from sensors, displays it in the UI as charts and graphs, reads data from an input.txt file, and stores the formatted data in a database.
## **Features**
  - Store raw sensor data in the database.
  - Retrieve the maximum, minimum, and total number of earthquakes on a daily and monthly basis
  - Visualize the data using charts and graphs in the UI on a daily and monthly basis
  
## **Solution Approach**
   ## **Backend**
   **First Step**
   The function parses the raw dataset using the **ReadFile** helper function and converts it into a structured array containing valid dates and their corresponding frequency values. It handles edge cases such as invalid dates, like 20231403 100 100, by detecting and skipping them while processing the remaining valid entries. Additionally, it ensures that if a row contains negative frequency values, readings are ignored from that point onward for that specific row and return formmatted array.
  **Second Step**
  The array returned from the first step is then used to store data in the PostgreSQL database via a POST request to **${API_URL}/earthquake/load-data}**. Furthermore, the endpoints **${API_URL}/earthquake/readings-monthly}** and **${API_URL}/earthquake/readings-daily}** are used to retrieve the maximum frequency, minimum frequency, and the total number of earthquakes on a monthly and daily basis.

   **Frontend**
   The frontend fetches earthquake data from the backend and displays it in a simple, user-friendly way. It retrieves statistics using ${API_URL}/earthquake/readings-monthly and ${API_URL}/earthquake/readings-daily. These endpoints provide details like the maximum and minumu earthquake frequencies and the total number of occurrences. The data is then shown in  charts. The data is visualized using **Recharts** in charts for better analysis.
 ## 
 **Note**
    For saving data, use Postman using this api route  **${API_URL}/earthquake/load-data}**
     
   


## **Tech Used**
- ***ReactJS*** - **Frontend**
- ***NodeJs*** - **Framework**
- ***Express*** - **Backend**
- ***REST*** - **Architectural style for APIs**
- ***Postgres*** - **No Sql Database**
- ***Prisma*** - **Orm**
- ***concurrently*** - **Run multiple scripts simultaneously within  monorepo**

## **Library Used**
- ***recharts*** - **Visualize the data**
- ***lucide-react*** - **Icons and image**
- ***react-datepicker*** - **For date**
- ***Jest*** - **for unit testing**

## **Installation**

This application  requires **NodeJs(https://nodejs.org/) v18+** to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/ashishpokhrel123/EarthquakeMontioringSystem.git

cd EarthquakeMontioringSystem
npm install to install the packages for both client and server
npm run dev to run both server and client
Client runs on port 5173
Server runs on port 9797


```

## ***Migration**
  **Add this line into package.json**
```sh
"migration":"npx prisma generate && npx prisma migrate dev"
```

  **Run migration**
 ```sh
npm run migration
```

## **To Run Unit test**
``` sh
npm run test
```

## **Environment Variables**

```sh
# Postgres credentials

DATABASE_URL=postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@@${POSTGRES_HOST}:5432/${POSTGRES_DATABASE}


# Backend running env
NODE_ENV= development

```













