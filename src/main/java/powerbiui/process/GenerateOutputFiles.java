package powerbiui.process;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import powerbiui.utils.Constants;
import powerbiui.utils.Logger;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class GenerateOutputFiles {
    private static String JSON_FILE_PATH;
    private static String JS_OUTPUT_PATH;
    private static String HTML_OUTPUT_PATH;
    private static final String OUTPUT_VISUALIZATION_JS_FILE = Constants.OUTPUT_VISUALIZATION_JS_FILE;
    private static final String OUTPUT_VISUALIZATION_HTML_FILE = Constants.OUTPUT_VISUALIZATION_HTML_FILE;
    private static final String INDEX_JS_TEMPLATE = Constants.INDEX_JS_TEMPLATE;
    private static final String INDEX_HTML_TEMPLATE = Constants.INDEX_HTML_TEMPLATE;

    public GenerateOutputFiles(String outputFilePath, String jsonFilePath) {
    	GenerateOutputFiles.JSON_FILE_PATH = jsonFilePath;
    	GenerateOutputFiles.JS_OUTPUT_PATH = outputFilePath + OUTPUT_VISUALIZATION_JS_FILE;
    	GenerateOutputFiles.HTML_OUTPUT_PATH = outputFilePath + OUTPUT_VISUALIZATION_HTML_FILE;
    }

    public static void main(String[] args) {
        try {
            Gson gson = new Gson();

            FileReader reader = new FileReader(JSON_FILE_PATH);
            JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);
            reader.close();

            // Create the visualization file with the JSON data
            createVisualizationFile(jsonObject);

            // Copy the index.html to visualization.html
            copyTemplateFile(INDEX_HTML_TEMPLATE, HTML_OUTPUT_PATH);
        } catch (IOException e) {
            Logger.logAndExit("An error occurred during the JS data update process: " + e.getMessage());
        }
    }

    // Method to create the visualization.js file with updated JSON data
    private static void createVisualizationFile(JsonObject jsonObject) {
        try (InputStream jsTemplateStream = GenerateOutputFiles.class.getClassLoader().getResourceAsStream(INDEX_JS_TEMPLATE)) {
            if (jsTemplateStream == null) {
                throw new FileNotFoundException("index.js not found in resources");
            }

            String templateContent = readFromInputStream(jsTemplateStream);

            // Replace the placeholder in the JS file with the new JSON data
            String newData = "const data = " + jsonObject.toString() + ";\n";
            String updatedContent = newData + templateContent;

            // Write the updated content to the output JS file
            try (FileWriter fileWriter = new FileWriter(JS_OUTPUT_PATH, false)) {
                fileWriter.write(updatedContent);
            }

        } catch (IOException e) {
            Logger.logAndExit("Failed to create visualization.js: " + e.getMessage());
        }
    }

    // Method to copy index.html to visualization.html
    private static void copyTemplateFile(String inputFilePath, String outputFilePath) {
        try (InputStream templateStream = GenerateOutputFiles.class.getClassLoader().getResourceAsStream(inputFilePath)) {
            if (templateStream == null) {
                throw new FileNotFoundException("index.html not found in resources");
            }

            String templateContent = readFromInputStream(templateStream);

            // Write the content to visualization.html
            try (FileWriter htmlFileWriter = new FileWriter(outputFilePath, false)) {
                htmlFileWriter.write(templateContent);
            }

        } catch (IOException e) {
        	Logger.logAndExit("Failed to copy index.html to visualization.html: " + e.getMessage());
        }
    }

    // Utility method to read an InputStream into a String
    private static String readFromInputStream(InputStream inputStream) throws IOException {
        StringBuilder content = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
        }
        return content.toString();
    }
}