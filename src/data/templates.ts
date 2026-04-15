export interface FlutterTemplate {
	id: string
	label: string
	description: string
	flutterCreateArg: string
}

export const flutterTemplates: FlutterTemplate[] = [
	{
		id: 'app',
		label: 'Flutter Application',
		description: 'Create a new Flutter application (default)',
		flutterCreateArg: 'app',
	},
	{
		id: 'package',
		label: 'Flutter Package',
		description: 'Create a new Flutter package library',
		flutterCreateArg: 'package',
	},
	{
		id: 'plugin',
		label: 'Flutter Plugin',
		description: 'Create a new Flutter plugin project',
		flutterCreateArg: 'plugin',
	},
	{
		id: 'module',
		label: 'Flutter Module',
		description: 'Create a new Flutter module project',
		flutterCreateArg: 'module',
	},
	{
		id: 'skeleton',
		label: 'Flutter Skeleton',
		description: 'Create a new Flutter project with BLoC pattern',
		flutterCreateArg: 'skeleton',
	},
]

export const flutterCommands = [
	{
		id: 'run',
		label: 'flutter run',
		description: 'Run the Flutter app on device/emulator',
	},
	{
		id: 'build-apk',
		label: 'flutter build apk',
		description: 'Build debug APK for Android',
	},
	{
		id: 'build-appbundle',
		label: 'flutter build appbundle',
		description: 'Build Android App Bundle',
	},
	{
		id: 'build-ios',
		label: 'flutter build ios',
		description: 'Build iOS app for simulator',
	},
	{
		id: 'build-ios-framework',
		label: 'flutter build ios-framework',
		description: 'Build iOS framework for simulators',
	},
	{
		id: 'build-web',
		label: 'flutter build web',
		description: 'Build web application',
	},
	{id: 'test', label: 'flutter test', description: 'Run Flutter tests'},
	{
		id: 'analyze',
		label: 'flutter analyze',
		description: 'Run static analysis on Dart code',
	},
	{id: 'pub-get', label: 'flutter pub get', description: 'Fetch dependencies'},
	{
		id: 'pub-upgrade',
		label: 'flutter pub upgrade',
		description: 'Upgrade dependencies to latest',
	},
	{
		id: 'pub-outdated',
		label: 'flutter pub outdated',
		description: 'Check for outdated dependencies',
	},
	{
		id: 'doctor',
		label: 'flutter doctor',
		description: 'Check Flutter setup and configuration',
	},
	{id: 'clean', label: 'flutter clean', description: 'Clean build artifacts'},
	{
		id: 'create',
		label: 'flutter create',
		description: 'Create a new Flutter project',
	},
	{
		id: 'devices',
		label: 'flutter devices',
		description: 'List available devices',
	},
	{
		id: 'emulators',
		label: 'flutter emulators',
		description: 'List and launch emulators',
	},
	{id: 'logs', label: 'flutter logs', description: 'Show device logs'},
]

export const dartCommands = [
	{id: 'run', label: 'dart run', description: 'Run a Dart program'},
	{id: 'test', label: 'dart test', description: 'Run Dart tests'},
	{id: 'format', label: 'dart format', description: 'Format Dart code'},
	{
		id: 'analyze',
		label: 'dart analyze',
		description: 'Analyze Dart code for issues',
	},
	{
		id: 'compile-exe',
		label: 'dart compile exe',
		description: 'Compile to native executable',
	},
	{
		id: 'compile-js',
		label: 'dart compile js',
		description: 'Compile to JavaScript',
	},
	{
		id: 'compile-aot',
		label: 'dart compile aot',
		description: 'Compile to AOT snapshot',
	},
	{
		id: 'compile-kernel',
		label: 'dart compile kernel',
		description: 'Compile to Dart kernel',
	},
	{id: 'pub-get', label: 'dart pub get', description: 'Fetch dependencies'},
	{
		id: 'pub-upgrade',
		label: 'dart pub upgrade',
		description: 'Upgrade dependencies',
	},
	{
		id: 'pub-deps',
		label: 'dart pub deps',
		description: 'Show package dependencies',
	},
	{
		id: 'pub-outdated',
		label: 'dart pub outdated',
		description: 'Check for outdated packages',
	},
	{
		id: 'create',
		label: 'dart create',
		description: 'Create a new Dart project',
	},
	{id: 'version', label: 'dart --version', description: 'Show Dart version'},
]

export const newProjectOptions = [
	{
		id: 'flutter-create',
		label: 'Flutter Create',
		description: 'Create a new Flutter project with templates',
	},
	{
		id: 'add-bloc',
		label: 'Add BLoC',
		description: 'Add state management with BLoC',
	},
	{
		id: 'add-provider',
		label: 'Add Provider',
		description: 'Add state management with Provider',
	},
	{
		id: 'add-getx',
		label: 'Add GetX',
		description: 'Add state management with GetX',
	},
	{
		id: 'add-firebase',
		label: 'Add Firebase',
		description: 'Initialize Firebase in project',
	},
	{
		id: 'add-localization',
		label: 'Add Localization',
		description: 'Add internationalization support',
	},
	{
		id: 'add-go-router',
		label: 'Add GoRouter',
		description: 'Add routing with go_router',
	},
]
