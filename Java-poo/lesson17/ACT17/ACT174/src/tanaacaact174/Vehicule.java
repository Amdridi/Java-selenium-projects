 package tanaacaact174;

abstract class Vehicule {
	String nom;
	String marque ;
	
	
	public Vehicule(String nom, String marque){
		this.nom = nom;
		this.marque = marque;
		}
	
	

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getMarque() {
		return marque;
	}

	public void setMarque(String marque) {
		this.marque = marque;
	}
	public abstract void demarrer();
	public void avancer() {}
	
	@Override
	public String toString() {
		
		return "Le nom  du vehicule est : "+ this.nom +"\nLa marque est : "+ this.marque;
		
	}
}
