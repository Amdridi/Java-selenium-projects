package talanacaat181;

import java.util.ArrayList;
import java.util.Arrays;


public class Main {

	public static void main(String[] args) {


		ArrayList<String> myList = new ArrayList<>(Arrays.asList("Lion", "Tiger", "Cat", "Dog"));
		System.out.println(myList);
		ArrayList<String> newList = new ArrayList<>();
		newList =(ArrayList<String>) myList.clone();
		////////////////////
		
		myList.add(2, "Elephant");
		System.out.println(myList);
		
		/////////////////
		ArrayList<String> newList2 = new ArrayList<>();
		newList2.addAll(newList);
		newList2.addAll(myList);
		ArrayList<String>  newList3=(ArrayList<String>) newList2.clone();
		
		System.out.println(newList2);
		System.out.println("Taille du tabelau : " + newList2.size() + ".");
		
		////////////////////////////
		newList2.remove(4);
		System.out.println("\nSuppression de l'élément en position : 4 ");
		System.out.println("Nouveau tableau : "+ newList2);
		System.out.println("Taille du tableau  : " + newList2.size() + ".");
		
		/////////////////////////
		System.out.println("\nSuppression de l'élément Cat  ");
		newList2.remove("Cat");
		newList2.remove("Cat");
		System.out.println("Nouveau tableau : "+ newList2);
		System.out.println("Taille du tableau  : " + newList2.size() + ".");
		//////////////////////////
		
		System.out.println("Nouveau tableau : "+ newList3);
		System.out.println("\nSuppression de l'animal (nom): Tiger  ");
		newList3.remove("Tiger");
		newList3.remove("Tiger");
		System.out.println("Nouveau tableau : "+ newList3);
		System.out.println("Taille du tableau  : " + newList3.size() + ".");
		
		////////////////////////:
		
		System.out.println(recherche ("Cat" , newList3 ));
		
		System.out.println(rechercheIndice(2,  newList3));
		
	  }
	
	
	//////////Rechcherche element /////
	public static String recherche(String item , ArrayList<String> L ) {
		   int i=0;
		   while (i<L.size()){
			   
			   if (L.contains(item)) {  
				   return "l'element "+item+" exist";
				   
			   }
			   i++;
		   }
		  return "l'element n'existe pas "; 
	}
		  
		 ///////////recherche indice ///////////
		  
		  public static String rechercheIndice(int index, ArrayList<String> L ) {
			   int i=0;
			   while (i<L.size()){
				   
				   if (i==index) { 
					   
					   return "L'element "+L.get(index)+" exist";  
				   }
				   i++;
			   }
			  return "l'element "+L.get(index) +"n'existe pas ";
	
	}
	
}

	
	
	

		
		
	


