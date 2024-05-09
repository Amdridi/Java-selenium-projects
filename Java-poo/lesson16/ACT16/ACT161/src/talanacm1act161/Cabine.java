package talanacm1act161;

public class Cabine {
	
	    int id ;
	    double surface;
	    boolean occupied;
	    
	    Cabine (int id, double surface , boolean occupied){
	    	this.id=id;
	    	this.surface=surface;
	    	this.occupied= occupied;
	    }
	    Cabine (int id, double surface ){
	    	this.id=id;
	    	this.surface=surface;
	    	
	    }
	    
	    
	   ///GETTER ET SETTER /////
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public double getSurface() {
			return surface;
		}
		public void setSurface(double surface) {
			this.surface = surface;
		}
		public boolean isOccupied() {
			return occupied;
		}
		public void setOccupied(boolean occupied) {
			this.occupied = occupied;
		}
		
		////METHODE /////
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