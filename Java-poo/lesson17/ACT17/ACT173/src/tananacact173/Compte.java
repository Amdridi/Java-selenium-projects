package tananacact173;
public class Compte {
	
         protected int  code ;
         protected   double solde ;
         private double soldeinitial;
         
         
         Compte (int  code, double solde,double soldeinitial){
        	 this.code= code;
        	 this.solde= solde;
        	 this.soldeinitial=soldeinitial;
         }


		public int getCode() {
			return code;
		}


		public double getSolde() {
			return solde;
		}


		public double getSoldeinitial() {
			return soldeinitial;
		}


		public void setSoldeinitial(double soldeinitial) {
			this.soldeinitial = soldeinitial;
		}
		
		
	
		
		public double deposer (double montant) {
			
			       this.solde = this.solde + montant ;
			        
			       return this.solde;
			
		}
		
		public double retirer (double montant) {
			
		       this.solde = this.solde - montant ;
		        
		       return solde;
		}
		
		
		
		public void consulter () {
			
			
			System.out. printf ("\n Le solde de votre compte est : "+" %,2f€ ",this.solde);
			
		}


		
		
		
}
