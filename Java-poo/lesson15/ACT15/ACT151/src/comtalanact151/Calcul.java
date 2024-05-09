package comtalanact151;

import java.util.Scanner;

public class Calcul {
     
	public static Scanner sc=new Scanner(System.in) ;
	
	public static void main(String[] args) {
		
		System.out.println("********** Calcul ************");
		 System.out.println("Entrer le nombre a : ");
		 int a= sc.nextInt();
		 System.out.println("Entrer le nombre b :");
		 int b= sc.nextInt();
		 
		 
		 System.out.println("\n --La somme des deux nombres " + a + " et " + b + " est : " + Somme(a,b));
		 System.out.println("\n --Le factoriel du maximum entre " + a + " et " + b + " est: " + Fact(a,b));
		 System.out.println("\n --Le quotion de " + a + " / " + b + " est : " + Quotient (a,b));
		  	

	}
	
	
    ////calcul Somme  ////
	public static int Somme (int a,int b) {
		return a+b;
	}
	
	
	////calcul factoriel ////
	
	public static int Fact (int a, int b) {
		
		int max= a;
		if (b>a) {
			max=b;
		}
		
		int fact =1;
		for(int i=1;i<=max;i++){
		      fact=fact*i;
		  }
		
		return fact;
		
	}
	
	
      ////calcul quotient ////
	
	public static double Quotient(int a , int b) {
		
		while (b==0) {
			 System.out.println("\n --Entree invalide !! entrer un nombre different de 0 ");
			 b= sc.nextInt();	 
		 }
		
		double   Q= (double)a/b;
		
		return Q;
	}

}
