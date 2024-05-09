package tanaacaact182;

public class PlayListeUI {

	public static void main(String[] args) {
		
		Musique moderne= new Musique("Shape of my Heart", "Sting", "Singer", "Pop");
		Musique moderne2= new Musique("Shape of my Heart", "Sti", "Singer", "P");
		
		System.out.println(moderne.equals(moderne2));
		
		System.out.println(moderne.toString());
		
		PlayListe P=new PlayListe("liste1", "pop");
		
		System.out.println(P);
		
		P.Ajouter(moderne);
		System.out.println(P);
		P.Ajouter(moderne2);
		System.out.println(P);
		String S=P.recherche(moderne2);
		System.out.println(S);
		
			 

	}

}
