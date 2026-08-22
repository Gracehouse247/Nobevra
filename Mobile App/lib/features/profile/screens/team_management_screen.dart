import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/profile/controllers/team_controller.dart';
import 'package:noble_invoice/features/profile/models/team_model.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:noble_invoice/features/wallet/widgets/upgrade_prompt_sheet.dart';
import 'package:noble_invoice/core/widgets/subscription_guard.dart';

class TeamManagementScreen extends StatefulWidget {
  const TeamManagementScreen({super.key});

  @override
  State<TeamManagementScreen> createState() => _TeamManagementScreenState();
}

class _TeamManagementScreenState extends State<TeamManagementScreen> {
  final _emailCtrl = TextEditingController();
  TeamRole _selectedRole = TeamRole.staff;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final sub = context.read<SubscriptionController>();
      if (!sub.canUse('team_management')) {
        UpgradePromptSheet.show(context, 'Team Collaboration');
      }
    });
  }

  @override
  void dispose() {
    _emailCtrl.dispose();
    super.dispose();
  }

  void _showInviteSheet() {
    showModalBottomSheet(
      context: context, 
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(32))),
      builder: (ctx) => Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(ctx).viewInsets.bottom, left: 24, right: 24, top: 24),
        child: Column(
          mainAxisSize: MainAxisSize.min, 
          crossAxisAlignment: CrossAxisAlignment.start, 
          children: [
            Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: Colors.grey.shade200, borderRadius: BorderRadius.circular(2)))),
            const SizedBox(height: 24),
            const Text('Invite Member', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, letterSpacing: -0.5)),
            const SizedBox(height: 8),
            const Text('Add a collaborator to your business workspace.', style: TextStyle(color: Colors.grey, fontSize: 13, fontWeight: FontWeight.w500)),
            const SizedBox(height: 32),
            
            _buildSheetInput(
              label: 'EMAIL ADDRESS',
              controller: _emailCtrl,
              hint: 'colleague@nobevra.com',
              icon: Icons.alternate_email_rounded,
            ),
            const SizedBox(height: 24),
            
            _buildRoleDropdown(),
            
            const SizedBox(height: 40),
            SizedBox(
              width: double.infinity, 
              child: ElevatedButton(
                onPressed: () async {
                  final success = await context.read<TeamController>().inviteMember(_emailCtrl.text.trim(), _selectedRole);
                  if (success && mounted) {
                    Navigator.pop(ctx);
                    _emailCtrl.clear();
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Invitation successfully dispatched'), backgroundColor: AppColors.primary),
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary, 
                  padding: const EdgeInsets.symmetric(vertical: 20), 
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  elevation: 8,
                  shadowColor: AppColors.primary.withOpacity(0.3),
                ),
                child: const Text('DISPATCH INVITE', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, letterSpacing: 0.5)),
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildSheetInput({required String label, required TextEditingController controller, required String hint, required IconData icon}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 1.2, color: AppColors.darkGrey)),
        const SizedBox(height: 10),
        Container(
          decoration: BoxDecoration(
            color: AppColors.lightGrey.withOpacity(0.2),
            borderRadius: BorderRadius.circular(16),
          ),
          child: TextField(
            controller: controller,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
            decoration: InputDecoration(
              hintText: hint,
              prefixIcon: Icon(icon, size: 20, color: AppColors.primary),
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildRoleDropdown() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('ASSIGN ROLE', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 1.2, color: AppColors.darkGrey)),
        const SizedBox(height: 10),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          decoration: BoxDecoration(
            color: AppColors.lightGrey.withOpacity(0.2),
            borderRadius: BorderRadius.circular(16),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButtonFormField<TeamRole>(
              initialValue: _selectedRole,
              items: TeamRole.values.where((r) => r != TeamRole.owner).map((r) => DropdownMenuItem(
                value: r, 
                child: Row(
                  children: [
                    Icon(Icons.shield_outlined, size: 18, color: r.color),
                    const SizedBox(width: 12),
                    Text(r.label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  ],
                ),
              )).toList(),
              onChanged: (v) => setState(() => _selectedRole = v!),
              decoration: const InputDecoration(border: InputBorder.none),
            ),
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final teamCtrl = context.watch<TeamController>();
    final team = teamCtrl.activeTeam;
    final sub = context.watch<SubscriptionController>();
    
    // Only Elite plan supports Team Management
    final isLocked = sub.currentTier != SubscriptionTier.elite || sub.isExpired;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Team Workspace', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18)),
        backgroundColor: AppColors.background, 
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary, size: 20), 
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SubscriptionGuard(
        isLocked: isLocked,
        featureName: 'Elite Team Workspace',
        upgradeMessage: 'Invite collaborators and manage permissions with Noble Elite.',
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start, 
          children: [
            if (team != null) 
              FadeInDown(
                duration: const Duration(milliseconds: 500),
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Container(
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [AppColors.primary, Color(0xFF1E40AF)],
                      ),
                      borderRadius: BorderRadius.circular(28),
                      boxShadow: [
                        BoxShadow(color: AppColors.primary.withOpacity(0.2), blurRadius: 20, offset: const Offset(0, 10)),
                      ],
                    ),
                    child: Row(children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(color: Colors.white.withOpacity(0.15), borderRadius: BorderRadius.circular(16)),
                        child: const Icon(Icons.groups_rounded, color: Colors.white, size: 30),
                      ),
                      const SizedBox(width: 20),
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(team.name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 20, letterSpacing: -0.5)),
                        Text('${teamCtrl.teamMembers.length} ACTIVE MEMBERS', style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.0)),
                      ])),
                      if (teamCtrl.activeRole == TeamRole.owner || teamCtrl.activeRole == TeamRole.admin)
                        Material(
                          color: Colors.white.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(12),
                          child: InkWell(
                            onTap: _showInviteSheet,
                            borderRadius: BorderRadius.circular(12),
                            child: const Padding(padding: EdgeInsets.all(10), child: Icon(Icons.person_add_rounded, color: Colors.white, size: 22)),
                          ),
                        ),
                    ]),
                  ),
                ),
              ),

            const Padding(
              padding: EdgeInsets.fromLTRB(28, 8, 24, 16),
              child: Text('COLLABORATORS', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: AppColors.darkGrey, letterSpacing: 1.5)),
            ),
            
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                itemCount: teamCtrl.teamMembers.length,
                itemBuilder: (ctx, i) {
                  final m = teamCtrl.teamMembers[i];
                  return FadeInUp(
                    delay: Duration(milliseconds: 100 * i),
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 12),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 10, offset: const Offset(0, 4))],
                      ),
                      child: Row(children: [
                        CircleAvatar(
                          radius: 22,
                          backgroundColor: AppColors.primary.withOpacity(0.1), 
                          backgroundImage: m.userAvatarUrl != null ? NetworkImage(m.userAvatarUrl!) : null, 
                          child: m.userAvatarUrl == null ? Text(m.userName?[0] ?? 'U', style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.primary)) : null,
                        ),
                        const SizedBox(width: 16),
                        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text(m.userName ?? 'Pending User', style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 15, color: AppColors.textBlack)),
                          Text(m.userEmail ?? '', style: TextStyle(color: Colors.grey.shade500, fontSize: 12, fontWeight: FontWeight.w500)),
                        ])),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          decoration: BoxDecoration(color: m.role.color.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
                          child: Text(m.role.label, style: TextStyle(color: m.role.color, fontWeight: FontWeight.w900, fontSize: 9, letterSpacing: 0.5)),
                        ),
                      ]),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
