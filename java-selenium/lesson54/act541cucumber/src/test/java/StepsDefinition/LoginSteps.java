package StepsDefinition;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import page.LoginPage;

public class LoginSteps {
	
	WebDriver driver = null;
	LoginPage login=new LoginPage(driver);
	

	@Given("user is in login page")
	public void user_is_in_login_page() throws InterruptedException {
	    // Write code here that turns the phrase above into concrete actions
	  System.out.println("user in login page");
	  System.setProperty("webdriver.chrome.driver","C:/Users/adridi/Documents/repos/new_project/Module5/lesson54/act541cucumber/src/test/resources/driver/chromedriver.exe" );
	  driver= new ChromeDriver();
	  Thread.sleep(2000);
	  driver.navigate().to("http://demo.guru99.com/test/newtours/");
	  driver.findElement(By.xpath("//a[@href=\"login.php\"]")).click();
	  
	}

	@When("^user enter (.*) and (.*)$")
	public void user_enter_email_and_password(String email, String password) {
	    // Write code here that turns the phrase above into concrete actions
		 System.out.println("user in login page");
		 login =new LoginPage(driver);
		 login.enterEmail(email);
		 login.enterpassword(password);
		 
		 
	}

	@And("click on login button")
	public void click_on_login_button() {
	    // Write code here that turns the phrase above into concrete actions
		login.Clicklogin();
		
		
	}

	@Then("user is navigated to home page")
	public void user_is_navigated_to_home_page() {
	    // Write code here that turns the phrase above into concrete actions
		 System.out.println("user in login page");
         driver.getPageSource().contains("Login Successfully");
		
	    
	}


}
