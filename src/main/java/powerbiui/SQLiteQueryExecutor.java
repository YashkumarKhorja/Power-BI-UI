package powerbiui;

import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.*;
import powerbiui.utils.*;
import com.google.gson.Gson;

public class SQLiteQueryExecutor {
    // Database URL will be provided as a runtime argument
    private static String DB_URL;
    private static String QUERIES_PROPERTIES = Constants.QUERIES_PROPERTIES_FILE;

    public static void main(String[] args) {
        // Check if the DB URL is provided
        if (args.length < 2) {
            Logger.logAndExit("Error: Please provide the database file path as an argument.");
            System.exit(1);
        }

        // Assign DB URL from arguments
        DB_URL = Constants.DB_URL_PREFIX + args[0];
        String jsonFilePath = args[1] + Constants.QUERY_RESULTS_JSON;

        try {
            // Load queries from properties file
            Properties properties = loadQueries();

            // Connect to SQLite database
            try (Connection connection = DriverManager.getConnection(DB_URL)) {
                System.out.println("Connected to SQLite database successfully.");
                
                Map<String, List<Map<String, Object>>> queryResults = new LinkedHashMap<>();

                // Execute each query and print results
                for (String key : properties.stringPropertyNames()) {
                    String query = properties.getProperty(key);
                    System.out.println("\nExecuting query: " + key);
                    List<Map<String, Object>> results = executeQuery(connection, query);

                    queryResults.put(key, results);
                }
                saveResultsToJson(jsonFilePath, queryResults);
            }

        } catch (Exception e) {
        	Logger.logAndExit("Couldn't able to connect to db: " + e.getMessage());
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
    
    private static void saveResultsToJson(String filePath, Map<String, List<Map<String, Object>>> results) {
        try (FileWriter writer = new FileWriter(filePath)) {
            new Gson().toJson(results, writer);
            System.out.println("Results saved to " + filePath);
        } catch (IOException e) {
            Logger.logAndExit("Failed to save JSON" + ": " + e.getMessage());
        }
    }
}