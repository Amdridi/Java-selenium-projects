package tanaaca191;

import java.util.Scanner;

public class Main {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);
		System.out.println("Enter a number in [10 30]: ");
		int item = sc.nextInt();

		try {
			if (item < 10 || item > 30) {
				throw new Exception("The value is not in the allowed interval ");
			}
			System.out.println(item);
		}

		catch (Exception e) {
			System.out.println(e.getMessage());
		

		}

	}

}
