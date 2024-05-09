package talanact193;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Main {

	public static void main(String[] args) throws IOException  {
		
	
		try {
			BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\adridi\\Desktop\\data.txt"));
			String line;
			while ((line = br.readLine()) != null)
				for(int i=0;i<line.length();i++) {
				String S="";
				line.
				S=line.charAt(i);
				System.out.print();
				}
			    System.out.println(line);
		     	line=br.readLine();
		     	
		    }
		
		    
		    
		
		   

		catch (IOException e){
			System.out.print("IOexception "+e.getMessage());
	
		}
		
		
		
	
}}
