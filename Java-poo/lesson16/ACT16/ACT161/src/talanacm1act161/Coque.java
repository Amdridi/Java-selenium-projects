package talanacm1act161;

public class Coque {
		
	    int id ;
	    double longueur;
	    int capacite;
	    
	    Coque (int id, double longueur  , int capacite){
	    	this.id=id;
	    	this.longueur=longueur;
	    	this.capacite= capacite ;
	    	}
	    Coque (int id, double longueur){
	    	this.id=id;
	    	this.longueur=longueur;
	    	
	    	}
	    
	    /////GETTER ET SETTER ////
	    
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public double getLongueur() {
			return longueur;
		}
		public void setLongueur(double longueur) {
			this.longueur = longueur;
		}
		public int getCapacite() {
			return capacite;
		}
		public void setCapacite(int capacite) {
			this.capacite = capacite;
		}
		
		///METHODE/////
		public  boolean verifId (int id ) {
	       	  
        	 if (id<0) {
        		 return false;
        	 }
        	 return true ;
        }
	          
        
		@Override
	    public String toString() {
	        return "n°"+this.id+"";
	    }

}
