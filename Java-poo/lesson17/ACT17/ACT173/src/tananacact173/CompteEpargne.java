package tananacact173;

public class CompteEpargne extends Compte {
	
	private double tauxIntere;
	
	CompteEpargne(int  code, double solde, double soldeinitial ,double tauxIntere ){
		
		super (code, solde,soldeinitial);
		this.tauxIntere=tauxIntere;	
		
	}

	public double getTauxIntere() {
		return tauxIntere;
	}

	public void setTauxIntere(double tauxIntere) {
		this.tauxIntere = tauxIntere;
	}
	
	
	
	public double calculerInteret() {
		
		double interet=(this.tauxIntere/100)*this.solde; 
		this.solde=this.solde + interet;
		return this.solde ;
	}
	
	@Override 
	public void consulter () {
		 
		System.out. printf ("\n Le solde de votre compte  epargne est : "+" %,2f€ ",this.solde);
		
	}
}
