package talanact233;

public class Main {
    
	
	
	public static void main(String[] args) {
		
		
		
        Connexion a= new Connexion("jdbc:mysql://localhost:3306/base_student?serverTimezone=UTC", "","root","");
		
        Film t=new Film("COUCOU",1);
        FilmManager F= new FilmManager(a, t);
        
       
		//F.consultAfficht();
		//F.consultAffichu();
		//F.modifilm();
		//F.supprimfilm(1);
	
		
		
	 

	}

}
