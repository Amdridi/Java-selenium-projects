
package Steps;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import Pages.loginPage;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;


public class loginSteps{
	
	
	WebDriver driver;
	@Given("user is on login page")
	public void user_is_on_login_page() {
    // Write code here that turns the phrase above into concrete actions
		System.out.println(  "** in_Step user in connexion page");
		System.setProperty("webdriver.chrome.driver","C:\\Users\\adridi\\Documents\\nouveaurepos\\new_project\\TestRappel\\src\\test\\resources\\Drivers\\chromedriver.exe" );
		driver= new ChromeDriver();
		driver.navigate().to("https://www.cdiscount.com/");

	}

	@When("he enters an email")
	public void he_enters_an_email() {
    // Write code here that turns the phrase above into concrete actions
    //loginPage.entermail();
	}

	@When("a password")
	public void a_password() {
    // Write code here that turns the phrase above into concrete actions
	//loginPage.mdp();;
	}

	@Then("he is redirected to dashboard")
	public void he_is_redirected_to_dashboard() {
    // Write code here that turns the phrase above into concrete actions
    //loginPages.isdashbord();
}
}