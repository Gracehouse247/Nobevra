import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/features/clients/controllers/client_crm_controller.dart';
import 'package:noble_invoice/features/invoicing/models/client_model.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:noble_invoice/features/profile/controllers/team_controller.dart';
import 'package:flutter_contacts/flutter_contacts.dart';
import 'package:permission_handler/permission_handler.dart';

class CountryCode {
  final String flag;
  final String name;
  final String code;
  const CountryCode(this.flag, this.name, this.code);
}

class AddClientController extends ChangeNotifier {
  final Client? existingClient;
  
  final formKey             = GlobalKey<FormState>();
  final nameController      = TextEditingController();
  final emailController     = TextEditingController();
  final businessController  = TextEditingController();
  final phoneController     = TextEditingController();
  final addressController   = TextEditingController();

  static const List<CountryCode> countryCodes = [
    CountryCode('????', 'Nigeria',        '+234'),
    CountryCode('????', 'United Kingdom', '+44'),
    CountryCode('????', 'United States',  '+1'),
    CountryCode('????', 'Ghana',          '+233'),
    CountryCode('????', 'South Africa',   '+27'),
    CountryCode('????', 'Kenya',          '+254'),
    CountryCode('????', 'Canada',         '+1'),
    CountryCode('????', 'Australia',      '+61'),
    CountryCode('????', 'UAE',            '+971'),
    CountryCode('????', 'India',          '+91'),
    CountryCode('????', 'Germany',        '+49'),
    CountryCode('????', 'France',         '+33'),
    CountryCode('????', 'Zambia',         '+260'),
    CountryCode('????', 'Rwanda',         '+250'),
    CountryCode('????', 'Tanzania',       '+255'),
    CountryCode('????', 'Uganda',         '+256'),
    CountryCode('????', 'Senegal',        '+221'),
    CountryCode('????', 'Ivory Coast',    '+225'),
    CountryCode('????', 'Cameroon',       '+237'),
    CountryCode('????', 'Egypt',          '+20'),
    CountryCode('????', 'Ethiopia',       '+251'),
    CountryCode('????', 'Morocco',        '+212'),
    CountryCode('????', 'New Zealand',   '+64'),
    CountryCode('????', 'Pakistan',       '+92'),
    CountryCode('????', 'Saudi Arabia',   '+966'),
    CountryCode('????', 'Singapore',      '+65'),
    CountryCode('????', 'Sri Lanka',      '+94'),
    CountryCode('????', 'Tunisia',        '+216'),
    CountryCode('????', 'Turkey',         '+90'),
    CountryCode('????', 'Vietnam',        '+84'),
    CountryCode('????', 'Malaysia',       '+60'),
    CountryCode('????', 'Ireland',        '+353'),
    CountryCode('????', 'Netherlands',    '+31'),
    CountryCode('????', 'Belgium',        '+32'),
    CountryCode('????', 'Sweden',         '+46'),
    CountryCode('????', 'Switzerland',    '+41'),
    CountryCode('????', 'Spain',          '+34'),
    CountryCode('????', 'Italy',          '+39'),
    CountryCode('????', 'Portugal',       '+351'),
    CountryCode('????', 'Brazil',         '+55'),
    CountryCode('????', 'Mexico',         '+52'),
    CountryCode('????', 'Argentina',      '+54'),
    CountryCode('????', 'Chile',          '+56'),
    CountryCode('????', 'Colombia',       '+57'),
    CountryCode('????', 'Peru',           '+51'),
  ];

  static const List<String> positions = [
    'CEO', 'Co-founder', 'Managing Director', 'Director',
    'General Manager', 'Manager', 'Team Lead', 'Supervisor',
    'Senior Executive', 'Executive', 'Consultant', 'Partner',
    'Owner', 'Procurement Officer', 'Account Manager', 'Other',
  ];

  late CountryCode selectedCountry;
  String? selectedPosition;
  bool isSubmitting = false;
  String? inlineError;

  bool get isEditing => existingClient != null;

  AddClientController({this.existingClient}) {
    selectedCountry = countryCodes.first;
    
    final e = existingClient;
    if (e != null) {
      nameController.text     = e.name;
      emailController.text    = e.email;
      businessController.text = e.businessName ?? '';
      phoneController.text    = e.phone ?? '';
      addressController.text  = e.address ?? '';
      selectedPosition        = e.position;
      
      if (e.countryCode != null) {
        selectedCountry = countryCodes.firstWhere(
          (c) => c.code == e.countryCode,
          orElse: () => countryCodes.first,
        );
      }
    }
  }

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    businessController.dispose();
    phoneController.dispose();
    addressController.dispose();
    super.dispose();
  }

  void setCountry(CountryCode code) {
    selectedCountry = code;
    notifyListeners();
  }

  void setPosition(String? position) {
    selectedPosition = position;
    notifyListeners();
  }

  void _showSnack(BuildContext context, String msg, {bool isError = true, SnackBarAction? action}) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text(msg),
      backgroundColor: isError ? Colors.red.shade700 : Colors.green.shade700,
      behavior: SnackBarBehavior.floating,
      margin: const EdgeInsets.all(16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      action: action,
    ));
  }

  Future<void> submit(BuildContext context, {bool redirectToInvoice = false, required VoidCallback onUpgradePrompt}) async {
    FocusScope.of(context).unfocus();
    if (!formKey.currentState!.validate()) return;

    isSubmitting = true;
    inlineError = null;
    notifyListeners();

    final crm = context.read<ClientCrmController>();
    final team = context.read<TeamController>();

    if (crm.activeTeamId == null && team.activeTeamId != null) {
      crm.setActiveTeamId(team.activeTeamId);
    }

    if (crm.activeTeamId == null) {
      isSubmitting = false;
      inlineError = 'Your business session is not active. Please go back and re-select your business.';
      notifyListeners();
      return;
    }

    final client = Client(
      id:           existingClient?.id ?? 0,
      name:         nameController.text.trim(),
      email:        emailController.text.trim(),
      businessName: businessController.text.trim(),
      country:      selectedCountry.name,
      countryCode:  selectedCountry.code,
      phone:        phoneController.text.trim(),
      address:      addressController.text.trim(),
      position:     selectedPosition,
      leadStatus:   existingClient?.leadStatus ?? 'active',
    );

    final sub = context.read<SubscriptionController>();

    final bool success;
    if (isEditing) {
      success = await crm.updateClient(client, sub);
    } else {
      success = await crm.addClient(client, sub);
    }

    isSubmitting = false;
    notifyListeners();

    if (success) {
      final saved = isEditing ? client : (crm.clients.isNotEmpty ? crm.clients.last : client);
      Navigator.pop(context, saved);
      _showSnack(context, isEditing ? '? Client updated!' : '? Client saved successfully!', isError: false);
      
      if (redirectToInvoice) {
        Future.delayed(const Duration(milliseconds: 100), () {
          Navigator.pushNamed(context, '/create-invoice', arguments: saved);
        });
      }
    } else {
      if (crm.error.contains('SUBSCRIPTION_LIMIT')) {
        onUpgradePrompt();
      } else {
        inlineError = crm.error.isNotEmpty ? crm.error : 'Failed to save client';
        _showSnack(context, inlineError!);
        notifyListeners();
      }
    }
  }

  Future<void> importFromContacts(BuildContext context) async {
    try {
      var status = await Permission.contacts.status;
      if (status.isDenied) {
        status = await Permission.contacts.request();
      }

      if (status.isPermanentlyDenied) {
        _showSnack(context, 'Contacts permission is required. Please enable it in Settings.', 
          action: SnackBarAction(label: 'Settings', onPressed: () => openAppSettings()));
        return;
      }

      if (!status.isGranted) {
        _showSnack(context, 'Access to contacts was denied.');
        return;
      }

      final contact = await FlutterContacts.openExternalPick();
      
      if (contact != null) {
        final fullContact = await FlutterContacts.getContact(contact.id);
        if (fullContact == null) return;

        nameController.text = fullContact.displayName;
        
        if (fullContact.emails.isNotEmpty) {
          emailController.text = fullContact.emails.first.address;
        }
        
        if (fullContact.phones.isNotEmpty) {
          String rawPhone = fullContact.phones.first.number.replaceAll(RegExp(r'[^0-9+]'), '');
          
          if (rawPhone.startsWith('+')) {
            for (var c in countryCodes) {
              if (rawPhone.startsWith(c.code)) {
                selectedCountry = c;
                phoneController.text = rawPhone.replaceFirst(c.code, '');
                break;
              }
            }
          } else {
            phoneController.text = rawPhone;
          }
        }
        
        notifyListeners();
        _showSnack(context, 'Contact imported successfully', isError: false);
      }
    } catch (e) {
      _showSnack(context, 'Could not import contact: $e');
    }
  }
}
