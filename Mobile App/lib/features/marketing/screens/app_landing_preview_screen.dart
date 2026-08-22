import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class AppLandingPreviewScreen extends StatelessWidget {
  const AppLandingPreviewScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close_rounded, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Preview Mode', style: TextStyle(color: Colors.black, fontSize: 14)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Header Image / Video Placeholder
            Container(
              height: 250,
              decoration: BoxDecoration(
                color: AppColors.primary.withOpacity(0.1),
                image: const DecorationImage(
                  image: NetworkImage('https://picsum.photos/seed/restaurant/800/600'), // Placeholder
                  fit: BoxFit.cover,
                ),
              ),
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.transparent, Colors.black.withOpacity(0.8)],
                  ),
                ),
                alignment: Alignment.bottomLeft,
                padding: const EdgeInsets.all(24),
                child: const Text(
                  'The Golden Fork',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 32,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
            ),
            
            // Business Details
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Experience culinary excellence in the heart of the city. We serve authentic recipes passed down through generations.',
                    style: TextStyle(fontSize: 16, color: Colors.black87, height: 1.5),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Icon(Icons.location_on_rounded, color: Colors.grey.shade600, size: 20),
                      const SizedBox(width: 8),
                      Text('123 Culinary Ave, Food District', style: TextStyle(color: Colors.grey.shade700)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(Icons.phone_rounded, color: Colors.grey.shade600, size: 20),
                      const SizedBox(width: 8),
                      Text('+1 (555) 123-4567', style: TextStyle(color: Colors.grey.shade700)),
                    ],
                  ),
                ],
              ),
            ),

            // Action Buttons
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Column(
                children: [
                  _buildPreviewAction(
                    icon: Icons.restaurant_menu_rounded,
                    title: 'View Digital Menu',
                    color: AppColors.primary,
                  ),
                  const SizedBox(height: 12),
                  _buildPreviewAction(
                    icon: Icons.calendar_month_rounded,
                    title: 'Book a Table',
                    color: Colors.orange,
                  ),
                  const SizedBox(height: 12),
                  _buildPreviewAction(
                    icon: Icons.rate_review_rounded,
                    title: 'Leave a Review',
                    color: Colors.blue,
                  ),
                ],
              ),
            ),

            const SizedBox(height: 48),

            // Footer branding
            Center(
              child: Column(
                children: [
                  const Text('Powered by', style: TextStyle(color: Colors.grey, fontSize: 12)),
                  const SizedBox(height: 4),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.qr_code_2_rounded, size: 16, color: Colors.grey.shade400),
                      const SizedBox(width: 4),
                      Text('Nobevra', style: TextStyle(color: Colors.grey.shade400, fontWeight: FontWeight.bold, letterSpacing: 1.0)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildPreviewAction({required IconData icon, required String title, required Color color}) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.lightGrey),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              title,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.black87),
            ),
          ),
          const Icon(Icons.arrow_forward_ios_rounded, color: Colors.grey, size: 16),
        ],
      ),
    );
  }
}
