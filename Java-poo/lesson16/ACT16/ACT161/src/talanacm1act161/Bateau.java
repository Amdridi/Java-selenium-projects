package talanacm1act161;

public class Bateau {
	      
	
	       int id ;
           Cabine ca;
           Coque co;
           Pont pn;
          
          Bateau (int id ,Cabine ca,Coque co, Pont pn){ 
        	  this.id=id;
        	  this.ca=ca;
        	  this.co=co;
        	  this.pn=pn;
          }
          
          Bateau (int id ,Cabine ca){ 
        	  this.id=id;
        	  this.ca=ca;
        	
          }
          
          
          
	////GETTER ET SETTER ////
          
		public int getId() {
			return id;
		}
	
		public void setId(int id) {
			this.id = id;
		}
	
		public Cabine getCa() {
			return ca;
		}
	
		public void setCa(Cabine ca) {
			this.ca = ca;
		}
	
		public Coque getCo() {
			return co;
		}
	
		public void setCo(Coque co) {
			this.co = co;
		}
	
		public Pont getPn() {
			return pn;
		}
	
		public void setPn(Pont pn) {
			this.pn = pn;
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
			
	     return "Le bateau n°"+this.id+ " est constitué de: " +" \n La coque n°: "+ this.co.id+" \n La cabine n°: "+this.ca.id+"\n Le pont n° "+this.pn.id + " est constitué du voile n° " + this.pn.v.id;
	    }
}
