package comtalanact154;

import java.util.Scanner;

public class EPEE {
	
	public static Scanner sc= new Scanner(System.in);

	public static void main(String[] args) {
		
		System.out.println("************ EPEE *************** ");
		System.out.println("\n Saisir la taille du tableau: ");
		int taille= sc.nextInt();
		sc.nextLine();
		String[] tab= new String[taille];
		saisietab(tab );
		System.out.println("\n Le tabelau saisi est : \n");
		affichtab(tab) ;
		
		///// Tri du tableau ////
		for (int i=0; i<tab.length;i++) {
			int pos = trouverpos(tab, i );
			tab= permut(pos,i, tab);	
			 }
		System.out.println("\n Le tabelau trie est : \n");
		
	   ///// Affichage apres tri  ////
		affichtab(tab) ;	
		 	
	 }
	
	//SAISIE TABLEAU //
	
	public static String[] saisietab(String [] tab ) {
		
		
		for (int i=0;i<tab.length;i++) {
			System.out.println("Saisir l'element " + i+" du tableau ");
			String elem = sc.nextLine();
			tab[i] =elem ;
		}
		return tab;
   }
	
	
	///AFFICHAGE TABLEAU ///
	
	public static void affichtab(String [] tab) {
		
			for (int i=0;i<tab.length;i++) {
				System.out.println("\t\t ["+i+"] " + tab[i]);	
			}
	}
	
	
	
	//RETOURNE LA POSITION DE LA CHIANE MIN//
	
	public static int trouverpos(String [] tab,int i ) {
			
		    int pos=i;
		    for (int j=i+1;j < tab.length;j++) {
		    	
		    	if ((tab[j].compareTo(tab[i])) < 0)  {
		    		pos= j;
		    		
		    	}
		    }
		    
			return pos ;
			
		}

	//PERMUTATION DES CHIANES//
	
	public static String[] permut( int pos ,int i, String[] tab ) {
		
		String aux=tab[i];
		tab[i]=tab[pos];
		tab[pos]=aux;
		
		return tab;
	}	


}
