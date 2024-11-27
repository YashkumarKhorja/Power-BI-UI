package powerbiui;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.*;
import powerbiui.utils.*;
import com.google.gson.Gson;

public class SQLiteQueryExecutor {
    // Database URL will be provided as a runtime argument
    private static String DB_URL = "jdbc:sqlite:src/main/resources/power_bi_clone.db";
    private static String QUERIES_PROPERTIES = Constants.QUERIES_PROPERTIES_FILE;
    private static String JSON_OUTPUT_PATH = "src/main/resources/query.json";
    
//    public static void main(String[] args) {
////        // Check if the DB URL is provided
////        if (args.length < 1) {
////            System.err.println("Error: Please provide the database file path as an argument.");
////            System.exit(1);
////        }
////
////        // Assign DB URL from arguments
////        DB_URL = Constants.DB_URL_PREFIX + args[0];
//    	
////    	if (args.length > 0) {
////            DB_URL = "jdbc:sqlite:" + args[0];
////        } else {
////            System.out.println("No database path provided. Using default local database for testing.");
////        }
//
//        try {
//            // Load queries from properties file
//            Properties properties = loadQueries();
//
//            // Connect to SQLite database
//            try (Connection connection = DriverManager.getConnection(DB_URL)) {
//                System.out.println("Connected to SQLite database successfully.");
//
//                // Execute each query and print results
//                for (String key : properties.stringPropertyNames()) {
//                    String query = properties.getProperty(key);
//                    System.out.println("\nExecuting query: " + key);
//                    List<Map<String, Object>> results = executeQuery(connection, query);
//
//                    // Display the results
//                    printResults(results);
//                }
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    public static void main(String[] args) {
        try {
            // Load queries from properties file
            Properties properties = loadQueries();

            // Connect to SQLite database
            try (Connection connection = DriverManager.getConnection(DB_URL)) {
                System.out.println("Connected to SQLite database successfully.");

                // Prepare result storage for JSON
                Map<String, List<Map<String, Object>>> queryResults = new LinkedHashMap<>();

                // Execute each query
                for (String key : properties.stringPropertyNames()) {
                    String query = properties.getProperty(key);
                    System.out.println("\nExecuting query: " + key);

                    // Fetch results for the query
                    List<Map<String, Object>> results = executeQuery(connection, query);
                    queryResults.put(key, results); // Store query results with query key
                }

                // Save all query results to JSON
                saveResultsAsJson(queryResults);
                System.out.println("Query results saved to JSON at " + JSON_OUTPUT_PATH);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    /**
     * Load queries from the properties file located in the resources folder.
     *
     * @return Properties object containing the queries.
     * @throws IOException If the file cannot be read.
     */
    private static Properties loadQueries() throws IOException {
        Properties properties = new Properties();
        try (InputStream inputStream = SQLiteQueryExecutor.class.getClassLoader().getResourceAsStream(QUERIES_PROPERTIES)) {
            if (inputStream == null) {
                throw new IOException("queries.properties file not found in resources folder.");
            }
            properties.load(inputStream);
        }
        return properties;
    }

    private static List<Map<String, Object>> executeQuery(Connection connection, String query) throws SQLException {
        List<Map<String, Object>> resultList = new ArrayList<>();
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(query)) {

            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (resultSet.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    row.put(metaData.getColumnLabel(i), resultSet.getObject(i));
                }
                resultList.add(row);
            }
        }
        return resultList;
    }

//    private static void printResults(List<Map<String, Object>> results) {
//        if (results.isEmpty()) {
//            System.out.println("No results found.");
//            return;
//        }
//
//        for (Map<String, Object> row : results) {
//            System.out.println(row);
//        }
//    }
    
    private static void saveResultsAsJson(Map<String, List<Map<String, Object>>> results) {
        File file = new File(JSON_OUTPUT_PATH);
        try (FileWriter writer = new FileWriter(file)) {
            Gson gson = new Gson();
            gson.toJson(results, writer);
        } catch (IOException e) {
            System.err.println("Error saving JSON file: " + e.getMessage());
        }
    }

}
