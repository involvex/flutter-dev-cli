import {Text, Box} from 'ink'

interface DocLink {
	id: string
	label: string
	url: string
	description: string
}

const docLinks: DocLink[] = [
	{
		id: 'getting-started',
		label: 'Getting Started',
		url: 'https://docs.flutter.dev/get-started/install',
		description: 'Install and setup Flutter',
	},
	{
		id: 'tutorial',
		label: 'Write your first app',
		url: 'https://docs.flutter.dev/get-started/tutorial',
		description: 'Create and run your first Flutter app',
	},
	{
		id: 'codelabs',
		label: 'Codelabs',
		url: 'https://docs.flutter.dev/codelabs',
		description: 'Step-by-step tutorials',
	},
	{
		id: 'cookbook',
		label: 'Cookbook',
		url: 'https://docs.flutter.dev/cookbook',
		description: 'Common Flutter recipes',
	},
	{
		id: 'widgets',
		label: 'Widget catalog',
		url: 'https://docs.flutter.dev/widgets',
		description: 'Browse Flutter widgets',
	},
	{
		id: 'layout',
		label: 'Building layouts',
		url: 'https://docs.flutter.dev/ui/widgets/layout',
		description: 'Create layouts in Flutter',
	},
	{
		id: 'state-management',
		label: 'State management',
		url: 'https://docs.flutter.dev/data-and-backend/state-mgmt/overview',
		description: 'State management options',
	},
	{
		id: 'navigation',
		label: 'Navigation',
		url: 'https://docs.flutter.dev/ui/navigation',
		description: 'Navigate between screens',
	},
	{
		id: 'forms',
		label: 'Forms',
		url: 'https://docs.flutter.dev/cookbook/forms',
		description: 'Build and validate forms',
	},
	{
		id: 'animations',
		label: 'Animations',
		url: 'https://docs.flutter.dev/ui/animations',
		description: 'Create animations',
	},
	{
		id: 'testing',
		label: 'Testing',
		url: 'https://docs.flutter.dev/testing',
		description: 'Testing Flutter apps',
	},
	{
		id: 'performance',
		label: 'Performance',
		url: 'https://docs.flutter.dev/perf',
		description: 'Optimize app performance',
	},
	{
		id: 'platform-channels',
		label: 'Platform channels',
		url: 'https://docs.flutter.dev/platform-channels',
		description: 'Platform-specific code',
	},
	{
		id: 'packages',
		label: 'Packages',
		url: 'https://pub.dev',
		description: 'Dart and Flutter packages',
	},
	{
		id: 'api-reference',
		label: 'API Reference',
		url: 'https://api.flutter.dev',
		description: 'Flutter framework reference',
	},
]

export default function FlutterDocs({onBack: _onBack}: {onBack: () => void}) {
	return (
		<Box
			flexDirection="column"
			borderStyle="round"
			borderColor="cyan"
			padding={1}
		>
			<Box marginBottom={1}>
				<Text
					bold
					color="cyan"
				>
					╔════════════════════════════════════════╗
				</Text>
			</Box>
			<Box marginX={2}>
				<Text
					bold
					color="white"
				>
					Flutter Documentation
				</Text>
			</Box>
			<Box
				marginX={2}
				marginBottom={1}
			>
				<Text dimColor>Reference: https://docs.flutter.dev</Text>
			</Box>
			<Box marginBottom={1}>
				<Text
					bold
					color="cyan"
				>
					╠════════════════════════════════════════╣
				</Text>
			</Box>
			<Box
				marginX={2}
				flexDirection="column"
			>
				{docLinks.map(link => (
					<Box key={link.id}>
						<Text color="green"> {link.label}</Text>
						<Text dimColor> - {link.description}</Text>
					</Box>
				))}
			</Box>
			<Box marginTop={1}>
				<Text
					bold
					color="cyan"
				>
					╚════════════════════════════════════════╝
				</Text>
			</Box>
			<Box marginTop={1}>
				<Text dimColor>↑↓ Navigate • Enter Select • Esc Back</Text>
			</Box>
		</Box>
	)
}
