
package comtalanact1153;

import java.util.Scanner;

public class Palindrome {
	

	public static void main(String[] args) {
		
		System.out.println(" **********  Palindrome  **********");
		String s=Saisie();
		System.out.println("\n Le mot saisi est: " + s );
		
		if (plindrome(s)) {
			
			System.out.println("\n --- Oui! C'est un Palidrome");
		}
		else 
			System.out.println("\n ---  Non! ce n' est pas un Palidrome");
		
	}
	
	public static String Saisie() {
		Scanner sc=new Scanner (System.in);
		System.out.println("Saisir le mot : ");
		String s=sc.nextLine();
		return s;
	}
	
	public static boolean plindrome(String s) {
		
		int i=0; 
		boolean bool=true ;
		
		while (i < (s.length()/2)) {

			if (s.charAt(i)!= s.charAt((s.length()-i-1))) {
				
				bool=false;
				break;
				
			}
			else 
				i=i+1;
					
		}
		return  bool;
					
	}
	
	
	
	

}
