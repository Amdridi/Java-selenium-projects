package page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {
	
	WebDriver driver;
	
	By txt_email=By.name("userName");
	By txt_password= By.name("password");
	By btn_login=By.name("submit");
	
	
	public LoginPage(WebDriver driver) {
		this.driver = driver;
	}
	public void enterEmail(String email) {
		driver.findElement(txt_email).sendKeys(email);;
	}
	
	public void enterpassword(String password) {
		driver.findElement(txt_password).sendKeys(password);;
	}
	public void Clicklogin() {
		driver.findElement(btn_login).click();
	}

}
