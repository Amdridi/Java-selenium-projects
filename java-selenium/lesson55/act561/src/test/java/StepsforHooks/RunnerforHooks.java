package StepsforHooks;


import org.junit.runner.RunWith;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(features="src/test/resources/Features/ProfilewithHooks.feature", glue={"StepsforHooks"})
public class RunnerforHooks {

}
