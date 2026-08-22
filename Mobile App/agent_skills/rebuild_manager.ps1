# NobleGo Rebuild & Verification Agent Skill
param (
    [string]$Mode = "debug",
    [string]$Target = "android",
    [switch]$AutoLaunch,
    [switch]$SkipTests,
    [switch]$ExportLogs
)

$projectPath = "c:\Projects\NobleGo\Moble App"
$appId = "com.noblesworld.nobevra"
$logFile = "$projectPath\agent_skills\build_log.txt"

function Write-Log {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
    if ($ExportLogs) {
        $Message | Out-File -FilePath $logFile -Append -Encoding UTF8
    }
}

if ($ExportLogs) {
    "--- New Build Session: $(Get-Date) ---" | Out-File -FilePath $logFile -Force -Encoding UTF8
}

Set-Location $projectPath
Write-Log "Starting NobleGo Rebuild... Target: $Target, Mode: $Mode" "Cyan"

Write-Log "Cleaning project..." "Yellow"
flutter clean

Write-Log "Syncing dependencies..." "Yellow"
flutter pub get

Write-Log "Analyzing for bugs..." "Yellow"
flutter analyze

if (-not $SkipTests) {
    Write-Log "Running tests..." "Yellow"
    flutter test
}

Write-Log "Compiling..." "Cyan"
if ($Target -eq "android") {
    if ($Mode -eq "debug") {
        flutter build apk --debug
    } else {
        flutter build apk --release
    }

    $apkPath = "$projectPath\build\app\outputs\flutter-apk\app-$Mode.apk"
    if (-not (Test-Path $apkPath)) {
        $apkPath = "$projectPath\android\app\build\outputs\flutter-apk\app-$Mode.apk"
    }

    if (Test-Path $apkPath) {
        Write-Log "REBUILD SUCCESSFUL! APK: $apkPath" "Green"
        if ($AutoLaunch) {
            Write-Log "Installing..." "Yellow"
            adb install -r "$apkPath"
            Write-Log "Launching..." "Green"
            adb shell monkey -p $appId -c android.intent.category.LAUNCHER 1
        }
    } else {
        Write-Log "Build failed to produce APK." "Red"
    }
} else {
    Write-Log "REBUILD SUCCESSFUL for $Target" "Green"
}
