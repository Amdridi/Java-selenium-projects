package tananacact173;

public class ComptePayant extends Compte {

	
	ComptePayant(int  code, double solde,double soldeinitial){
		
		super (code , solde, soldeinitial);	
		
	}
	
	
	
	public double retirer (double montant, final int taxe) {
		  
		   this.solde=super.retirer(montant) - taxe;
	        
	       return this.solde;
	}
	
	@Override 
	public void consulter () {
		 
		System.out. printf ("\n Le solde de votre compte  payant  est : "+" %,2f€ ",this.solde);
		
	}
	
}
