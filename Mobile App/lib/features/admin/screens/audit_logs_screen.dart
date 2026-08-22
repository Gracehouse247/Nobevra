import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class AuditLogsScreen extends StatelessWidget {
  const AuditLogsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white.withOpacity(0.8),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: Column(
          children: [
            const Text('System Event Logs', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
            Text('Nobevra CONSOLE V6.4', style: TextStyle(color: Colors.grey.withOpacity(0.7), fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1.2)),
          ],
        ),
        centerTitle: true,
        actions: [
          IconButton(icon: const Icon(Icons.settings_outlined, color: AppColors.primary), onPressed: () {}),
        ],
      ),
      body: Column(
        children: [
          _buildSearchBar(),
          _buildFilterStrip(),
          _buildLiveUpdateToggle(),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _buildLogEntry(
                  type: 'Error',
                  title: '500 Internal Server Error',
                  message: 'Failed to connect to redis-cluster-01. Production environment. Connection timeout after 5000ms.',
                  time: '14:22:05.184',
                  tags: ['#ERR-402', 'worker-a2'],
                  color: Colors.redAccent,
                ),
                _buildLogEntry(
                  type: 'Warning',
                  title: 'High CPU Usage Detected',
                  message: 'Instance i-0b821f is exceeding 85% threshold. Scaling policy \'ScaleUp-Fast\' evaluated.',
                  time: '14:21:58.902',
                  color: Colors.amber,
                ),
                _buildLogEntry(
                  type: 'Info',
                  title: 'Deployment Successful',
                  message: 'Revision v2.4.12-rc1 deployed successfully to 12 active nodes.',
                  time: '14:21:45.311',
                  color: AppColors.primary,
                ),
                _buildLogEntry(
                  type: 'Info',
                  title: 'User Login',
                  message: 'User \'admin_jessica\' authenticated via SSO from IP 192.168.1.45.',
                  time: '14:21:30.002',
                  color: AppColors.primary,
                ),
                _buildLogEntry(
                  type: 'Error',
                  title: 'Database Write Failure',
                  message: 'Disk quota exceeded for volume /var/lib/postgresql/data. Transaction aborted.',
                  time: '14:21:12.654',
                  tags: ['#DB-X02'],
                  color: Colors.redAccent,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchBar() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.lightGrey),
        ),
        child: const TextField(
          decoration: InputDecoration(
            icon: Icon(Icons.search_rounded, color: Colors.grey, size: 20),
            hintText: 'Search error codes, messages...',
            hintStyle: TextStyle(color: Colors.grey, fontSize: 13),
            border: InputBorder.none,
          ),
        ),
      ),
    );
  }

  Widget _buildFilterStrip() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          _buildFilterChip('All Logs', Colors.white, AppColors.primary, isActive: true),
          const SizedBox(width: 8),
          _buildFilterChip('Errors', Colors.redAccent, AppColors.background, hasDot: true),
          const SizedBox(width: 8),
          _buildFilterChip('Warnings', Colors.amber, AppColors.background, hasDot: true),
          const SizedBox(width: 8),
          _buildFilterChip('Info', AppColors.primary, AppColors.background, hasDot: true),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label, Color color, Color bg, {bool isActive = false, bool hasDot = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: isActive ? color : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isActive ? color : AppColors.lightGrey),
      ),
      child: Row(
        children: [
          if (hasDot) ...[
            Container(width: 8, height: 8, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
            const SizedBox(width: 8),
          ],
          Text(label, style: TextStyle(color: isActive ? bg : Colors.black87, fontSize: 13, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildLiveUpdateToggle() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.lightGrey),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), shape: BoxShape.circle),
              child: const Icon(Icons.stream_rounded, color: AppColors.primary, size: 18),
            ),
            const SizedBox(width: 12),
            const Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Live Updates', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  Text('Auto-scrolling enabled', style: TextStyle(color: Colors.grey, fontSize: 10)),
                ],
              ),
            ),
            Switch.adaptive(
              value: true,
              onChanged: (v) {},
              activeTrackColor: AppColors.primary.withOpacity(0.5),
              activeThumbColor: AppColors.primary,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLogEntry({
    required String type,
    required String title,
    required String message,
    required String time,
    List<String>? tags,
    required Color color,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.05),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.1)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(4)),
                child: Text(type.toUpperCase(), style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.w900, fontFamily: 'monospace')),
              ),
              Text(time, style: const TextStyle(color: Colors.grey, fontSize: 10, fontFamily: 'monospace')),
            ],
          ),
          const SizedBox(height: 8),
          Text(title, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 15, fontFamily: 'monospace')),
          const SizedBox(height: 4),
          Text(message, style: TextStyle(color: Colors.grey.shade700, fontSize: 12, fontFamily: 'monospace', height: 1.4)),
          if (tags != null) ...[
            const SizedBox(height: 12),
            Row(
              children: tags.map((t) => Container(
                margin: const EdgeInsets.only(right: 8),
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(color: Colors.white.withOpacity(0.6), borderRadius: BorderRadius.circular(4), border: Border.all(color: color.withOpacity(0.1))),
                child: Text(t, style: TextStyle(color: Colors.grey.shade600, fontSize: 10, fontWeight: FontWeight.bold)),
              )).toList(),
            ),
          ],
        ],
      ),
    );
  }
}
