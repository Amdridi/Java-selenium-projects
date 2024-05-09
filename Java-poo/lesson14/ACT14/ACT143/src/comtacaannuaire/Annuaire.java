package comtacaannuaire;

import java.util.Scanner;

public class Annuaire {
	public static Scanner sc=new Scanner(System.in);

	public static void main(String[] args) {
		
		String userLastname = getUserInput("Entrez le nom de votre famille: ");
		String userFirstname = getUserInput("Entrez votre prénom: ");
		String userPhonenumber = getUserInput("Entrez votre numéro de téléphone: ");
		
		Contact newContact=new Contact(userLastname, userFirstname, userPhonenumber);
		
		
		System.out.println(newContact.toString());
		
		sc.close();
		
		
		}
   

	
	
	public static String getUserInput (String userRequest) {
			System.out.println(userRequest);
			return sc.nextLine();
			
	}
		
	}


