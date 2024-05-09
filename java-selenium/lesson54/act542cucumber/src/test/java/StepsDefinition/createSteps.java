package StepsDefinition;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import Account.creatAccount;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class createSteps {
	
	WebDriver driver=null;
	creatAccount creat;
	
	@Given("user is in acceuil page")
	public void user_is_in_acceuil_page() throws InterruptedException {
	    // Write code here that turns the phrase above into concrete actions
		  // Write code here that turns the phrase above into concrete actions
		  System.out.println("user in login page");
		  System.setProperty("webdriver.chrome.driver","C:\\Users\\adridi\\Documents\\repos\\new_project\\Module5\\lesson54\\act542cucumber\\src\\test\\resources\\Driver\\chromedriver.exe" );
		  driver= new ChromeDriver();
		  Thread.sleep(2000);
		  driver.navigate().to("https://www.jumia.com.tn/");
		  driver.findElement(By.xpath("//button[@aria-label=\"newsletter_popup_close-cta\"]")).click();
		  driver.findElement(By.xpath("//label[@for=\"dpdw-login\"]")).click();
		  driver.findElement(By.xpath("//a[@href=\"/customer/account/login/?return=%2F\"]")).click();
		 
	    
	}

	@When("^user enter (.*) and (.*)$")
	public void user_enter_ameni_and_aaaa2023(String email, String password) {
	    // Write code here that turns the phrase above into concrete actions
		creat= new creatAccount(driver);
		creat.enterEmail(email);
		
		   
	}

	@And("click on login button")
	public void click_on_login_button(String email,String password) {
	    // Write code here that turns the phrase above into concrete actions
	}

	@Then("user is navigated to home page")
	public void user_is_navigated_to_home_page() {
	    // Write code here that turns the phrase above into concrete actions
	    
	}



}
