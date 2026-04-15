import SelectInput from '../components/select-input.js'
import {useState} from 'react'
import {Text, Box} from 'ink'

interface NewProjectOption {
	id: string
	label: string
	description: string
}

const options: NewProjectOption[] = [
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

interface NewProjectProps {
	onSelect: (option: string) => void
}

export default function NewProject({onSelect}: NewProjectProps) {
	const [selected, setSelected] = useState<NewProjectOption | null>(null)

	const handleSelect = (item: {label: string; value: string}) => {
		const opt = options.find(o => o.id === item.value)
		if (opt) {
			setSelected(opt)
		}
	}

	const _handleConfirm = () => {
		if (selected) {
			onSelect(selected.id)
		}
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
					╔══════════════════════════════════╗
				</Text>
			</Box>
			<Box marginX={2}>
				<Text
					bold
					color="white"
				>
					New Project
				</Text>
			</Box>
			<Box
				marginX={2}
				marginBottom={1}
			>
				<Text dimColor>Start a new Flutter project</Text>
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
				<Text color="magenta">Select an option:</Text>
			</Box>
			<SelectInput
				items={options.map(o => ({
					label: `${o.label} - ${o.description}`,
					value: o.id,
				}))}
				onSelect={handleSelect}
			/>
			<Box marginTop={1}>
				<Text
					bold
					color="cyan"
				>
					╚══════════════════════════════════╝
				</Text>
			</Box>
			<Box marginTop={1}>
				<Text dimColor>↑↓ Navigate • Enter Select • Esc Back</Text>
			</Box>
		</Box>
	)
}
