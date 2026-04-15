import {useExecuteCommand, checkFlutterInstalled} from '../utils/execute.js'
import SelectInput from '../components/select-input.js'
import {flutterTemplates} from '../data/templates.js'
import {Text, Box, useInput} from 'ink'
import TextInput from 'ink-text-input'
import {useState} from 'react'

type Step =
	| 'templates'
	| 'project-name'
	| 'org'
	| 'confirm'
	| 'running'
	| 'done'
	| 'error'

interface Template {
	id: string
	label: string
	description: string
	flutterCreateArg: string
}

export default function FlutterCreate({onBack}: {onBack: () => void}) {
	const [step, setStep] = useState<Step>('templates')
	const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
		null,
	)
	const [projectName, setProjectName] = useState('')
	const [org, setOrg] = useState('')
	const [isFlutterInstalled, setIsFlutterInstalled] = useState<boolean | null>(
		null,
	)

	const handleTemplateSelect = (item: {label: string; value: string}) => {
		const tmpl = flutterTemplates.find(t => t.id === item.value)
		if (tmpl) {
			setSelectedTemplate(tmpl)
			checkFlutterInstalled().then(setIsFlutterInstalled)
			setStep('project-name')
		}
	}

	const handleNameSubmit = () => {
		if (projectName.trim()) {
			setStep('org')
		}
	}

	const handleOrgSubmit = () => {
		setStep('confirm')
	}

	const _handleConfirm = () => {
		setStep('running')
	}

	const handleComplete = (success: boolean, _output: string) => {
		if (success) {
			setStep('done')
		} else {
			setStep('error')
		}
	}

	const {output, isRunning} =
		step === 'running' && selectedTemplate && projectName
			? useExecuteCommand(
					'flutter',
					[
						'create',
						...(selectedTemplate.id !== 'app'
							? [selectedTemplate.flutterCreateArg]
							: []),
						...(org.trim() ? ['--org', org.trim()] : []),
						projectName.trim(),
					],
					handleComplete,
				)
			: {output: '', isRunning: false}

	useInput((_input, key) => {
		if (key.escape && !isRunning) {
			if (step === 'templates') {
				onBack()
			} else if (step === 'project-name' || step === 'org') {
				setStep('templates')
				setSelectedTemplate(null)
				setProjectName('')
				setOrg('')
			} else if (step === 'confirm') {
				setStep('org')
			}
		}
	})

	if (isFlutterInstalled === false) {
		return (
			<Box
				flexDirection="column"
				padding={1}
			>
				<Text
					bold
					color="red"
				>
					Flutter is not installed or not in PATH
				</Text>
				<Text dimColor>Please install Flutter to use this feature.</Text>
				<Box marginTop={1}>
					<Text dimColor>Press Esc to go back</Text>
				</Box>
			</Box>
		)
	}

	if (step === 'templates') {
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
						Select Template
					</Text>
				</Box>
				<Box
					marginX={2}
					marginBottom={1}
				>
					<Text dimColor>Choose a project template:</Text>
				</Box>
				<SelectInput
					items={flutterTemplates.map(t => ({
						label: `${t.label} - ${t.description}`,
						value: t.id,
					}))}
					onSelect={handleTemplateSelect}
				/>
				<Box marginTop={1}>
					<Text dimColor>↑↓ Navigate • Enter Select • Esc Back</Text>
				</Box>
			</Box>
		)
	}

	if (step === 'project-name') {
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
						Project Name
					</Text>
				</Box>
				<Box
					marginX={2}
					marginBottom={1}
				>
					<Text>Enter your project name:</Text>
				</Box>
				<Box marginX={2}>
					<TextInput
						value={projectName}
						onChange={setProjectName}
						onSubmit={handleNameSubmit}
						placeholder="my_flutter_app"
					/>
				</Box>
				<Box marginTop={1}>
					<Text dimColor>Enter to continue • Esc to go back</Text>
				</Box>
			</Box>
		)
	}

	if (step === 'org') {
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
						Organization (Optional)
					</Text>
				</Box>
				<Box
					marginX={2}
					marginBottom={1}
				>
					<Text>Enter organization (com.example):</Text>
				</Box>
				<Box marginX={2}>
					<TextInput
						value={org}
						onChange={setOrg}
						onSubmit={handleOrgSubmit}
						placeholder="com.example"
					/>
				</Box>
				<Box marginTop={1}>
					<Text dimColor>Enter to continue • Esc to go back</Text>
				</Box>
			</Box>
		)
	}

	if (step === 'confirm') {
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
						Confirm Creation
					</Text>
				</Box>
				<Box
					marginX={2}
					flexDirection="column"
					marginBottom={1}
				>
					<Text>
						Template: <Text color="green">{selectedTemplate?.label}</Text>
					</Text>
					<Text>
						Project Name: <Text color="green">{projectName}</Text>
					</Text>
					<Text>
						Organization: <Text color="green">{org || 'default'}</Text>
					</Text>
				</Box>
				<Box marginTop={1}>
					<Text
						bold
						color="yellow"
					>
						Press Enter to create project
					</Text>
				</Box>
				<Box marginTop={1}>
					<Text dimColor>Enter to confirm • Esc to go back</Text>
				</Box>
			</Box>
		)
	}

	if (step === 'running') {
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
						Creating Flutter Project...
					</Text>
				</Box>
				<Box
					flexDirection="column"
					borderStyle="round"
					borderColor="yellow"
					padding={1}
				>
					<Text color="yellow">Running: flutter create {projectName}</Text>
				</Box>
				<Box marginTop={1}>
					<Text dimColor>Please wait...</Text>
				</Box>
			</Box>
		)
	}

	if (step === 'done') {
		return (
			<Box
				flexDirection="column"
				padding={1}
			>
				<Box marginBottom={1}>
					<Text
						bold
						color="green"
					>
						✓ Project created successfully!
					</Text>
				</Box>
				<Box
					marginX={2}
					flexDirection="column"
				>
					<Text>
						Project: <Text color="cyan">{projectName}</Text>
					</Text>
					<Text>Location: ./ {projectName}</Text>
				</Box>
				<Box marginTop={1}>
					<Text dimColor>Press Esc to go back</Text>
				</Box>
			</Box>
		)
	}

	if (step === 'error') {
		return (
			<Box
				flexDirection="column"
				padding={1}
			>
				<Box marginBottom={1}>
					<Text
						bold
						color="red"
					>
						✗ Failed to create project
					</Text>
				</Box>
				<Box
					marginX={2}
					flexDirection="column"
				>
					<Text dimColor>{output}</Text>
				</Box>
				<Box marginTop={1}>
					<Text dimColor>Press Esc to go back</Text>
				</Box>
			</Box>
		)
	}

	return null
}
