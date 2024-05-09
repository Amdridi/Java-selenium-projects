package comtalanact152;

import java.util.Scanner;

public class Tableaux {
	
	public static Scanner sc= new Scanner(System.in);
	public static void main(String[] args) {
		
		int [] tab = new int[5];
		
		System.out.println("*********** Tableaux ***********");
		Saisie(tab);
		affichtab(tab);
		System.out.println("\n --Le minimum du tabelau est :"+trouverMin(tab));
		System.out.println("\n --Le maximum du tableau est :"+trouverMax(tab));
		System.out.println("\n -- Entrer le nombre a chercher :" );
		int item=sc.nextInt();
		if (chercheitem(tab,item)) {
			System.out.println("\n --Oui! l'element "+item+" existe" );
		}
		else 
			System.out.println("\n --Non! l'element " +item+" n'existe pas " );
	
	}
	
	///SAISIE TABLEAU////
	public static int[] Saisie(int[] tab) {
		
		for (int i = 0; i < tab.length; i++) {
		 
			    System.out.println("Saisir l'element " + i +" du tableau : ");
				int elem = sc.nextInt();
				tab[i] =elem ;
			 
		}
		
	   return tab; 
	 
	}
	 
	///TROUVER LE MIN ////
	 public static int trouverMin(int[] tab ) {
		
		 int min=tab[0];
		 
		 for (int i = 1; i < tab.length; i++) {
			 
				if (tab[i]< min) {
					min=tab[i];
				}
				
			}
		 
	    return min;
		 
	 }
	
	///TROUVER LE MAX ////
	 public static int trouverMax(int[] tab) {
		 
	 int max=tab[0];
	 
	 for (int i = 1; i < tab.length; i++) {
		 
			if (tab[i]> max) {
				max=tab[i];
			}
			
		}
	 
	    return max;
		
	}
	 
	 
	 
	////AFFICHAGE TAB////
	 public static void affichtab(int [] tab) {
	
	     for (int i = 0; i < tab.length; i++) {
	    	 System.out.println(tab[i]);

    }
    }
	 
	 /////CHERCHER UN ELEMENT///
	 public static boolean  chercheitem(int [] tab,int item) {
		 
		 int i=0;
		 boolean t=false;
		 while ((i<tab.length) ){
			 
			 if (item==tab[i]) {
				 t=true;
			 } 
				 i=i+1;
		 }
		 
		 return t;	 
	 
	 }
	
}
