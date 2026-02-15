package org.example.librarymanagementsystem.util;

import java.security.SecureRandom;

public class PasswordGenerator {

    private static final String CHAR_POOL =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";

    private static final SecureRandom random = new SecureRandom();

    public static String generatePassword(int length) {

        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(CHAR_POOL.length());
            password.append(CHAR_POOL.charAt(index));
        }

        return password.toString();
    }
}
