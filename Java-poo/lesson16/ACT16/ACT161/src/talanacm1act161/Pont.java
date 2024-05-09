package talanacm1act161;

public class Pont {

	
		int id ;
		String couleur;
	    String type ;
	    Voile v; 
	    
	    Pont (int id, String couleur  , String type, Voile v  ){
	    	this.id=id;
	    	this.couleur= couleur ;
	    	this.type= type ;
	    	this.v= v; 
	    	}
	    
	    Pont (int id, String couleur   ){
	    	this.id=id;
	    	this.couleur= couleur ;
	    	
	    	}
    
    
	    ////GETTER ET SETTER ///
	
	
		public int getId() {
			return id;
		}
	
		public void setId(int id) {
			this.id = id;
		}
	
		public String getCouleur() {
			return couleur;
		}
	
		public void setCouleur(String couleur) {
			this.couleur = couleur;
		}
	
		public String getType() {
			return type;
		}
	
		public void setType(String type) {
			this.type = type;
		}
	
		public Voile getV() {
			return v;
		}
	
		public void setV(Voile v) {
			this.v = v;
		}
		
		
		///METHODE////
		
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
