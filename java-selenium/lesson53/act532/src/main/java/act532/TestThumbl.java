package act532;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class TestThumbl {

	public static void main(String[] args) {
		ChromeOptions options = new ChromeOptions();
		  options.addArguments("--remote-allow-origins=*"); 
		  WebDriver driver = new ChromeDriver(options); 
		  driver.get(" https://www.tumblr.com/login");
		  WebElement email =driver.findElement(By.name("email"));
		  email.sendKeys("ameni.dridi.ing@gmail.com");
		  WebElement pwd=driver.findElement(By.name("password"));
		  pwd.sendKeys("Test#2023!");
		  WebElement button=driver.findElement(By.className("EvhBA"));
		  button.click();
		  WebElement bn=driver.findElement(By.xpath("//a[@href=\"/new\"]"));
		  bn.click();

	}

}
