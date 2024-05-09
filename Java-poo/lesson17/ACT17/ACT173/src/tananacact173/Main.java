package tananacact173;

public class Main {

	public static void main(String[] args) {
		
		
		Compte newCompte=new Compte(11, 1000000f, 0);
		newCompte.deposer(200000);
		newCompte.retirer(100000);
		newCompte.consulter();
		
		
		ComptePayant newComptePayant=new ComptePayant(12, 0, 0);
		newComptePayant.deposer(200000);
		newComptePayant.retirer(100000,2);
		newComptePayant.consulter();
		
		CompteEpargne newCompteEpargne=new CompteEpargne(13, 900000,0,50);
		newCompteEpargne.deposer(200000);
		newCompteEpargne.retirer(100000);
		newCompteEpargne.calculerInteret();
		newCompteEpargne.consulter();
				
	}

}
