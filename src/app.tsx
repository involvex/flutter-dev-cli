import SelectInput, {type SelectItem} from './components/select-input.js'
import pkg from '../package.json' with {type: 'json'}
import {Text, Box, useInput} from 'ink'
import {useState} from 'react'

import FlutterCommands from './commands/flutter-commands.js'
import FlutterCreate from './commands/flutter-create.js'
import DartCommands from './commands/dart-commands.js'
import FlutterDocs from './commands/flutter-docs.js'
import NewProject from './commands/new-project.js'
import Settings from './commands/settings.js'
import Version from './commands/version.js'
import About from './commands/about.js'
import Help from './commands/help.js'
import Exit from './commands/exit.js'

type AppScreen =
	| 'menu'
	| 'help'
	| 'about'
	| 'version'
	| 'settings'
	| 'exit'
	| 'flutter-create'
	| 'flutter-commands'
	| 'dart-commands'
	| 'new-project'
	| 'flutter-docs'

interface BackableScreenProps {
	children: React.ReactNode
	onBack: () => void
}

function BackableScreen({children, onBack}: BackableScreenProps) {
	useInput((_input, key) => {
		if (key.escape) {
			onBack()
		}
	})

	return (
		<Box flexDirection="column">
			<Box
				paddingX={2}
				paddingY={1}
			>
				<Text dimColor>← Esc to return to menu</Text>
			</Box>
			{children}
		</Box>
	)
}

export default function App() {
	const [screen, setScreen] = useState<AppScreen>('menu')

	const goMenu = () => setScreen('menu')
	const _goHelp = () => setScreen('help')
	const _goAbout = () => setScreen('about')
	const _goVersion = () => setScreen('version')
	const _goSettings = () => setScreen('settings')
	const _goExit = () => setScreen('exit')

	const menuItems: SelectItem<AppScreen>[] = [
		{label: '→ New Project', value: 'new-project'},
		{label: '→ Flutter Create', value: 'flutter-create'},
		{label: '→ Flutter Commands', value: 'flutter-commands'},
		{label: '→ Dart Commands', value: 'dart-commands'},
		{label: '→ Flutter Docs', value: 'flutter-docs'},
		{label: '→ Help', value: 'help'},
		{label: '→ Settings', value: 'settings'},
		{label: '→ About', value: 'about'},
		{label: '→ Version', value: 'version'},
		{label: '→ Exit', value: 'exit'},
	]

	if (screen === 'menu') {
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
						╔══════════════════════════════════╗
					</Text>
				</Box>
				<Box marginX={2}>
					<Text
						bold
						color="white"
						dimColor
					>
						{' '}
						{pkg.name}
					</Text>
				</Box>
				<Box
					marginX={2}
					marginBottom={1}
				>
					<Text dimColor> {pkg.description}</Text>
				</Box>
				<Box marginBottom={1}>
					<Text
						bold
						color="cyan"
					>
						╠══════════════════════════════════╣
					</Text>
				</Box>
				<Box marginX={2}>
					<Text
						bold
						color="magenta"
					>
						{' '}
						Select an option:
					</Text>
				</Box>
				<SelectInput
					items={menuItems}
					onSelect={(item: SelectItem<AppScreen>) => {
						setScreen(item.value)
					}}
				/>
				<Box marginTop={1}>
					<Text
						bold
						color="cyan"
					>
						╚══════════════════════════════════╝
					</Text>
				</Box>
				<Box
					marginTop={1}
					paddingX={2}
				>
					<Text dimColor>↑↓ Navigate • Enter Select • Esc Back</Text>
				</Box>
			</Box>
		)
	}

	if (screen === 'help') {
		return (
			<BackableScreen onBack={goMenu}>
				<Help />
			</BackableScreen>
		)
	}

	if (screen === 'about') {
		return (
			<BackableScreen onBack={goMenu}>
				<About />
			</BackableScreen>
		)
	}

	if (screen === 'version') {
		return (
			<BackableScreen onBack={goMenu}>
				<Version />
			</BackableScreen>
		)
	}

	if (screen === 'settings') {
		return (
			<BackableScreen onBack={goMenu}>
				<Settings />
			</BackableScreen>
		)
	}

	if (screen === 'flutter-create') {
		return (
			<BackableScreen onBack={goMenu}>
				<FlutterCreate onBack={goMenu} />
			</BackableScreen>
		)
	}

	if (screen === 'flutter-commands') {
		return (
			<BackableScreen onBack={goMenu}>
				<FlutterCommands onBack={goMenu} />
			</BackableScreen>
		)
	}

	if (screen === 'dart-commands') {
		return (
			<BackableScreen onBack={goMenu}>
				<DartCommands onBack={goMenu} />
			</BackableScreen>
		)
	}

	if (screen === 'new-project') {
		return (
			<BackableScreen onBack={goMenu}>
				<NewProject
					onSelect={(option: string) => {
						if (option === 'flutter-create') {
							setScreen('flutter-create')
						}
					}}
				/>
			</BackableScreen>
		)
	}

	if (screen === 'flutter-docs') {
		return (
			<BackableScreen onBack={goMenu}>
				<FlutterDocs onBack={goMenu} />
			</BackableScreen>
		)
	}

	if (screen === 'exit') {
		return <Exit />
	}

	return null
}
