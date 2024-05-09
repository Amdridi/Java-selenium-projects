package talanact531;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;


public class TestClass {
	public static void main(String[]args) {
		
		///******************Scénario 1********************//
		/*
		 * ChromeOptions options = new ChromeOptions();
		 * options.addArguments("--remote-allow-origins=*"); WebDriver driver = new
		 * ChromeDriver(options); driver.get(" http://demo.guru99.com/test/newtours/");
		 * WebElement register =driver.findElement(By.
		 * xpath("//td/a[@href=\"register.php\" or @text=\"REGISTER\"]"));
		 * register.click(); WebElement first_Name
		 * =driver.findElement(By.name("firstName")); first_Name.sendKeys("ameni");
		 * WebElement last_Name =driver.findElement(By.name("lastName"));
		 * last_Name.sendKeys("dridi"); WebElement phone
		 * =driver.findElement(By.name("phone")); phone.sendKeys("999999"); WebElement
		 * email =driver.findElement(By.id("userName"));
		 * email.sendKeys("amenid@gmail.com"); WebElement address1
		 * =driver.findElement(By.name("address1")); address1.sendKeys("charguia1");
		 * WebElement city =driver.findElement(By.name("city")); city.sendKeys("Tunis");
		 * WebElement state =driver.findElement(By.name("state"));
		 * state.sendKeys("Tunis"); WebElement poste
		 * =driver.findElement(By.name("postalCode")); poste.sendKeys("7000");
		 * WebElement selectCountry =driver.findElement(By.name("country"));
		 * selectCountry.click(); WebElement country
		 * =driver.findElement(By.xpath("//option[@value=\"TUNISIA\"]"));
		 * country.click(); WebElement userName=driver.findElement(By.id("email"));
		 * userName.sendKeys("ameni"); WebElement
		 * pwd=driver.findElement(By.name("password")); pwd.sendKeys("aaaa2023");
		 * WebElement pwdConfirm=driver.findElement(By.name("confirmPassword"));
		 * pwdConfirm.sendKeys("aaaa2023"); WebElement
		 * send=driver.findElement(By.name("submit")); send.click(); driver.close();
		 */
		
		///******************Scénario 2********************//
		
		
		  ChromeOptions options = new ChromeOptions();
		  options.addArguments("--remote-allow-origins=*"); 
		  WebDriver driver = new ChromeDriver(options); 
		  driver.get(" http://demo.guru99.com/test/newtours/");
		  WebElement signOn=driver.findElement(By.xpath("//a[@href=\"login.php\"]"));
		  signOn.click();
		  WebElement signUser =driver.findElement(By.name("userName"));
		  signUser.sendKeys("ameni");
		  WebElement signpwd=driver.findElement(By.name("password"));
		  signpwd.sendKeys("aaaa2023");
		  WebElement button=driver.findElement(By.name("submit"));
		  button.click();
		  driver.close();
		 

	}

}
