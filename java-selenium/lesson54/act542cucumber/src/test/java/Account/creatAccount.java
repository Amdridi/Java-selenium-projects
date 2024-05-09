package Account;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import jdk.internal.util.xml.impl.Input;

public class creatAccount {
WebDriver driver;
	

	By txt_email= By.xpath("//input[@id=\"input_identifierValue\"]");
	By btn_submit=By.xpath("//button[@type=\"submit\"]");
	By txt_password= By.name("password");
	By txt_password_confirm= By.className("mdc-text-field__input confirm-passworInputut");
	By btn_login= By.className("mdc-button__touch");
	
	public creatAccount(WebDriver driver) {
		
		this.driver = driver;
	}

	public void enterEmail(String email) {
		driver.findElement(txt_email).sendKeys(email);;
	}
	
	public void submit() {
		driver.findElement(btn_submit).click();;;
	}
	
	
	public void enterpassword(String password) {
		driver.findElement(txt_password).sendKeys(password);;
	}
	public void Clicklogin() {
		driver.findElement(btn_login).click();
	}


}
