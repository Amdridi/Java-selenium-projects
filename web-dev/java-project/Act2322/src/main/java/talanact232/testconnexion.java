package talanact232;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;


public class testconnexion {

	public static void main(String[] args) {
		
		String myUrl="jdbc:mysql://localhost:3306/formation?serverTimezone=UTC";
        String myUser = "root";
        String myPwd ="";
        java.sql.Connection cn=null;
        java.sql.Statement st = null;
        
            try {
               
                cn = DriverManager.getConnection(myUrl, myUser,myPwd);
                st = cn.createStatement();
                String sql ="INSERT INTO `javadb`(`personne`) VALUES ('"+"imene"+"')";
                st.executeUpdate(sql);
               
            } catch (SQLException ex) {
               ex.printStackTrace();
            } 
       
        finally {
           
            try {
               st.close();
               cn.close();
            } catch (SQLException ex) {
               ex.printStackTrace();;
            }
        }
        

		
    

	}
	
}


