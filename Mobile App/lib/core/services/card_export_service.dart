// lib/core/services/card_export_service.dart
import 'dart:io';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:path_provider/path_provider.dart';
import 'package:noble_invoice/features/business_card/models/business_card_model.dart';
import 'package:noble_invoice/features/brand/controllers/brand_controller.dart';
import 'package:noble_invoice/features/profile/models/profile_model.dart';

class CardExportService {
  static const double _dpi = 72.0;

  static Future<File> generateCardPdf({
    required BusinessCard card,
    required BrandKit brand,
    required UserProfile profile,
    required String teamName,
  }) async {
    final pdf = pw.Document(
      title: '${profile.displayName ?? "Business Card"} - Nobevra',
      author: profile.displayName ?? 'Nobevra',
      creator: 'Nobevra',
      producer: 'Nobevra Card Engine',
    );

    // Convert inches to points
    final width = card.format.width * _dpi;
    final height = card.format.height * _dpi;
    final pageFormat = PdfPageFormat(width, height, marginAll: 0);

    // Color conversion
    final primaryColor = PdfColor.fromInt(brand.primaryColor.value);
    final secondaryColor = PdfColor.fromInt(brand.secondaryColor.value);

    // Front Side
    pdf.addPage(
      pw.Page(
        pageFormat: pageFormat,
        build: (pw.Context context) {
          return pw.FullPage(
            ignoreMargins: true,
            child: pw.Container(
              color: PdfColors.white,
              padding: const pw.EdgeInsets.all(24),
              child: pw.Column(
                crossAxisAlignment: pw.CrossAxisAlignment.start,
                children: [
                  pw.Spacer(),
                  pw.Text(
                    profile.displayName?.toUpperCase() ?? 'YOUR NAME',
                    style: pw.TextStyle(fontSize: 18, fontWeight: pw.FontWeight.bold, color: PdfColors.black),
                  ),
                  pw.Text(
                    'DESIGN DIRECTOR',
                    style: const pw.TextStyle(fontSize: 10, color: PdfColors.grey700),
                  ),
                  pw.SizedBox(height: 12),
                  pw.Container(width: 30, height: 2, color: primaryColor),
                  pw.Spacer(),
                  pw.Row(
                    mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                    children: [
                      pw.Column(
                        crossAxisAlignment: pw.CrossAxisAlignment.start,
                        children: [
                          _buildInfoLine(PdfColors.grey700, 'T: ${profile.phone ?? profile.businessPhone ?? "+234 81 0000 0000"}'),
                          _buildInfoLine(PdfColors.grey700, 'W: www.nobevra.com'),
                        ],
                      ),
                      pw.Container(
                        width: 30, height: 30,
                        color: primaryColor,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );

    // Back Side
    pdf.addPage(
      pw.Page(
        pageFormat: pageFormat,
        build: (pw.Context context) {
          return pw.FullPage(
            ignoreMargins: true,
            child: pw.Container(
              color: secondaryColor,
              child: pw.Center(
                child: pw.Column(
                  mainAxisAlignment: pw.MainAxisAlignment.center,
                  children: [
                    pw.Container(
                      width: 40, height: 40,
                      decoration: const pw.BoxDecoration(color: PdfColors.white),
                    ),
                    pw.SizedBox(height: 12),
                    pw.Text(
                      teamName.toUpperCase(),
                      style: pw.TextStyle(color: PdfColors.white, fontSize: 16, fontWeight: pw.FontWeight.bold),
                    ),
                    pw.Text(
                      'EST. 2026',
                      style: const pw.TextStyle(color: PdfColors.white, fontSize: 8, letterSpacing: 2),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );

    final output = await getTemporaryDirectory();
    final file = File("${output.path}/Business_Card_${DateTime.now().millisecondsSinceEpoch}.pdf");
    await file.writeAsBytes(await pdf.save());
    return file;
  }

  static pw.Widget _buildInfoLine(PdfColor color, String text) {
    return pw.Padding(
      padding: const pw.EdgeInsets.only(bottom: 2),
      child: pw.Text(text, style: pw.TextStyle(fontSize: 8, color: color)),
    );
  }
}
