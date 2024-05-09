package Steps;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class passwordSteps {
	
	
	@Given("user is in personal account page")
	public void user_is_in_personal_account_page() {
	    // Write code here that turns the phrase above into concrete actions
	    
	}

	@When("user clicks on modify password")
	public void user_clicks_on_modify_password() {
	    // Write code here that turns the phrase above into concrete actions
	   
	}

	@And("enters Ameni2023 and enters <newpassword> and confirm <passwordc>")
	public void enters_ameni2023_and_enters_newpassword_and_confirm_passwordc() {
	    // Write code here that turns the phrase above into concrete actions
	    
	}

	@Then("user is navigated to personal informations and password is saved")
	public void user_is_navigated_to_personal_informations_and_password_is_saved() {
	    // Write code here that turns the phrase above into concrete actions
		System.out.println("Secnario2");
	}

}
