import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/features/qr_generator/controllers/folder_controller.dart';
import 'package:noble_invoice/features/qr_generator/controllers/qr_history_controller.dart';
import 'package:noble_invoice/routes/app_routes.dart';

class QrFoldersScreen extends StatefulWidget {
  const QrFoldersScreen({super.key});

  @override
  State<QrFoldersScreen> createState() => _QrFoldersScreenState();
}

class _QrFoldersScreenState extends State<QrFoldersScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<FolderController>().loadFolders();
    });
  }

  Future<void> _createFolder() async {
    final controller = TextEditingController();
    final name = await showDialog<String>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('New Folder'),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(hintText: 'Folder Name'),
          autofocus: true,
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(onPressed: () => Navigator.pop(context, controller.text), child: const Text('Create')),
        ],
      ),
    );

    if (name != null && name.isNotEmpty) {
      try {
        await context.read<FolderController>().createFolder(name);
      } catch (e) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.toString())));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<FolderController>(
      builder: (context, folderCtrl, _) {
        return Scaffold(
          backgroundColor: AppColors.background,
          body: RefreshIndicator(
            onRefresh: () => folderCtrl.loadFolders(),
            child: CustomScrollView(
              slivers: [
                _buildSliverAppBar(folderCtrl),
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(20, 20, 20, 120),
                  sliver: folderCtrl.isLoading 
                    ? const SliverFillRemaining(child: Center(child: CircularProgressIndicator()))
                    : folderCtrl.errorMessage != null
                        ? SliverFillRemaining(child: Center(child: Text(folderCtrl.errorMessage!)))
                        : folderCtrl.folders.isEmpty
                            ? const SliverFillRemaining(child: Center(child: Text('No folders yet. Create one to organize your QR codes.')))
                            : SliverToBoxAdapter(
                                child: Column(
                                  children: [
                                    _buildSearchAndSortBar(),
                                    const SizedBox(height: 24),
                                    _buildFolderGrid(folderCtrl),
                                  ],
                                ),
                              ),
                ),
              ],
            ),
          ),
          floatingActionButton: Padding(
            padding: const EdgeInsets.only(bottom: 60),
            child: FloatingActionButton.extended(
              onPressed: _createFolder,
              backgroundColor: AppColors.primary,
              icon: const Icon(Icons.create_new_folder_rounded, color: Colors.white),
              label: const Text('New Folder', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
            ),
          ),
          floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
        );
      },
    );
  }



  Widget _buildSliverAppBar(FolderController folderCtrl) {
    return SliverAppBar(
      expandedHeight: 140,
      floating: false,
      pinned: true,
      backgroundColor: AppColors.background.withOpacity(0.1),
      elevation: 0,
      leadingWidth: 100,
      leading: const Padding(
        padding: EdgeInsets.only(left: 20, top: 12),
        child: Text(
          'Nobevra TOOLKIT',
          style: TextStyle(color: AppColors.primary, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1),
        ),
      ),
      actions: [
        IconButton(icon: const Icon(Icons.search_rounded, color: Colors.grey), onPressed: () {}),
        IconButton(icon: const Icon(Icons.settings_outlined, color: Colors.grey), onPressed: () {}),
        const SizedBox(width: 8),
      ],
      flexibleSpace: FlexibleSpaceBar(
        titlePadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        title: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Saved Folders', style: TextStyle(color: Colors.black, fontWeight: FontWeight.w900, fontSize: 24)),
            Text('${folderCtrl.folders.length} categories available', style: TextStyle(color: Colors.grey.withOpacity(0.1), fontSize: 11, fontWeight: FontWeight.w500)),
          ],
        ),
      ),
    );
  }

  Widget _buildSearchAndSortBar() {
    return Row(
      children: [
        Expanded(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
            decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
            child: Row(
              children: [
                const Icon(Icons.filter_list_rounded, color: Colors.grey, size: 18),
                const SizedBox(width: 8),
                Expanded(
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: 'Recently Modified',
                      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.black),
                      icon: const Icon(Icons.keyboard_arrow_down_rounded, color: Colors.grey),
                      items: ['Recently Modified', 'Name (A-Z)'].map((item) {
                        return DropdownMenuItem(value: item, child: Text(item));
                      }).toList(),
                      onChanged: (v) {},
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(width: 12),
        Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
          child: const Icon(Icons.grid_view_rounded, color: AppColors.primary, size: 20),
        ),
      ],
    );
  }

  Widget _buildFolderGrid(FolderController folderCtrl) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 1,
      ),
      itemCount: folderCtrl.folders.length,
      itemBuilder: (context, index) {
        final folder = folderCtrl.folders[index];
        return _buildFolderCard(
          folder.name, 
          0, // Items count could be added here if needed
          Icons.folder_rounded,
          onTap: () {
            context.read<QrHistoryController>().setSelectedFolderId(folder.id);
            Navigator.pushNamed(context, AppRoutes.qrHistory);
          },
        );
      },
    );
  }

  Widget _buildFolderCard(String title, int items, IconData icon, {VoidCallback? onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4))],
          border: Border.all(color: AppColors.lightGrey),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
                  child: Icon(icon, color: AppColors.primary, size: 22),
                ),
                const Icon(Icons.more_vert_rounded, color: Colors.grey, size: 18),
              ],
            ),
            const Spacer(),
            Text(title, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16, height: 1.1)),
            const SizedBox(height: 4),
            const Text('Tap to view', style: TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}
