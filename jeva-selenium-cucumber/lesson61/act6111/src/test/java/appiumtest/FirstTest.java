package appiumtest;

import java.net.MalformedURLException;
import java.net.URL;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;



public class FirstTest {
	static AndroidDriver driver;
	public static void main(String[] args) throws Exception {
		
		try {
			TestMyTeck();
		}
		catch (Exception exp){
			System.out.println(exp.getCause());
			System.out.println(exp.getMessage());
			exp.printStackTrace();
		}
	}
	public static void TestMyTeck () throws Exception {
		DesiredCapabilities cap = new DesiredCapabilities();  
		cap.setCapability("deviceName", "AOSP on IA Emulator");
		cap.setCapability("udid", "emulator-5554");
		cap.setCapability("platformName", "Android");
		cap.setCapability("platformVersion", "9");
		cap.setCapability("browserName", "chrome");
		URL url =new URL("http://127.0.0.1:4723/wd/hub");
		driver= new AndroidDriver(url,cap);
		
		driver.get("http://mytek.tn");
		driver.findElement(By.className("user")).click();
		Thread.sleep(2000);
		driver.findElement(By.id("email")).sendKeys("ameni.dridi.ing@gmail.com");
		driver.findElement(By.id("pass")).sendKeys("Ameni2023");
		driver.findElement(By.id("send2")).click();
		driver.findElement(By.id("minisearch-input-top-search")).sendKeys("hp");
		driver.findElement(By.id("minisearch-input-top-search")).sendKeys(Keys.ENTER);
		Thread.sleep(2000);	
		driver.findElement(By.xpath("//span[contains(text(),'Ajouter au panier')]")).click();
		driver.findElement(By.linkText("panier")).click();
		Thread.sleep(2000);	
		System.out.println("Application tested");
		
	}
	

}
