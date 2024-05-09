package tanaacaact182;

import java.util.ArrayList;
import java.util.Objects;

public class PlayListe {
	private String nom;
	private String genre;
	private ArrayList<Musique> musiques = new ArrayList<Musique>();
	
	
	public PlayListe(String nom, String genre) {
		this.nom = nom;
		this.genre = genre;
	}
	
	
	public PlayListe(String nom, String genre, ArrayList<Musique> musiques) {
		this.nom = nom;
		this.genre = genre;
		this.musiques=musiques;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(genre, musiques, nom);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PlayListe other = (PlayListe) obj;
		return Objects.equals(musiques, other.musiques)
				&& Objects.equals(nom, other.nom);
	}




	public String getNom() {
		return nom;
	}




	public void setNom(String nom) {
		this.nom = nom;
	}




	public String getGenre() {
		return genre;
	}




	public void setGenre(String genre) {
		this.genre = genre;
	}




	public ArrayList<Musique> getMusiques() {
		return musiques;
	}




	public void setMusiques(ArrayList<Musique> musiques) {
		this.musiques = musiques;
	}




	@Override
	public String toString() {
		return "PlayListe [nom=" + nom + ", genre=" + genre + ", musiques=" + musiques + "]";
	}

	
   public ArrayList<Musique> Ajouter(Musique M){
	   this.musiques.add(M);
	return this.musiques ;
	   
   }
   
   public String recherche(Musique item  ) {

		   
		   if (this.musiques.contains(item)) {  
			   return "l'element "+item+" exist";	   
		   }

	   }
	  return "l'element n'existe pas "; 
}
		  
	
	
	

}
