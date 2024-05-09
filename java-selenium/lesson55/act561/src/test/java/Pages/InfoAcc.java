package Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class InfoAcc {

	

	WebDriver driver;
	
	By btn_modify=By.xpath("//a[@href=\"/Account/Customer/ChangeEmail.html\"]");
	
	
	
	
	public InfoAcc(WebDriver driver) {
		this.driver = driver;
	}




	public void Clickmodify (){
		driver.findElement(btn_modify).click();;
	}

}
