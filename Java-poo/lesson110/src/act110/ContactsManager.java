package act110;

import java.util.ArrayList;

public class ContactsManager {
	
	ArrayList<Cantact> myFriends ;
	   int friendsCount;
	   
	public ContactsManager() {
			
			this.myFriends = new ArrayList<Cantact>();
			this.friendsCount = 0;
		}

	
	public void addContact (Cantact c) {
		
		this.myFriends.add(c);
		this.friendsCount++;
				
	}
	
	public Cantact searchContact(String searchName){
		int i=0;
		if (this.myFriends.contains(searchName)) 
			{i= this.myFriends.indexOf(searchName);
		 		return this.myFriends.get(i);	
			}
		return null;
	}


	@Override
	public String toString() {
		return "ContactsManager [myFriends=" + myFriends + ", friendsCount=" + friendsCount + "]";
	}
	
	

}
