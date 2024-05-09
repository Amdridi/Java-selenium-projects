package StepsDefintions;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import Pages.homePage;
import Pages.infoAccount;
import Pages.loginPage;
import Pages.personelInfo;
import Pages.profilePage;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class profileSteps {
	
	
	 WebDriver driver;
	
	@Given("user is in profile page")
	public void user_is_in_profile_page() throws InterruptedException {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println(  "** in_Step user in profile page");
		System.setProperty("webdriver.chrome.driver","C:\\Users\\adridi\\Documents\\repos\\new_project\\Module5\\lesson55\\act551\\src\\test\\resources\\Driver\\chromedriver.exe" );
		driver= new ChromeDriver();
		driver.navigate().to("https://www.cdiscount.com/");
		Thread.sleep(2000);
		homePage home=new homePage(driver);
		home.Click();
		Thread.sleep(2000);
		loginPage login= new loginPage(driver);
		login.enterEmail();
		login.enterpassword();
		login.Clicklogin();
		Thread.sleep(2000);

	}

	@When("user clicks on personal informations")
	public void user_clicks_on_personal_informations() throws InterruptedException {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println("** in_Step user clicks on personal informations");
		profilePage profile=new profilePage(driver);
		profile.Clickinfo();
		Thread.sleep(3000);
	    
	}

	@And("clicks on modify")
	public void clicks_on_modify() throws InterruptedException {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println("** in_Step clicks on modify");
		infoAccount account=new infoAccount(driver);
		account.Clickmodify();
		Thread.sleep(2000);

	}

	@And("^enters (.*) and confirm (.*) and enters (.*)$")
	public void enters_newemail_and_confirm_newemail_and_enters_ameni2023(String newemail, String newemailc,String password) {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println("** in_Step enters new email and confirm new email and enters password ");
		personelInfo p=new personelInfo(driver);
		p.enternewEmail(newemail);
		p.enternewEmailc(newemailc);
		p.enternewPassword(password);
	}

	@And("clicks on save modifications")
	public void clicks_on_save_modifications() throws InterruptedException {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println("** in_Step clicks on save modifications");
		personelInfo p=new personelInfo(driver);
		p.submitmodif();
		Thread.sleep(2000);
	   
	}

	@Then("user is navigated to profile page")
	public void user_is_navigated_to_profile_page() {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println(" ** in Step user is navigated to profile page");
		profilePage p=new profilePage(driver) ;
		p.isinProfile();
	}


}
