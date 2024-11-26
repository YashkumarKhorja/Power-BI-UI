package powerbiui;
import powerbiui.SQLiteQueryExecutor;

public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        try {
            SQLiteQueryExecutor.main(args);
        } catch (Exception e) {
        	e.printStackTrace();
        	System.out.println("Error while executing SQLiteQueryExecutor: " + e.getMessage());
        }
        
        System.out.println("Execution completed.");

    }
}
