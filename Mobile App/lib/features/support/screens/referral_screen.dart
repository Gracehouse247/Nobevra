import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class ReferralScreen extends StatelessWidget {
  const ReferralScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white.withOpacity(0.8),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Colors.black, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Refer a Friend', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildIllustration(),
            _buildValueProp(),
            _buildReferralCodeBox(),
            _buildShareOptions(),
            _buildSocialProof(),
            const SizedBox(height: 24),
            _buildHelpLink(),
            const SizedBox(height: 120),
          ],
        ),
      ),
      bottomSheet: _buildStickyCTA(),
    );
  }

  Widget _buildIllustration() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: AspectRatio(
        aspectRatio: 4 / 3,
        child: Container(
          width: double.infinity,
          decoration: BoxDecoration(
            color: AppColors.primary.withOpacity(0.05),
            borderRadius: BorderRadius.circular(24),
            image: const DecorationImage(
              image: NetworkImage('https://img.freepik.com/free-vector/happy-business-colleagues-celebrating-victory_1150-37968.jpg'),
              fit: BoxFit.cover,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildValueProp() {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        children: [
          Text(
            'Grow Together with Nobevra',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, height: 1.1),
          ),
          SizedBox(height: 12),
          Text(
            'Invite a fellow entrepreneur and you both get 1 month of Pro for free!',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey, fontSize: 16, fontWeight: FontWeight.w500, height: 1.5),
          ),
        ],
      ),
    );
  }

  Widget _buildReferralCodeBox() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AppColors.background,
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: AppColors.lightGrey, width: 2, style: BorderStyle.solid), // Handled by dash border in original, using solid for simplicity
        ),
        child: Column(
          children: [
            const Text('YOUR REFERRAL CODE', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1.5)),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.lightGrey)),
              child: Row(
                children: [
                  const Expanded(
                    child: Text(
                      'NOBLE-789-GO',
                      style: TextStyle(color: AppColors.primary, fontSize: 20, fontWeight: FontWeight.w900, letterSpacing: 2),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(12)),
                    child: const Icon(Icons.content_copy_rounded, color: Colors.white, size: 20),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildShareOptions() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Share via', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildShareItem('WhatsApp', Icons.chat_bubble_rounded, const Color(0xFF25D366)),
              _buildShareItem('Telegram', Icons.send_rounded, const Color(0xFF0088CC)),
              _buildShareItem('Email', Icons.mail_rounded, AppColors.primary),
              _buildShareItem('More', Icons.more_horiz_rounded, Colors.grey),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildShareItem(String label, IconData icon, Color color) {
    return Column(
      children: [
        Container(
          width: 60,
          height: 60,
          decoration: BoxDecoration(color: color.withOpacity(0.1), shape: BoxShape.circle),
          child: Icon(icon, color: color, size: 28),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold)),
      ],
    );
  }

  Widget _buildSocialProof() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AppColors.primary.withOpacity(0.05),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: AppColors.primary.withOpacity(0.1)),
        ),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('SUCCESSFUL REFERRALS', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1)),
                    SizedBox(height: 4),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.baseline,
                      textBaseline: TextBaseline.alphabetic,
                      children: [
                        Text('3', style: TextStyle(color: AppColors.primary, fontSize: 24, fontWeight: FontWeight.w900)),
                        SizedBox(width: 4),
                        Text('Friends joined', style: TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.w500)),
                      ],
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(20)),
                  child: const Text('3 Months Earned', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
            const SizedBox(height: 16),
            ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: const LinearProgressIndicator(
                value: 0.6,
                backgroundColor: Colors.white24,
                valueColor: AlwaysStoppedAnimation(AppColors.primary),
                minHeight: 8,
              ),
            ),
            const SizedBox(height: 12),
            const Text(
              '2 more referrals until your next reward badge!',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w500),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHelpLink() {
    return TextButton.icon(
      onPressed: () {},
      icon: const Icon(Icons.help_outline_rounded, size: 18, color: Colors.grey),
      label: const Text('How do referrals work?', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold, fontSize: 13)),
    );
  }

  Widget _buildStickyCTA() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: AppColors.lightGrey)),
      ),
      child: ElevatedButton.icon(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
          minimumSize: const Size(double.infinity, 60),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        ),
        icon: const Icon(Icons.person_add_rounded),
        label: const Text('Invite Contacts', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
      ),
    );
  }
}
