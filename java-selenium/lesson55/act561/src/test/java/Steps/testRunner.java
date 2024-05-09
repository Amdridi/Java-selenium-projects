package Steps;

import org.junit.runner.RunWith;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(features="src/test/resources/Features/Profile.feature", glue={"Steps"}, tags=("@Secnario1 or @Secnario2"))
public class testRunner {

}
