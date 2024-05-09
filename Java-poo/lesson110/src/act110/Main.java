package act110;

public class Main {

	public static void main(String[] args) {
		
		ContactsManager myContactManager = new ContactsManager();
		
		Cantact ameni= new Cantact("ameni","ameni@talan" , "9994848");
		
		myContactManager.addContact(ameni);
		System.out.println(myContactManager);

	}

}
