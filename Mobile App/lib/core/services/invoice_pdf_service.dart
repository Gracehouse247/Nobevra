// lib/core/services/invoice_pdf_service.dart
import 'dart:io';
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:path_provider/path_provider.dart';
import 'package:open_file/open_file.dart';
import 'package:share_plus/share_plus.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
import 'package:noble_invoice/features/invoicing/models/pdf_template.dart';
import 'package:noble_invoice/features/invoicing/models/business_info.dart';
import 'package:noble_invoice/core/services/pdf/pdf_widgets.dart';

// Template Modular Batches
import 'package:noble_invoice/core/services/pdf/templates/business_templates.dart';
import 'package:noble_invoice/core/services/pdf/templates/foundation_batch_1.dart';
import 'package:noble_invoice/core/services/pdf/templates/foundation_batch_2.dart';
import 'package:noble_invoice/core/services/pdf/templates/platinum_batch_1.dart';
import 'package:noble_invoice/core/services/pdf/templates/platinum_batch_2.dart';
import 'package:noble_invoice/core/services/pdf/templates/platinum_batch_3_a.dart';
import 'package:noble_invoice/core/services/pdf/templates/platinum_batch_3_b.dart';
import 'package:noble_invoice/core/services/pdf/templates/platinum_batch_4_a.dart';
import 'package:noble_invoice/core/services/pdf/templates/platinum_batch_4_b.dart';
import 'package:noble_invoice/core/services/pdf/templates/platinum_batch_5_a.dart';
import 'package:noble_invoice/core/services/pdf/templates/platinum_batch_5_b.dart';
import 'package:noble_invoice/core/services/pdf/templates/platinum_batch_6_a.dart';
import 'package:noble_invoice/core/services/pdf/templates/platinum_batch_6_b.dart';
import 'package:noble_invoice/core/services/pdf/templates/platinum_batch_6_c.dart';
import 'package:noble_invoice/core/services/pdf/templates/classic_pdf_templates.dart';
import 'package:noble_invoice/core/services/pdf/templates/premium_simple_batch.dart';
import 'package:noble_invoice/core/services/pdf/templates/creative_batch.dart';

class InvoicePdfService {
  static Future<void> generateAndOpen(Invoice invoice, {PdfTemplate? template, BusinessInfo? business}) async {
    final bytes = await generateBytes(invoice, template: template, business: business);
    final file  = await _saveToTemp(invoice.id, bytes);
    await OpenFile.open(file.path);
  }

  static Future<void> generateAndShare(Invoice invoice, {PdfTemplate? template, BusinessInfo? business}) async {
    final bytes = await generateBytes(invoice, template: template, business: business);
    final file  = await _saveToTemp(invoice.id, bytes);
    await SharePlus.instance.share(
      ShareParams(files: [XFile(file.path)], text: 'Invoice ${invoice.id} from ${business?.name ?? "Nobevra"}'),
    );
  }

  static Future<Uint8List> generateBytes(Invoice invoice, {PdfTemplate? template, BusinessInfo? business}) async {
    final biz    = business ?? BusinessInfo.placeholder();
    
    // Fallback logic for Template
    PdfTemplate selectedTemplate = template ?? PdfTemplate.modern;
    if (template == null && biz.defaultTemplate != null) {
      try {
        selectedTemplate = PdfTemplate.values.firstWhere((t) => t.name == biz.defaultTemplate);
      } catch (_) {}
    }

    final doc = pw.Document(
      title: 'Invoice #${invoice.id} - ${biz.name}',
      author: biz.name.isNotEmpty ? biz.name : 'Nobevra',
      creator: 'Nobevra',
      producer: 'Nobevra PDF Engine',
      subject: 'Commercial Invoice #${invoice.id}',
    );
    final font      = await PdfWidgets.loadFont('Roboto-Regular.ttf');
    final bold      = await PdfWidgets.loadFont('Roboto-Bold.ttf');

    Uint8List? logoBytes = biz.logoUrl != null ? await _fetchUrl(biz.logoUrl!) : null;

    // Automated Global Signature Injection
    Invoice finalInvoice = invoice;
    if (invoice.metadata['signature'] == null && biz.signatureUrl != null) {
      final sigBytes = await _fetchUrl(biz.signatureUrl!);
      if (sigBytes != null) {
        final newMeta = Map<String, dynamic>.from(invoice.metadata);
        newMeta['signature'] = 'data:image/png;base64,${base64Encode(sigBytes)}';
        newMeta['signature_source'] = 'business_profile';
        finalInvoice = invoice.copyWith(metadata: newMeta);
      }
    }

    final pageWidget = await _buildPage(finalInvoice, biz, selectedTemplate, font, bold, logoBytes);
    doc.addPage(pw.Page(
      pageFormat: PdfPageFormat.a4,
      margin: const pw.EdgeInsets.all(0), // Templates handle their own padding
      build: (pw.Context ctx) => pageWidget,
    ));

    return doc.save();
  }

  static Future<Uint8List?> _fetchUrl(String url) async {
    if (url.isEmpty) return null;
    try {
      final response = await HttpClient().getUrl(Uri.parse(url))
          .then((req) => req.close())
          .then((res) => res.expand((b) => b).toList());
      return Uint8List.fromList(response);
    } catch (e) {
      debugPrint('Error fetching branding asset ($url): $e');
      return null;
    }
  }
  static Future<pw.Widget> _buildPage(Invoice invoice, BusinessInfo biz, PdfTemplate template, pw.Font font, pw.Font bold, Uint8List? logoBytes) async {
    // Robust hex color parsing to prevent radix-16 errors
    String cleanHex = biz.brandColor.replaceAll('#', '').replaceAll('0x', '');
    if (cleanHex.length == 6) cleanHex = 'FF$cleanHex';
    final brandColor = PdfColor.fromInt(int.tryParse(cleanHex, radix: 16) ?? 0xFF2563EB);

    if (template.name.startsWith('classic') && template != PdfTemplate.classic) {
      return ClassicPdfTemplates.build(template, invoice, biz, font, bold, brandColor, logoBytes);
    }

    if (template.name.startsWith('creative') && template != PdfTemplate.creativeBold) {
      return await CreativeBatch.buildAsync(template, invoice, biz, font, bold, brandColor, logoBytes);
    }

    switch (template) {
      // Essentials
      case PdfTemplate.classic:           return FoundationBatch1.modernTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.modern:            return FoundationBatch1.modernTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.minimal:           return FoundationBatch1.minimalTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.bold:              return FoundationBatch2.boldTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.minimalistAlpha:    return FoundationBatch2.minimalistAlphaTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.enterpriseStandard: return FoundationBatch2.enterpriseStandardTemplate(invoice, biz, font, bold, brandColor, logoBytes);

      // Business Class
      case PdfTemplate.creativeBold:      return BusinessTemplates.creativeBoldTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.modernCurve:       return FoundationBatch1.modernCurveTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.waveCorporate:     return FoundationBatch1.waveCorporateTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.geometricBlue:     return FoundationBatch2.geometricBlueTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.boldClassic:       return FoundationBatch2.boldClassicTemplate(invoice, biz, font, bold, brandColor, logoBytes);

      // Platinum Collection — Batch 1
      case PdfTemplate.platinumSky:       return PlatinumBatch1.platinumSkyTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumRed:       return PlatinumBatch1.platinumRedTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumBlue:      return PlatinumBatch1.platinumBlueTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumPurple:    return PlatinumBatch1.platinumPurpleTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumDark:      return PlatinumBatch1.platinumDarkTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumNobleBlue: return PlatinumBatch1.platinumNobleBlueTemplate(invoice, biz, font, bold, brandColor, logoBytes);

      // Platinum Collection — Batch 2
      case PdfTemplate.platinumOrganicAmethyst: return PlatinumBatch2.platinumOrganicAmethystTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumSlateExecutive: return PlatinumBatch2.platinumSlateExecutiveTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumScarletSwoosh:   return PlatinumBatch2.platinumScarletSwooshTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumGeometricAzure: return PlatinumBatch2.platinumGeometricAzureTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumPaucek:          return PlatinumBatch2.platinumPaucekTemplate(invoice, biz, font, bold, brandColor, logoBytes);

      // Platinum Collection — Batch 3
      case PdfTemplate.platinumTimmerman:       return PlatinumBatch3A.platinumTimmermanTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumVerticalSidebar: return PlatinumBatch3A.platinumVerticalSidebarTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumIngoude:         return PlatinumBatch3A.platinumIngoudeTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumAlves:           return PlatinumBatch3B.platinumAlvesTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumLaranaOrange:    return PlatinumBatch3B.platinumLaranaOrangeTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumBorcelleBlue:     return PlatinumBatch3B.platinumBorcelleBlueTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumSalfordTeal:      return PlatinumBatch3B.platinumSalfordTealTemplate(invoice, biz, font, bold, brandColor, logoBytes);

      // Platinum Collection — Batch 4
      case PdfTemplate.platinumFaugetDark:       return PlatinumBatch4A.platinumFaugetDarkTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumWarnerSpencerBeige: return PlatinumBatch4A.platinumWarnerSpencerBeigeTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumBorcelleGold:     return PlatinumBatch4A.platinumBorcelleGoldTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumFaugetSteak:      return PlatinumBatch4B.platinumFaugetSteakTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumShodweGreen:      return PlatinumBatch4B.platinumShodweGreenTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumLiceriaBlue:      return PlatinumBatch4B.platinumLiceriaBlueTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumBorcelleCircle:    return PlatinumBatch4B.platinumBorcelleCircleTemplate(invoice, biz, font, bold, brandColor, logoBytes);

      // Platinum Collection — Batch 5
      case PdfTemplate.platinumYellowLotus:      return PlatinumBatch5A.platinumYellowLotusTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumBlueSkyline:      return PlatinumBatch5A.platinumBlueSkylineTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumTealBlobs:        return PlatinumBatch5A.platinumTealBlobsTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumWarnerCopper:     return PlatinumBatch5B.platinumWarnerCopperTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumBorcelleModern:   return PlatinumBatch5B.platinumBorcelleModernTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumLaranaStudio:     return PlatinumBatch5B.platinumLaranaStudioTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumSalfordGreen:     return PlatinumBatch5B.platinumSalfordGreenTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumFaugetAgencyDark: return PlatinumBatch5B.platinumFaugetAgencyDarkTemplate(invoice, biz, font, bold, brandColor, logoBytes);

      // Platinum Collection — Batch 6
      case PdfTemplate.platinumMollyScript:      return PlatinumBatch6A.platinumMollyScriptTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumSalfordGeometric: return PlatinumBatch6A.platinumSalfordGeometricTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumFaugetRestaurant: return PlatinumBatch6A.platinumFaugetRestaurantTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumArowwaiNavy:      return PlatinumBatch6B.platinumArowwaiNavyTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumBoldDesign:       return PlatinumBatch6B.platinumBoldDesignTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumTSCompany:        return PlatinumBatch6B.platinumTSCompanyTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumChadGibbons:      return PlatinumBatch6C.platinumChadGibbonsTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumShodweWindow:     return PlatinumBatch6C.platinumShodweWindowTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumBorcelleFlower:    return PlatinumBatch6C.platinumBorcelleFlowerTemplate(invoice, biz, font, bold, brandColor, logoBytes);
      case PdfTemplate.platinumMauveMinimalist:   return PlatinumBatch6C.platinumMauveMinimalistTemplate(invoice, biz, font, bold, brandColor, logoBytes);

      // Premium Simple Batch
      case PdfTemplate.simpleDiamond:
      case PdfTemplate.simpleBlobs:
      case PdfTemplate.simpleMetallic:
      case PdfTemplate.simpleGeometric:
      case PdfTemplate.simpleAngled:
      case PdfTemplate.simpleWave:
      case PdfTemplate.simpleModern:
      case PdfTemplate.simpleImmersive:
      case PdfTemplate.simplePillTotal:
      case PdfTemplate.simpleArrowLabel:
      case PdfTemplate.simpleCleanGrid:
      case PdfTemplate.simpleMinimalist:
        return PremiumSimpleBatch.build(template, invoice, biz, font, bold, brandColor, logoBytes);

      default:
        return FoundationBatch1.modernTemplate(invoice, biz, font, bold, brandColor, logoBytes);

    }
  }

  static Future<File> _saveToTemp(String invoiceId, Uint8List bytes) async {
    final dir = await getTemporaryDirectory();
    final sanitizedId = invoiceId.replaceAll(RegExp(r'[^\w\-]'), '_');
    final file = File('${dir.path}/Invoice_$sanitizedId.pdf');
    await file.writeAsBytes(bytes);
    return file;
  }
}
