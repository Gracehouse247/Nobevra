import 'dart:io';
import 'dart:convert';
import 'package:noble_invoice/core/services/supabase_service.dart';

class OcrService {
  OcrService._();
  static final OcrService instance = OcrService._();

  Future<Map<String, dynamic>> parseReceipt(File imageFile) async {
    try {
      final bytes = await imageFile.readAsBytes();
      final base64Image = base64Encode(bytes);

      final response = await SupabaseService.client.functions.invoke(
        'scan-receipt',
        body: {
          'imageBase64': base64Image,
          'mimeType': 'image/jpeg', // Defaulting to jpeg for simplicity
        },
      );

      if (response.status != 200) {
        throw Exception(response.data['error'] ?? 'Failed to scan receipt');
      }

      final data = response.data['data'] as Map<String, dynamic>;
      
      return {
        'amount': data['amount'],
        'date': data['expense_date'] != null ? DateTime.tryParse(data['expense_date']) : null,
        'merchant': data['vendor'],
        'rawText': 'Parsed via Nobevra AI',
      };
    } catch (e) {
      print('OCR Service Error: $e');
      throw Exception('Failed to analyze receipt. Please try again.');
    }
  }

  void dispose() {
    // No longer need to close MLKit
  }
}
