import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class QrIconManagementScreen extends StatelessWidget {
  const QrIconManagementScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white.withOpacity(0.1),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.chevron_left_rounded, color: AppColors.primary, size: 32),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('QR Type Icons', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
        centerTitle: true,
        actions: [
          IconButton(icon: const Icon(Icons.download_rounded, color: AppColors.primary), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeroSection(),
            _buildSearchBar(),
            _buildIconsGrid(),
            _buildDesignSpecsFooter(),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildHeroSection() {
    return const Padding(
      padding: EdgeInsets.fromLTRB(24, 32, 24, 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Nobevra QR TOOLKIT', style: TextStyle(color: AppColors.primary, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1.5)),
          SizedBox(height: 8),
          Text('Custom Iconography', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, height: 1.1)),
          SizedBox(height: 12),
          Text(
            'A comprehensive 18-icon set designed with clean line art and consistent branding for professional QR generation.',
            style: TextStyle(color: Colors.grey, fontSize: 13, height: 1.5),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchBar() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.lightGrey),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4))],
        ),
        child: const TextField(
          decoration: InputDecoration(
            icon: Icon(Icons.search_rounded, color: Colors.grey, size: 20),
            hintText: 'Search 18 icons...',
            hintStyle: TextStyle(color: Colors.grey, fontSize: 14),
            border: InputBorder.none,
          ),
        ),
      ),
    );
  }

  Widget _buildIconsGrid() {
    final icons = [
      {'name': 'Business', 'desc': 'Office building', 'icon': Icons.domain_rounded},
      {'name': 'Menu', 'desc': 'Fork/knife', 'icon': Icons.restaurant_rounded},
      {'name': 'Website', 'desc': 'Globe icon', 'icon': Icons.language_rounded},
      {'name': 'Links', 'desc': 'Tree branch', 'icon': Icons.account_tree_rounded},
      {'name': 'Social', 'desc': 'Network nodes', 'icon': Icons.share_rounded},
      {'name': 'PDF', 'desc': 'Document file', 'icon': Icons.picture_as_pdf_rounded},
      {'name': 'Video', 'desc': 'Play button', 'icon': Icons.play_circle_rounded},
      {'name': 'Apps', 'desc': 'Smartphone', 'icon': Icons.install_mobile_rounded},
      {'name': 'Images', 'desc': 'Photo frame', 'icon': Icons.image_rounded},
      {'name': 'WhatsApp', 'desc': 'Chat phone', 'icon': Icons.chat_rounded},
      {'name': 'Coupon', 'desc': 'Voucher', 'icon': Icons.confirmation_number_rounded},
      {'name': 'MP3', 'desc': 'Music note', 'icon': Icons.music_note_rounded},
    ];

    return Padding(
      padding: const EdgeInsets.all(24),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 1.2,
        ),
        itemCount: icons.length,
        itemBuilder: (context, index) {
          final icon = icons[index];
          return Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.lightGrey),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Icon(icon['icon'] as IconData, color: AppColors.primary, size: 24),
                ),
                const Spacer(),
                Text(icon['name'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                Text(icon['desc'] as String, style: const TextStyle(color: Colors.grey, fontSize: 10)),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildDesignSpecsFooter() {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(40)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Design Specs', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 20),
          Row(
            children: [
              _buildSpecItem('#137FEC', 'Primary Brand Blue', AppColors.primary),
              const SizedBox(width: 20),
              _buildSpecItem('Soft', 'Secondary Accent', AppColors.primary.withOpacity(0.1)),
            ],
          ),
          const SizedBox(height: 32),
          _buildSpecRow('Stroke Weight', '2.0px'),
          _buildSpecRow('Corner Radius', '4.0px / 8.0px'),
          _buildSpecRow('Grid Base', '24px Optic'),
          const SizedBox(height: 40),
          ElevatedButton.icon(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              minimumSize: const Size(double.infinity, 60),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              shadowColor: AppColors.primary.withOpacity(0.1),
              elevation: 4,
            ),
            icon: const Icon(Icons.grid_view_rounded),
            label: const Text('Download Asset Library', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  Widget _buildSpecItem(String code, String label, Color color) {
    return Expanded(
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(6)),
            alignment: Alignment.center,
            child: Text(code, style: TextStyle(color: color.computeLuminance() > 0.5 ? Colors.black : Colors.white, fontSize: 7, fontWeight: FontWeight.bold)),
          ),
          const SizedBox(width: 12),
          Expanded(child: Text(label, style: const TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold))),
        ],
      ),
    );
  }

  Widget _buildSpecRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: Colors.grey, fontSize: 12)),
          Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
        ],
      ),
    );
  }
}
