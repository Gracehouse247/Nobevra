# Nobevra Mobile Application

[![Mobile App CI](https://github.com/Gracehouse247/Nobevra/actions/workflows/flutter.yml/badge.svg)](https://github.com/Gracehouse247/Nobevra/actions/workflows/flutter.yml)
[![Flutter 3.22](https://img.shields.io/badge/Flutter-3.22-02569B?logo=flutter)](https://flutter.dev/)
[![Dart 3.4](https://img.shields.io/badge/Dart-3.4-0175C2?logo=dart)](https://dart.dev/)
[![Platforms](https://img.shields.io/badge/Platforms-Android%20%7C%20iOS-brightgreen)](https://flutter.dev/)

**Nobevra Mobile** is the mobile client of the Nobevra business ecosystem, providing modern professionals and field teams with offline-first invoicing, instant client management, dynamic QR code creation, expense receipts scanning, and real-time revenue analytics on Android and iOS.

---

## 📱 Mobile Features

- 🧾 **On-the-Go Invoicing**: Create, edit, preview, and send professional PDF invoices and estimates via WhatsApp, Email, or direct link.
- 📶 **Offline-First Storage**: Powered by Isar DB local cache for fast offline access and seamless background sync with Supabase when online.
- 📱 **Dynamic QR Generator & Scanner**: Generate custom-styled QR codes for business cards, payment links, and documents.
- 🔐 **Biometric Authentication**: Secure fingerprint and Face ID login integration via `local_auth`.
- 📊 **Revenue Dashboard & Charts**: Interactive financial charts (`fl_chart`) to analyze sales trends and unpaid balances in real-time.
- 🖨️ **Native PDF Rendering**: In-app PDF preview and printing capabilities powered by Flutter `printing` and `pdf`.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Flutter 3.22 (Dart 3.4+)
- **State Management**: Provider Pattern (`provider`)
- **Local Caching**: Isar Database (`isar`, `isar_flutter_libs`)
- **Backend Sync**: Supabase Flutter SDK (`supabase_flutter`) & Firebase Auth
- **Security**: Secure JWT storage via `flutter_secure_storage` & `local_auth`

---

## 🚀 Getting Started

### Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install) `v3.22.0` or higher
- Android SDK (for Android builds) / Xcode (for iOS builds)

### Installation

1. **Navigate to the Mobile App directory**:
   ```bash
   cd "Mobile App"
   ```

2. **Install Flutter packages**:
   ```bash
   flutter pub get
   ```

3. **Run code generator (if updating Isar schemas or models)**:
   ```bash
   dart run build_runner build --delete-conflicting-outputs
   ```

4. **Launch the application**:
   ```bash
   flutter run
   ```

---

## 📦 Building Releases

### Android APK Build
```bash
flutter build apk --release
```

### Android App Bundle (AAB for Play Store)
```bash
flutter build appbundle --release
```

---

## 📄 License

© 2026 NoblesWorld. All rights reserved.
