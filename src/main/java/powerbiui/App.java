package powerbiui;
import powerbiui.SQLiteQueryExecutor;
import powerbiui.process.GenerateOutputFiles;
import powerbiui.utils.Constants;
import powerbiui.utils.Logger;

public class App {
	private static final String QUERY_RESULTS_JSON_FILE = Constants.QUERY_RESULTS_JSON;
    public static void main(String[] args){
    	if (args.length < 3) {
            Logger.logAndExit("Error: Please provide the file paths for both the db file and queries properties file.");
        }
    	
        try {
        	String outputFilePath = args[2];
        	String queryResultsFilePath = args[2] + QUERY_RESULTS_JSON_FILE;
        	
            SQLiteQueryExecutor.main(args);
            
            new GenerateOutputFiles(outputFilePath, queryResultsFilePath);
            GenerateOutputFiles.main(args);
        } catch (Exception e) {
        	Logger.logAndExit("Error while executing SQLiteQueryExecutor: " + e.getMessage());
        }
    }
}
