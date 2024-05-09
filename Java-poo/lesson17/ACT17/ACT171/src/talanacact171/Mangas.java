package talanacact171;

public class Mangas extends Livre {
	private  boolean encouleur=false;
	private  boolean gauchedroite=false;
    private boolean  taillepetite=true;
		    
    Mangas (String titre,String auteur,double prix,int nbrpage,String genre,boolean encouleur,boolean gauchedroite,boolean taillepetite ){
		    	
    	super(titre,auteur,prix,nbrpage,genre);
		this.encouleur=encouleur;
		this.gauchedroite=gauchedroite;
		this.taillepetite=taillepetite;
		
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

	public boolean isTaillepetite() {
		return taillepetite;
	}

	public void setTaillepetite(boolean taillepetite) {
		this.taillepetite = taillepetite;
	}
    
    
    
    
}
