import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/ai_assistant/controllers/ai_assistant_controller.dart';
import 'package:animate_do/animate_do.dart';

class AiChatScreen extends StatefulWidget {
  const AiChatScreen({super.key});

  @override
  State<AiChatScreen> createState() => _AiChatScreenState();
}

class _AiChatScreenState extends State<AiChatScreen> {
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _textController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final aiCtrl = context.watch<AiAssistantController>();

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Noble AI Assistant', style: TextStyle(fontWeight: FontWeight.w900)),
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(20),
              itemCount: aiCtrl.messages.length,
              itemBuilder: (context, index) {
                final msg = aiCtrl.messages[index];
                return _buildMessageBubble(msg);
              },
            ),
          ),
          if (aiCtrl.isLoading)
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: CircularProgressIndicator(strokeWidth: 2),
            ),
          _buildInputArea(aiCtrl),
        ],
      ),
    );
  }

  Widget _buildMessageBubble(AiMessage msg) {
    return FadeInUp(
      duration: const Duration(milliseconds: 400),
      child: Align(
        alignment: msg.isUser ? Alignment.centerRight : Alignment.centerLeft,
        child: Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
          decoration: BoxDecoration(
            color: msg.isUser ? AppColors.primary : Colors.white,
            borderRadius: BorderRadius.circular(20).copyWith(
              bottomRight: msg.isUser ? const Radius.circular(0) : const Radius.circular(20),
              bottomLeft: msg.isUser ? const Radius.circular(20) : const Radius.circular(0),
            ),
            boxShadow: [
              BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 4))
            ],
          ),
          child: Text(
            msg.text,
            style: TextStyle(
              color: msg.isUser ? Colors.white : const Color(0xFF0F172A),
              fontSize: 15,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildInputArea(AiAssistantController aiCtrl) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
      ),
      child: SafeArea(
        child: Row(
          children: [
            Expanded(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: const Color(0xFFF1F5F9),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: TextField(
                  controller: _textController,
                  decoration: InputDecoration(
                    hintText: aiCtrl.isListening ? 'Listening: ${aiCtrl.lastWords}' : 'Ask Noble AI...',
                    border: InputBorder.none,
                  ),
                  onSubmitted: (val) {
                    aiCtrl.sendMessage(val, context);
                    _textController.clear();
                    _scrollToBottom();
                  },
                ),
              ),
            ),
            const SizedBox(width: 12),
            GestureDetector(
              onLongPress: () => aiCtrl.startListening(),
              onLongPressUp: () => aiCtrl.stopListening(context),
              child: Container(
                width: 48, height: 48,
                decoration: BoxDecoration(
                  color: aiCtrl.isListening ? Colors.redAccent : AppColors.primary,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  aiCtrl.isListening ? Icons.mic_rounded : Icons.mic_none_rounded,
                  color: Colors.white,
                  size: 20,
                ),
              ),
            ),
            const SizedBox(width: 8),
            GestureDetector(
              onTap: () {
                aiCtrl.sendMessage(_textController.text, context);
                _textController.clear();
                _scrollToBottom();
              },
              child: Container(
                width: 48, height: 48,
                decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
                child: const Icon(Icons.send_rounded, color: Colors.white, size: 20),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
