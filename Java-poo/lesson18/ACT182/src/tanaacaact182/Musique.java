package tanaacaact182;

import java.util.Objects;

public class Musique {
	 private String titre;
	 private String auteur;
	 private String interprete;
	 private String genre;
	 
	public Musique(String titre, String auteur, String interprete, String genre) {
		this.titre = titre;
		this.auteur = auteur;
		this.interprete = interprete;
		this.genre = genre;
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

	public String getInterprete() {
		return interprete;
	}

	public void setInterprete(String interprete) {
		this.interprete = interprete;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	@Override
	public int hashCode() {
		return Objects.hash(auteur, genre, interprete, titre);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Musique other = (Musique) obj;
		
		return Objects.equals(interprete, other.interprete) && Objects.equals(titre, other.titre);
	}

	@Override
	public String toString() {
		return "Musique [titre=" + titre + ", auteur=" + auteur + ", interprete=" + interprete + ", genre=" + genre
				+ "]";
	}
	
	
	
	 

}
