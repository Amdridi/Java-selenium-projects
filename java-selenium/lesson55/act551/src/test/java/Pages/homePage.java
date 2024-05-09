package Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class homePage {

	WebDriver driver;	
	By btn_profile = By.xpath("//div[@class=\"hIdent\"]");
	
	
	public homePage(WebDriver driver) {

		this.driver = driver;
	}



	public void Click() {
		driver.findElement(btn_profile).click();
	}
}
