package StepsforHooks;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import Pages.HomePage;
import Pages.InfoAcc;
import Pages.loginPage;
import Pages.personalInfo;
import Pages.profilePage;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class StepsforHooks {
	
	WebDriver driver;
	
	@Before (order=1)
	public void logged_In() throws InterruptedException {
		System.out.println("loggin");
		System.setProperty("webdriver.chrome.driver","C:\\Users\\adridi\\Documents\\repos\\new_project\\Module5\\lesson55\\act561\\src\\test\\resources\\Drivers\\chromedriver.exe" );
		driver= new ChromeDriver();
		driver.navigate().to("https://www.cdiscount.com/");
		Thread.sleep(2000);
		HomePage home=new HomePage(driver);
		home.Click();
		Thread.sleep(2000);
		loginPage login= new loginPage(driver);
		login.enterEmail();
		login.enterpassword();
		login.Clicklogin();
		Thread.sleep(2000);
	}
	
	@Before (order=2)
	public void Profile_Info() throws InterruptedException {
		System.out.println("Profile_Info");
		profilePage profile=new profilePage(driver);
		profile.Clickinfo();
		Thread.sleep(3000);

	}
	
	
	@After
	public void closeBrowser() {
		System.out.println("After hooks");
		driver.close();
	}
	
	@Given("user is in email modify page")
	public void user_is_in_email_modify_page() throws InterruptedException {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println("user is in email modify page ");
		InfoAcc account=new InfoAcc(driver);
		account.Clickmodify();
		Thread.sleep(2000);  
	}

	@When("^enters(.*) and confirm (.*) and enters valid (.*)$")
	public void enters_ameni_dridi_ing_gmail_com_and_confirm_ameni_dridi_ing_gmail_com_and_enters_valid_Ameni2024(String newemail,String newemailc, String password) {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println("user enter valid password ");
		personalInfo p=new personalInfo(driver);
		p.enternewEmail(newemail);
		p.enternewEmailc(newemailc);
		p.enternewPassword(password);

	}

	@And("cliks on save email")
	public void cliks_on_save_email() throws InterruptedException {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println("cliks on save email");
		personalInfo p=new personalInfo(driver);
		p.submitmodif();
		Thread.sleep(2000);

	}

	@Then("error message is shown")
	public void error_message_is_shown() {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println("error message is shown");
		profilePage p=new profilePage(driver) ;
		p.isinotProfile();
	   
	}

	@When("^user enters (.*) and confirm (.*) and enters invalid (.*)$")
	public void user_enters_ameni_dridi_ing_gmail_com_and_confirm_ameni_dridi_ing_gmail_com_and_enters_invalid_aaaaa(String newemail,String newemailc,String invalidpassword) {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println("user enter invalid password ");
		personalInfo p=new personalInfo(driver);
		p.enternewEmail(newemail);
		p.enternewEmailc(newemailc);
		p.enternewPassword(invalidpassword);
	}

	@Then("save and user is redireted to personal information")
	public void save_and_user_is_redireted_to_personal_information() {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println("modif saved ");
		profilePage p=new profilePage(driver) ;
		p.isinProfile();

	}




}
