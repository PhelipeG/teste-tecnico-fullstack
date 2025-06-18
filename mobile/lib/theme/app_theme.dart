import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData get light {
    return ThemeData(
      primaryColor: const Color(0xFF2563EB), // Azul
      scaffoldBackgroundColor: Colors.white,
      appBarTheme: const AppBarTheme(
        backgroundColor: Color(0xFF2563EB),
        foregroundColor: Colors.white,
        elevation: 1,
      ),
      colorScheme: ColorScheme.light(
        primary: const Color(0xFF2563EB), // Azul
        secondary: const Color(0xFF22C55E), // Verde
        error: const Color(0xFFEF4444),
        surface: const Color(0xFFF1F5F9), // Cinza claro
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onError: Colors.white,
        onSurface: Colors.black,
      ),
      cardColor: Colors.white,
      iconTheme: const IconThemeData(color: Color(0xFF64748B)), // Cinza
      textTheme: const TextTheme(
        bodyLarge: TextStyle(color: Color(0xFF1E293B)), // Cinza escuro
        bodyMedium: TextStyle(color: Color(0xFF334155)),
        titleLarge: TextStyle(
          color: Color(0xFF2563EB),
          fontWeight: FontWeight.bold,
        ),
      ),
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: Color(0xFF22C55E), // Verde
        foregroundColor: Colors.white,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF2563EB), // Azul
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
      ),
    );
  }
}
