package talanacact171;


public class bandedessine extends Livre {
   private  boolean encouleur;
   private  boolean gauchedroite=true;
    
    bandedessine(String titre,String auteur,double prix,int nbrpage,String genre,boolean encouleur, boolean gauchedroite ){
    	 
    	super(titre,auteur,prix,nbrpage,genre);
    	this.encouleur=encouleur;
    	this.gauchedroite=gauchedroite;
    }

	public boolean isEncouleur() {
		return encouleur;
	}

	public void setEncouleur(boolean encouleur) {
		this.encouleur = encouleur;
	}

	public boolean isGauchedroite() {
		return gauchedroite;
	}

	public void setGauchedroite(boolean gauchedroite) {
		this.gauchedroite = gauchedroite;
	}
    
    
    
}
