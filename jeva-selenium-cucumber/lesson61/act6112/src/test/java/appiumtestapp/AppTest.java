package appiumtestapp;

import java.io.File;
import java.net.URL;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.remote.DesiredCapabilities;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import io.github.bonigarcia.wdm.WebDriverManager;

public class AppTest {
	static AndroidDriver driver;
	public static void main(String[] args) {
		
			try {
				TestApp ();
			}
			catch (Exception exp){
				System.out.println(exp.getCause());
				System.out.println(exp.getMessage());
				exp.printStackTrace();
			}
		}
		public static void TestApp () throws Exception {
			DesiredCapabilities cap = new DesiredCapabilities();  
			cap.setCapability("deviceName", "AOSP on IA Emulator");
			cap.setCapability("udid", "emulator-5554");
			cap.setCapability("platformName", "Android");
			cap.setCapability("platformVersion", "9");
			cap.setCapability("automationName" , "UiAutomator2");
			cap.setCapability("app", "C:\\Users\\adridi\\Downloads\\SHEIN.apk");
			cap.setCapability("appPackage", "com.zzkko");
			URL url =new URL("http://127.0.0.1:4723/wd/hub");
			driver= new AndroidDriver(url,cap);
			System.out.println("Application installed");
			
		
		}

	}


