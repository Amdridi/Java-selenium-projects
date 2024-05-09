package Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class HomePage {
	WebDriver driver;	
	By btn_profile = By.xpath("//div[@class=\"hIdent\"]");
	
	
	public HomePage(WebDriver driver) {

		this.driver = driver;
	}



	public void Click() {
		driver.findElement(btn_profile).click();
	}


}
