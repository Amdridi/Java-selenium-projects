package talanact233;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;




public class FilmManager {
	
	private Film f; 
	private Connexion a=new Connexion();
	
	public FilmManager(Connexion a) {
		this.a=a;
	}
	public FilmManager(Connexion a, Film f) {
		this.a=a;
		this.f=f;
				
	}
	

	////////SELECT TOUS LES FILMS//////
	public void consultAfficht () {
		
		try {
			
			java.sql.Connection cn = DriverManager.getConnection(a.getUrl(),a.getUser(),a.getPwd());
	        java.sql.Statement st = cn.createStatement();
            String sql ="SELECT * FROM (`film`) ";
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()){

				System.out.println(rs.getString("titre"));

			}
           
          } catch (SQLException ex) {
           ex.printStackTrace();
         } 
		
		
	}
	
	//////////SELECT UN FILM///////// 
	
	  public void consultAffichu () {
		  try {
				
			    java.sql.Connection cn = DriverManager.getConnection(a.getUrl(),a.getUser(),a.getPwd());
		        java.sql.Statement st = cn.createStatement();
	            String sql ="SELECT titre FROM (`film`) WHERE id_film=" + f.getId_film();
	            ResultSet rs = st.executeQuery(sql);
	            while(rs.next()){

					System.out.print(rs.getString("titre"));

				}
	           
	          } catch (SQLException ex) {
	           ex.printStackTrace();
	         } 

	  
	  }
	  
	  //////////////MODIF FILM ////////////
	  
  public  void modifilm() {
	  try {
			
		  java.sql.Connection cn = DriverManager.getConnection(a.getUrl(),a.getUser(),a.getPwd());
	      java.sql.Statement st = cn.createStatement();
		  String sql ="DELETE FROM (`film`) WHERE id_film="+ f.getId_film();
          st.executeUpdate(sql);

        } catch (SQLException ex) {
         ex.printStackTrace();
       } 
  }
	  
	  public  void supprimfilm() {
		  try {
				
			  java.sql.Connection cn = DriverManager.getConnection(a.getUrl(),a.getUser(),a.getPwd());
		      java.sql.Statement st = cn.createStatement();
	          String sql ="DELETE FROM (`film`) WHERE id_film="+f.getId_film();
	          st.executeUpdate(sql);

	        } catch (SQLException ex) {
	         ex.printStackTrace();
	       } 
	  
	  
  }
	 
	
	
	
	
	
}
