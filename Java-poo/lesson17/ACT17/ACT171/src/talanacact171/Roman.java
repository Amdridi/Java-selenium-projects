package talanacact171;

public class Roman extends Livre {
	 
	private int nbrechapitre;
	private String resume;
	
	
	
	Roman( String titre,String auteur,double prix,int nbrpage,String genre,int nbrechapitre,String resume ){
		super(titre,auteur,prix,nbrpage,genre);
		this.nbrechapitre=nbrechapitre;
		this.resume=resume;
	}



	public int getNbrechapitre() {
		return nbrechapitre;
	}
    
	
	
	public void setNbrechapitre(int nbrechapitre) {
		this.nbrechapitre = nbrechapitre;
	}



	public String getResume() {
		return resume;
	}



	public void setResume(String resume) {
		this.resume = resume;
	}
	
	
	
	
	  
	 
	

}

