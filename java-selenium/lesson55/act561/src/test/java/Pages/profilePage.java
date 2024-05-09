package Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class profilePage {
	
	
	WebDriver driver;	
	By btn_info=By.xpath("//a[@href=\"/account/customer/accountparameters.html\"]");
	
	
	public void Clickinfo() {
		driver.findElement(btn_info).click();

}


	public profilePage(WebDriver driver) {

		this.driver = driver;
	}
    
	public void isinProfile() {
	System.out.println("user in login page");
     boolean b= driver.getPageSource().contains("Vos modifications ont bien été prises en compte");
     if (b==true) {
    	 System.out.println("############  TEST PASSED VALID PASSWORD ################");
     }
     else 
     {
    	 System.out.println("############  TEST FAILED ################");
     }

	}
	
	public void isinotProfile() {
		
	     boolean b= driver.getPageSource().contains("Vos modifications ont bien été prises en compte");
	     if (b==false) {
	    	 System.out.println("############  TEST PASSED INVALID PASSWORD ################");
	     }

		}


}
