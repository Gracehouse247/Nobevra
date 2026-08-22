import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:screenshot/screenshot.dart';
import 'package:path_provider/path_provider.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:noble_invoice/features/brand/controllers/brand_controller.dart';
import 'package:noble_invoice/features/profile/models/profile_model.dart';
import 'package:noble_invoice/features/business_card/models/business_card_model.dart';
import 'package:noble_invoice/features/business_card/widgets/business_card_templates.dart';

class BusinessCardExportService {
  static final ScreenshotController _screenshotController = ScreenshotController();

  /// Exports the business card to a high-resolution print-ready PDF
  /// Returns the File object of the generated PDF.
  static Future<File> exportToPdf({
    required BuildContext context,
    required BusinessCardTemplate template,
    required BrandKit kit,
    required UserProfile profile,
    required BusinessCardFormat format,
    String? teamName,
  }) async {
    // 1. Calculate print dimensions (300 DPI)
    // 1 inch = 300 pixels at 300 DPI
    const double dpi = 300;
    final double widthPx = format.width * dpi;
    final double heightPx = format.height * dpi;

    // 2. Build Flutter widget versions wrapped in a standardized container
    // We render them at a high logical size to ensure sharp image output
    final frontWidget = Directionality(
      textDirection: TextDirection.ltr,
      child: Container(
        width: widthPx,
        height: heightPx,
        color: Colors.white,
        child: Theme(
          data: ThemeData.light(),
          child: template.buildFront(context, kit, profile),
        ),
      ),
    );

    final backWidget = Directionality(
      textDirection: TextDirection.ltr,
      child: Container(
        width: widthPx,
        height: heightPx,
        color: Colors.white,
        child: Theme(
          data: ThemeData.light(),
          child: template.buildBack(context, kit, teamName ?? 'Noble Ventures'),
        ),
      ),
    );

    // 3. Capture high-res images
    // Wait slightly to ensure any network images or fonts are loaded before capture
    await Future.delayed(const Duration(milliseconds: 100));
    
    final Uint8List frontImageBytes = await _screenshotController.captureFromWidget(
      frontWidget,
      delay: const Duration(milliseconds: 100),
       // We do not scale pixel ratio up further because we already scaled the container size to 300 DPI equivalent.
    );
    
    final Uint8List backImageBytes = await _screenshotController.captureFromWidget(
      backWidget,
      delay: const Duration(milliseconds: 100),
    );

    // 4. Generate PDF
    final pdf = pw.Document(
      title: 'Business Card - ${profile.displayName ?? "Nobevra"}',
      author: profile.displayName ?? 'Nobevra',
      creator: 'Nobevra',
      producer: 'Nobevra Card Engine',
    );
    
    // PDF page size in points (72 points per inch)
    final pdfPageFormat = PdfPageFormat(format.width * 72.0, format.height * 72.0, marginAll: 0);

    // Add Front
    pdf.addPage(
      pw.Page(
        pageFormat: pdfPageFormat,
        build: (pw.Context context) {
          return pw.FullPage(
            ignoreMargins: true,
            child: pw.Image(pw.MemoryImage(frontImageBytes), fit: pw.BoxFit.cover),
          );
        },
      ),
    );

    // Add Back
    pdf.addPage(
      pw.Page(
        pageFormat: pdfPageFormat,
        build: (pw.Context context) {
          return pw.FullPage(
            ignoreMargins: true,
            child: pw.Image(pw.MemoryImage(backImageBytes), fit: pw.BoxFit.cover),
          );
        },
      ),
    );

    // 5. Save locally
    final tempDir = await getTemporaryDirectory();
    final filename = 'BusinessCard_${(profile.displayName ?? 'User').replaceAll(' ', '_')}.pdf';
    final file = File('${tempDir.path}/$filename');
    
    await file.writeAsBytes(await pdf.save());
    return file;
  }
}
