import SelectInput from '../components/select-input.js'
import {useExecuteCommand} from '../utils/execute.js'
import {flutterCommands} from '../data/templates.js'
import {useState} from 'react'
import {Text, Box} from 'ink'

interface CommandItem {
	id: string
	label: string
	description: string
}

export default function FlutterCommands({
	onBack: _onBack,
}: {
	onBack: () => void
}) {
	const [selectedCommand, setSelectedCommand] = useState<CommandItem | null>(
		null,
	)
	const [showResult, setShowResult] = useState(false)
	const [commandResult, setCommandResult] = useState({
		success: false,
		message: '',
	})

	const commandItems: CommandItem[] = flutterCommands

	const handleSelect = (item: {label: string; value: string}) => {
		const cmd = commandItems.find(c => c.id === item.value)
		if (cmd) {
			setSelectedCommand(cmd)
		}
	}

	const handleComplete = (success: boolean, output: string) => {
		setCommandResult({success, message: output})
		setShowResult(true)
	}

	const {output, isRunning} = selectedCommand
		? useExecuteCommand(
				'flutter',
				selectedCommand.id.split(' '),
				handleComplete,
			)
		: {output: '', isRunning: false}

	if (showResult) {
		return (
			<Box
				flexDirection="column"
				padding={1}
			>
				<Box marginBottom={1}>
					<Text
						bold
						color="cyan"
					>
						Flutter Command Result
					</Text>
				</Box>
				<Box
					flexDirection="column"
					padding={1}
					borderStyle="round"
					borderColor={commandResult.success ? 'green' : 'red'}
				>
					<Text
						bold
						color={commandResult.success ? 'green' : 'red'}
					>
						{commandResult.success ? '✓ Success' : '✗ Failed'}
					</Text>
				</Box>
				<Box marginTop={1}>
					<Text dimColor>Press any key to continue...</Text>
				</Box>
			</Box>
		)
	}

	if (selectedCommand && isRunning) {
		return (
			<Box
				flexDirection="column"
				padding={1}
			>
				<Box marginBottom={1}>
					<Text
						bold
						color="cyan"
					>
						Running: flutter {selectedCommand.id}
					</Text>
				</Box>
				<Box
					flexDirection="column"
					borderStyle="round"
					borderColor="yellow"
					padding={1}
				>
					<Text color="yellow">Executing...</Text>
				</Box>
			</Box>
		)
	}

	if (selectedCommand) {
		return (
			<Box
				flexDirection="column"
				padding={1}
			>
				<Box marginBottom={1}>
					<Text
						bold
						color="cyan"
					>
						Output: flutter {selectedCommand.id}
					</Text>
				</Box>
				<Box
					flexDirection="column"
					borderStyle="round"
					padding={1}
					minHeight={10}
				>
					<Text dimColor>{output || 'No output'}</Text>
				</Box>
				<Box marginTop={1}>
					<Text dimColor>Press any key to continue...</Text>
				</Box>
			</Box>
		)
	}

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
					Flutter Commands
				</Text>
			</Box>
			<Box
				marginX={2}
				marginBottom={1}
			>
				<Text dimColor>Select a command to run:</Text>
			</Box>
			<SelectInput
				items={commandItems.map(c => ({
					label: `${c.label} - ${c.description}`,
					value: c.id,
				}))}
				onSelect={handleSelect}
			/>
			<Box marginTop={1}>
				<Text dimColor>↑↓ Navigate • Enter Select • Esc Back</Text>
			</Box>
		</Box>
	)
}
