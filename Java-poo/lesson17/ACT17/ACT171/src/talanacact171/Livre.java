package talanacact171;

public abstract class Livre {

	private String titre;
	private String auteur ;
	private double prix;
	private int nbrpage;
	private String genre;
	
	Livre(String titre,String auteur,double prix,int nbrpage,String genre ){
		
		this.titre=titre;
		this.auteur=auteur;
		this.prix=prix;
		this.nbrpage=nbrpage;
		this.genre=genre;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getAuteur() {
		return auteur;
	}

	public void setAuteur(String auteur) {
		this.auteur = auteur;
	}

	public double getPrix() {
		return prix;
	}

	public void setPrix(double prix) {
		this.prix = prix;
	}

	public int getNbrpage() {
		return nbrpage;
	}

	public void setNbrpage(int nbrpage) {
		this.nbrpage = nbrpage;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}
	
	
	public void Afficher() {
		
		 
		  System.out.println("Titre du livre : "+this.getTitre()+"\nInformations sur le livre : " + "\n\t\t\t  |Auteur: "+this.getAuteur()+"\n\t\t\t  |Gnere : "+this.getGenre()+"\n\t\t\t  |Pirx  : "+this.getPrix()+" dt");
		  System.out.println("--------------------------------------------------");
		  
		  }
}
