package talanact533;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class Test3 {

	public static void main(String[] args) throws InterruptedException {
		ChromeOptions options = new ChromeOptions();
		  options.addArguments("--remote-allow-origins=*"); 
		  WebDriver driver = new ChromeDriver(options); 
			/*
			 * driver.get("https://order.cdiscount.com/Account/LoginLight.html?referrer=");
			 * Thread.sleep(5000); WebElement
			 * pop=driver.findElement(By.id("popin_tc_privacy_button_2")); pop.click();
			 * Thread.sleep(5000); WebElement
			 * mail=driver.findElement(By.name("CustomerLogin.CustomerLoginFormData.Email"))
			 * ; mail.sendKeys("ameni.dridi.ing@gmail.com"); WebElement
			 * PWD=driver.findElement(By.name("CustomerLogin.CustomerLoginFormData.Password"
			 * )); PWD.sendKeys("Ameni2023"); WebElement
			 * btn=driver.findElement(By.xpath("//input[@type=\"submit\"]")); btn.click();
			 * Thread.sleep(5000); WebElement cx=driver.findElement(By.id("hConnect"));
			 * cx.click(); Thread.sleep(5000); WebElement param=driver.findElement(By.xpath(
			 * "//a[@href=\"/account/customer/accountparameters.html\"]")); param.click();
			 * Thread.sleep(5000); WebElement modif=driver.findElement(By.xpath(
			 * "//a[@href=\"/Account/Customer/ChangeEmail.html\"]")); modif.click();
			 * Thread.sleep(5000); WebElement
			 * nvmail=driver.findElement(By.id("EmailFormData_NewEmail"));
			 * nvmail.sendKeys("amenidridi2022@gmail.com"); WebElement
			 * nvmailc=driver.findElement(By.id("EmailFormData_ConfirmNewEmail"));
			 * nvmailc.sendKeys("amenidridi2022@gmail.com"); WebElement
			 * pwdn=driver.findElement(By.name("EmailFormData.Password"));
			 * pwdn.sendKeys("Ameni2023"); WebElement
			 * sub=driver.findElement(By.xpath("//input[@type=\"submit\"]")); sub.click();
			 * Thread.sleep(5000);
			 */
	  
		  
		    driver.get("https://www.parashop.tn/");
			Thread.sleep(5000);
			WebElement cnx=driver.findElement(By.xpath("//a[@href=\"javascript:open_login_popup()\"]"));
			cnx.click();
			
			WebElement mail=driver.findElement(By.xpath("//body/div/form/div/input[@name=\"email\"]"));
			mail.sendKeys("amenidridi2022@gmail.com");
			
			WebElement pwd=driver.findElement(By.name("password"));
			pwd.sendKeys("Ameni2023");
			Thread.sleep(5000);
			
	}

}
