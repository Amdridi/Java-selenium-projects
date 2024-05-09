package talanacm1act161;


public class Main {

	public static void main(String[] args) {
		
		
		
			
		Voile V1=new Voile("Horizontale", 16.5, 6);
		Pont  pontnavire=new Pont(4, "blanc", "bois",V1) ;
		Cabine cabinecapitaine=new Cabine (3, 20 , true);
		Coque  coquenavire=new Coque(2, 8);
		Bateau lenavire= new Bateau(1, cabinecapitaine,coquenavire, pontnavire );
		
		
	
		
		System.out.println(lenavire);
	}
	
	
	
	
	
	

}
