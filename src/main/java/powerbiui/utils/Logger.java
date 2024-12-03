package powerbiui.utils;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import powerbiui.utils.Constants;

public class Logger {

    private static String LOG_FILE_PATH;
    
    public Logger(String outputFilePath) {
    	this.LOG_FILE_PATH = outputFilePath + Constants.LOG_FILE_PATH;
    }

    /**
     * Logs an error message to log.txt and stops the program.
     * 
     * @param message the error message to log
     */
    public static void logAndExit(String message) {
    	logError(message);
        System.exit(1);
    }

    /**
     * Logs an error message to log.txt.
     * 
     * @param message the error message to log
     */
    private static void logError(String message) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(LOG_FILE_PATH, true))) {
            writer.println(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
