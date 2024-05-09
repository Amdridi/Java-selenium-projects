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
     boolean b= driver.getPageSource().contains("modifications");
     if (b==true) {
    	 System.out.println("############  TEST PASSED  ################");
     }

	}
	}
