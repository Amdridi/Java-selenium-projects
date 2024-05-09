package talanacaact192;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
public class Mian {

	public static void main(String[] args) throws IOException {
		
		try {
			BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\adridi\\Desktop\\data.txt"));
			int max = -1;
			String line = br.readLine();
			while (line != null) {
				int n = Integer.parseInt(line);
				// peut générer NumberFormatException
				if (n > max) max = n;
					line = br.readLine();
				// peut générer IOException
			        }
			System.out.println("Maximum = " + max);}

		catch (IOException e){
			System.out.print("IOexception "+e.getMessage());
	
		}
		
		catch (NumberFormatException  e2){
			System.out.print("NumberFormatException "+e2.getMessage());
			}
		
}
}