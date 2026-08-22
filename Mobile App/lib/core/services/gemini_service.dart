import 'dart:io';
import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:noble_invoice/core/constants/env_constants.dart';

class GeminiService {
  GeminiService._();
  static final GeminiService instance = GeminiService._();

  late final GenerativeModel _model;
  late final GenerativeModel _visionModel;

  void init() {
    _model = GenerativeModel(
      model: 'gemini-1.5-flash',
      apiKey: EnvConstants.geminiApiKey,
    );
    _visionModel = GenerativeModel(
      model: 'gemini-1.5-flash',
      apiKey: EnvConstants.geminiApiKey,
    );
  }

  Future<String> generateText(String prompt) async {
    final content = [Content.text(prompt)];
    final response = await _model.generateContent(content);
    return response.text ?? 'No response from AI.';
  }

  Future<String> analyzeImage(File imageFile, String prompt) async {
    final bytes = await imageFile.readAsBytes();
    final content = [
      Content.multi([
        TextPart(prompt),
        DataPart('image/jpeg', bytes),
      ])
    ];
    final response = await _visionModel.generateContent(content);
    return response.text ?? 'No response from AI.';
  }

  /// Specialized method for Agentic actions
  Future<String> processAgentCommand(String command, String context) async {
    final prompt = '''
You are the Nobevra AI Assistant. You help users manage their business, invoices, and CRM.
Context: $context
User Command: $command

If the user wants to create an invoice, extract: client name, amount, items, and date.
If the user wants to update a lead, extract: lead name and status.
If the user wants to send a reminder, extract: client name.

Return a JSON-like string (but readable) with the "action" and "data" extracted.
Example: {"action": "CREATE_INVOICE", "data": {"client": "John Doe", "amount": 500}}
''';
    return generateText(prompt);
  }
}
