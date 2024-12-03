package powerbiui;

import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.*;
import powerbiui.utils.*;
import com.google.gson.Gson;

public class SQLiteQueryExecutor {
    private static String DB_URL;
    private static String QUERIES_PROPERTIES;

    public static void main(String[] args) {
        DB_URL = Constants.DB_URL_PREFIX + args[0];
        QUERIES_PROPERTIES = args[1];
        String jsonFilePath = args[2] + Constants.QUERY_RESULTS_JSON;

        try {
            // Load queries from properties file
            Properties properties = loadQueries(QUERIES_PROPERTIES);

            // Connect to SQLite database
            try (Connection connection = DriverManager.getConnection(DB_URL)) {
                Map<String, List<Map<String, Object>>> queryResults = new LinkedHashMap<>();

                for (String key : properties.stringPropertyNames()) {
                    String query = properties.getProperty(key);
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
    private static Properties loadQueries(String QUERIES_PROPERTIES) throws IOException {
        Properties properties = new Properties();
        try (InputStream inputStream = new FileInputStream(QUERIES_PROPERTIES)) {
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
        } catch (IOException e) {
            Logger.logAndExit("Failed to save JSON" + ": " + e.getMessage());
        }
    }
}