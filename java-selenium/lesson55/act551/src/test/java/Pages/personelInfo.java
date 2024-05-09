package Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class personelInfo {
	
	WebDriver driver; 
	By txt_newemail=By.id("EmailFormData_NewEmail");
	By txt_newemailc=By.id("EmailFormData_ConfirmNewEmail");
	By txt_password=By.name("EmailFormData.Password");
	By btn_submit=By.xpath("//input[@type=\"submit\"]");
	
	
	public personelInfo(WebDriver driver) {

		this.driver = driver;
	}


	public void enternewEmail(String newemail) {
		driver.findElement(txt_newemail).sendKeys(newemail);;
	}
	
	public void enternewEmailc(String newemailc) {
		driver.findElement(txt_newemailc).sendKeys(newemailc);;
	}
	
	
	public void enternewPassword(String password) {
		driver.findElement(txt_password).sendKeys(password);;
	}

	public void submitmodif() {
		driver.findElement(btn_submit).click();
	}
}
