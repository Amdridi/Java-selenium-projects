package talanacm1act161;

public class Voile {

	  public  String coupe;
	  private double longueur ;
	  private String materiau;
	  protected int delaisFab;
	  private boolean enrouler;
	  private boolean derouler;
	  int id ;
	  
	  Voile (String coupe, double longueur , String materiau, int delaisFab, boolean enrouler, boolean derouler,int id ) {
		  
		  this.coupe=coupe;
		  this.longueur=longueur;
		  this.materiau=materiau;
		  this.delaisFab=delaisFab;  
		  this.enrouler=enrouler;
		  this.derouler=derouler ;
		  this.id=id ;
	  }	  
	  
      Voile (String coupe, double longueur ,int id) {
		  
		  this.coupe=coupe;
		  this.longueur=longueur;
		  this.id=id;
		  
	  }	  
      
     
      
      public double longueur (double longueur ) {
    	  
    	   double l = this.longueur ;
    			   
    	  return l ;
      }
      
      
      
      public String  materiau (String materiau ) {
    	  
   	   String  m = this.materiau ;
   			   
   	  return m;
     }
      

     
     
     ///GETTER ET SETTER ////
     
	public String getCoupe() {
		return coupe;
	}

	public void setCoupe(String coupe) {
		this.coupe = coupe;
	}

	public double getLongueur() {
		return longueur;
	}

	public void setLongueur(double longueur) {
		this.longueur = longueur;
	}

	public String getMateriau() {
		return materiau;
	}

	public void setMateriau(String materiau) {
		this.materiau = materiau;
	}

	public int getDelaisFab() {
		return delaisFab;
	}

	public void setDelaisFab(int delaisFab) {
		this.delaisFab = delaisFab;
	}

	public boolean isEnrouler() {
		return enrouler;
	}

	public void setEnrouler(boolean enrouler) {
		this.enrouler = enrouler;
	}

	public boolean isDerouler() {
		return derouler;
	}

	public void setDerouler(boolean derouler) {
		this.derouler = derouler;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
    
	
    ///METHODES///
    
    public boolean enrouler(boolean enrouler ) {
  	  
  	   boolean bool = this.enrouler ;
  			   
  	  return bool ;
    }
    
   public boolean  derouler(boolean derouler ) {
  	 
  	 boolean b = this.derouler  ;
     	  
  	  return b;
    }
   
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
