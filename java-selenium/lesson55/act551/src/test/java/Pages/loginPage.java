package Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class loginPage {
	
	
    WebDriver driver;
	
	By txt_email= By.name("CustomerLogin.CustomerLoginFormData.Email");
	By txt_password=By.name("CustomerLogin.CustomerLoginFormData.Password");
	By btn_login=By.xpath("//input[@type=\"submit\"]");
	

	public loginPage(WebDriver driver) {
		this.driver = driver;
	}


	public void enterEmail() {
		driver.findElement(txt_email).sendKeys("ameni.dridi.ing@gmail.com");;
	}
	
	
	public void enterpassword() {
		driver.findElement(txt_password).sendKeys("Ameni2023");;
	}
	public void Clicklogin() {
		driver.findElement(btn_login).click();
	}


}
