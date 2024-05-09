package talanact233;

import java.sql.DriverManager;
import java.sql.SQLException;

public class Connexion {
	private String Url ;
	private String drivername;
    private String User ;
    private String Pwd;
   
    public Connexion() {
		
	}
	
	
	public Connexion(String url, String drivername, String user, String pwd) {
		Url = url;
		this.drivername = drivername;
		User = user;
		Pwd = pwd;
	}
	public String getUrl() {
		return Url;
	}
	public void setUrl(String url) {
		Url = url;
	}
	public String getDrivername() {
		return drivername;
	}
	public void setDrivername(String drivername) {
		this.drivername = drivername;
	}
	public String getUser() {
		return User;
	}
	public void setUser(String user) {
		User = user;
	}
	public String getPwd() {
		return Pwd;
	}
	public void setPwd(String pwd) {
		Pwd = pwd;
	}
	
   

}
