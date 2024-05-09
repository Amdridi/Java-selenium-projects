package talan.m2.act231;

import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;

public class connexionbdn {
	
	public static void main(String[] args) {
		SauverEnBase ("ameni");

}
	
	public static void  SauverEnBase (String personne ){
        String myUrl="jdbc:mysql://localhost:3306/formation?characterEncoding=latin1";
        String myUser = "root";
        String myPwd ="";
        java.sql.Connection cn=null;
        java.sql.Statement st = null;
        
            try {
                Class.forName("com.mysql.jdbc.Driver");
                cn = DriverManager.getConnection(myUrl, myUser,myPwd);
                st = cn.createStatement();
                String sql ="INSERT INTO `javadb`(`personne`) VALUES ('"+personne+"')";
                st.executeUpdate(sql);
               
            } catch (SQLException ex) {
               ex.printStackTrace();
            } catch (ClassNotFoundException ex) {
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
