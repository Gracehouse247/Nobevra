// lib/features/invoicing/widgets/client_details_sheets.dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/clients/controllers/client_crm_controller.dart';
import 'package:noble_invoice/features/clients/models/crm_models.dart';

/// All bottom sheet modals for ClientDetailsScreen, extracted for modularity.
class ClientDetailsSheets {
  ClientDetailsSheets._();

  // ── Add Note ─────────────────────────────────────────────────────────────────
  static void showAddNote({
    required BuildContext context,
    required int clientId,
    required ClientCrmController crm,
  }) {
    final ctrl = TextEditingController();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) => Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(ctx).viewInsets.bottom),
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('Add Note', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
            const SizedBox(height: 16),
            TextField(controller: ctrl, autofocus: true, maxLines: 4, decoration: InputDecoration(hintText: 'Write your note here...', filled: true, fillColor: Colors.grey.shade50, border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none))),
            const SizedBox(height: 16),
            SizedBox(width: double.infinity, height: 52, child: ElevatedButton(
              onPressed: () async {
                if (ctrl.text.trim().isEmpty) return;
                await crm.addNote(clientId, ctrl.text.trim());
                if (ctx.mounted) Navigator.pop(ctx);
              },
              style: ElevatedButton.styleFrom(backgroundColor: AppColors.primaryDark, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)), elevation: 0),
              child: const Text('Save Note', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
            )),
          ]),
        ),
      ),
    );
  }

  // ── Log Activity ──────────────────────────────────────────────────────────────
  static void showLogActivity({
    required BuildContext context,
    required int clientId,
    required ClientCrmController crm,
  }) {
    String selectedType = 'call';
    final ctrl = TextEditingController();
    final types = [
      {'key': 'call',     'label': 'Call',     'icon': Icons.phone_rounded},
      {'key': 'meeting',  'label': 'Meeting',  'icon': Icons.handshake_rounded},
      {'key': 'whatsapp', 'label': 'WhatsApp', 'icon': Icons.chat_rounded},
      {'key': 'email',    'label': 'Email',    'icon': Icons.email_rounded},
    ];

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(32))),
      builder: (ctx) => StatefulBuilder(builder: (ctx, setSheetState) => Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(ctx).viewInsets.bottom),
        child: Container(
          padding: const EdgeInsets.fromLTRB(24, 12, 24, 32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40, height: 4,
                  margin: const EdgeInsets.only(bottom: 24),
                  decoration: BoxDecoration(color: AppColors.lightGrey, borderRadius: BorderRadius.circular(2)),
                ),
              ),
              const Text(
                'Log Communication',
                style: TextStyle(fontWeight: FontWeight.w900, fontSize: 22, letterSpacing: -0.5),
              ),
              const SizedBox(height: 8),
              Text(
                'Keep your client timeline accurate by logging this interaction.',
                style: TextStyle(color: AppColors.darkGrey.withOpacity(0.6), fontSize: 13),
              ),
              const SizedBox(height: 32),
              
              const Text('ACTIVITY TYPE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: AppColors.darkGrey, letterSpacing: 1.0)),
              const SizedBox(height: 12),
              Row(
                children: types.map((t) {
                  final isSelected = selectedType == t['key'];
                  return Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: GestureDetector(
                        onTap: () => setSheetState(() => selectedType = t['key'] as String),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 300),
                          curve: Curves.easeOutCubic,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          decoration: BoxDecoration(
                            color: isSelected ? AppColors.primary : Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: isSelected ? AppColors.primary : AppColors.lightGrey.withOpacity(0.5),
                              width: 1.5,
                            ),
                            boxShadow: isSelected ? [
                              BoxShadow(color: AppColors.primary.withOpacity(0.3), blurRadius: 12, offset: const Offset(0, 4))
                            ] : [],
                          ),
                          child: Column(
                            children: [
                              Icon(
                                t['icon'] as IconData,
                                color: isSelected ? Colors.white : AppColors.primary,
                                size: 24,
                              ),
                              const SizedBox(height: 8),
                              Text(
                                t['label'] as String,
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w800,
                                  color: isSelected ? Colors.white : AppColors.textBlack,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
              
              const SizedBox(height: 32),
              const Text('SUMMARY', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: AppColors.darkGrey, letterSpacing: 1.0)),
              const SizedBox(height: 12),
              TextField(
                controller: ctrl,
                maxLines: 3,
                decoration: InputDecoration(
                  hintText: 'e.g. Discussed the Q3 project timeline...',
                  hintStyle: TextStyle(color: AppColors.darkGrey.withOpacity(0.3), fontSize: 14),
                  filled: true,
                  fillColor: const Color(0xFFF8FAFC),
                  contentPadding: const EdgeInsets.all(20),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(20),
                    borderSide: BorderSide(color: AppColors.lightGrey.withOpacity(0.3)),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(20),
                    borderSide: const BorderSide(color: AppColors.primary, width: 1.5),
                  ),
                ),
              ),
              const SizedBox(height: 32),
              
              SizedBox(
                width: double.infinity,
                height: 60,
                child: ElevatedButton(
                  onPressed: () async {
                    HapticFeedback.mediumImpact();
                    await crm.addCommunicationLog(clientId, selectedType, ctrl.text.trim());
                    if (ctx.mounted) Navigator.pop(ctx);
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    elevation: 0,
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.history_edu_rounded, size: 20),
                      SizedBox(width: 12),
                      Text('Log Activity', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16)),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      )),
    );
  }

  // ── Status Picker ─────────────────────────────────────────────────────────────
  static void showStatusPicker({
    required BuildContext context,
    required int clientId,
    required LeadStatus currentStatus,
    required ClientCrmController crm,
    required void Function(String) onStatusChanged,
  }) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(24),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          const Text('Update Status', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
          const SizedBox(height: 16),
          ...LeadStatus.values.map((s) => ListTile(
            leading: Text(s.emoji, style: const TextStyle(fontSize: 20)),
            title: Text(s.label, style: const TextStyle(fontWeight: FontWeight.bold)),
            trailing: currentStatus == s ? const Icon(Icons.check_circle_rounded, color: AppColors.primary) : null,
            onTap: () async {
              Navigator.pop(ctx);
              await crm.updateLeadStatus(clientId, s);
              onStatusChanged(s.name);
            },
          )),
        ]),
      ),
    );
  }

  // ── Options Menu ──────────────────────────────────────────────────────────────
  static void showOptions({
    required BuildContext context,
    required String clientEmail,
  }) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) => Column(mainAxisSize: MainAxisSize.min, children: [
        const SizedBox(height: 12),
        ListTile(
          leading: const Icon(Icons.copy_rounded, color: AppColors.primary),
          title: const Text('Copy Email'),
          onTap: () {
            Clipboard.setData(ClipboardData(text: clientEmail));
            Navigator.pop(ctx);
            ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Email copied')));
          },
        ),
        const SizedBox(height: 8),
      ]),
    );
  }
}
