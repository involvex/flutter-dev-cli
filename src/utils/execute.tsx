import React, {useState, useEffect} from 'react'
import {spawn} from 'child_process'
import {Text, Box} from 'ink'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ExecuteCommandProps {
	command: string
	args: string[]
	onComplete: (success: boolean, output: string) => void
	onCancel?: () => void
}

export function useExecuteCommand(
	command: string,
	args: string[],
	onComplete: (success: boolean, output: string) => void,
) {
	const [output, setOutput] = useState<string>('')
	const [isRunning, setIsRunning] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		setIsRunning(true)
		setOutput('')
		setError(null)

		const child = spawn(command, args, {
			shell: true,
			stdio: ['pipe', 'pipe', 'pipe'],
		})

		let outputBuffer = ''

		child.stdout?.on('data', data => {
			const text = data.toString()
			outputBuffer += text
			setOutput(outputBuffer)
		})

		child.stderr?.on('data', data => {
			const text = data.toString()
			outputBuffer += text
			setOutput(outputBuffer)
		})

		child.on('error', err => {
			setError(err.message)
			setIsRunning(false)
			onComplete(false, err.message)
		})

		child.on('close', code => {
			setIsRunning(false)
			if (code === 0) {
				onComplete(true, outputBuffer)
			} else {
				onComplete(false, outputBuffer || `Process exited with code ${code}`)
			}
		})

		return () => {
			child.kill()
		}
	}, [command, args.join(' ')])

	return {output, isRunning, error}
}

export function CommandOutput({output}: {output: string}) {
	const lines = output.split('\n').slice(-20)
	return (
		<Box
			flexDirection="column"
			padding={1}
		>
			{lines.map((line, i) => (
				<Text
					key={i}
					dimColor
				>
					{line}
				</Text>
			))}
		</Box>
	)
}

export function CommandResult({
	success,
	message,
}: {
	success: boolean
	message: string
}) {
	return (
		<Box
			flexDirection="column"
			padding={1}
			borderStyle="round"
			borderColor={success ? 'green' : 'red'}
		>
			<Text
				bold
				color={success ? 'green' : 'red'}
			>
				{success ? '✓ Command completed successfully' : '✗ Command failed'}
			</Text>
			<Text dimColor>{message}</Text>
		</Box>
	)
}

export async function checkFlutterInstalled(): Promise<boolean> {
	return new Promise(resolve => {
		const child = spawn('flutter', ['--version'], {shell: true})
		child.on('close', code => {
			resolve(code === 0)
		})
		child.on('error', () => {
			resolve(false)
		})
	})
}

export async function checkDartInstalled(): Promise<boolean> {
	return new Promise(resolve => {
		const child = spawn('dart', ['--version'], {shell: true})
		child.on('close', code => {
			resolve(code === 0)
		})
		child.on('error', () => {
			resolve(false)
		})
	})
}
