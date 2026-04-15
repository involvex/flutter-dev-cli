#!/usr/bin/env node
import {flutterTemplates} from './data/templates.js'
import DisplayVersion from './commands/version.js'
import About from './commands/about.js'
import {execSync} from 'child_process'
import Help from './commands/help.js'
import App from './app.js'
import {render} from 'ink'
import meow from 'meow'

function checkFlutterInstalled(): boolean {
	try {
		execSync('flutter --version', {stdio: 'ignore'})
		return true
	} catch {
		return false
	}
}

function listTemplates() {
	// eslint-disable-next-line no-console
	console.log('Available Flutter templates:\n')
	for (const template of flutterTemplates) {
		// eslint-disable-next-line no-console
		console.log(`  ${template.id.padEnd(10)} - ${template.description}`)
	}
	// eslint-disable-next-line no-console
	console.log('')
	process.exit(0)
}

function createProject(options: {
	template: string
	name: string
	org?: string
	directory?: string
}) {
	const template = flutterTemplates.find(t => t.id === options.template)

	if (!template) {
		// eslint-disable-next-line no-console
		console.error(
			`Template '${options.template}' not found. Run 'flutter-dev-cli list-templates' for available options.`,
		)
		process.exit(1)
	}

	if (!checkFlutterInstalled()) {
		// eslint-disable-next-line no-console
		console.error('Flutter is not installed or not in PATH')
		process.exit(1)
	}

	const args: string[] = ['create']

	if (template.id !== 'app') {
		args.push(template.flutterCreateArg)
	}

	if (options.org) {
		args.push('--org', options.org)
	}

	if (options.directory) {
		args.push('--project-name', options.name, options.directory)
	} else {
		args.push(options.name)
	}

	// eslint-disable-next-line no-console
	console.log(`Creating Flutter project with template: ${template.label}`)
	// eslint-disable-next-line no-console
	console.log(`Running: flutter ${args.join(' ')}\n`)

	try {
		execSync(`flutter ${args.join(' ')}`, {stdio: 'inherit'})
		// eslint-disable-next-line no-console
		console.log('\nProject created successfully!')
		process.exit(0)
	} catch {
		// eslint-disable-next-line no-console
		console.error('\nFailed to create project')
		process.exit(1)
	}
}

const cli = meow(
	`
Usage
  $ flutter-dev-cli
  $ flutter-dev-cli create --template <template> --name <name> [options]
  $ flutter-dev-cli list-templates

Commands
  create              Create a new Flutter project
  list-templates     List available templates

Options
  --version           Show version
  --about             Show about
  --help              Show help
  --template, -t      Template ID (required for create)
  --name, -n         Project name (required for create)
  --org, -o           Organization (optional)
  --directory, -d    Target directory (optional)

Examples
  $ flutter-dev-cli list-templates
  $ flutter-dev-cli create -t app -n my_app
  $ flutter-dev-cli create -t plugin -n my_plugin -o com.example
  $ flutter-dev-cli create -t skeleton -n my_app -d ./projects
`,
	{
		importMeta: import.meta,
		flags: {
			version: {
				type: 'boolean',
			},
			about: {
				type: 'boolean',
			},
			help: {
				type: 'boolean',
			},
			template: {
				type: 'string',
				shortFlag: 't',
			},
			name: {
				type: 'string',
				shortFlag: 'n',
			},
			org: {
				type: 'string',
				shortFlag: 'o',
			},
			directory: {
				type: 'string',
				shortFlag: 'd',
			},
		},
	},
)

const [command] = cli.input

if (cli.flags.help || cli.input[0] === 'help') {
	render(<Help />)
} else if (cli.flags.version || cli.input[0] === 'version') {
	render(<DisplayVersion />)
} else if (cli.flags.about || cli.input[0] === 'about') {
	render(<About />)
} else if (command === 'list-templates') {
	listTemplates()
} else if (command === 'create') {
	if (!cli.flags.template) {
		// eslint-disable-next-line no-console
		console.error('Error: --template (or -t) is required for create command')
		// eslint-disable-next-line no-console
		console.error(
			'Run "flutter-dev-cli list-templates" to see available templates',
		)
		process.exit(1)
	}

	if (!cli.flags.name) {
		// eslint-disable-next-line no-console
		console.error('Error: --name (or -n) is required for create command')
		process.exit(1)
	}

	createProject({
		template: cli.flags.template,
		name: cli.flags.name,
		org: cli.flags.org,
		directory: cli.flags.directory,
	})
} else if (command === undefined) {
	render(<App />)
} else {
	// eslint-disable-next-line no-console
	console.error(`Unknown command: ${command}`)
	// eslint-disable-next-line no-console
	console.error('Run "flutter-dev-cli --help" for usage information')
	process.exit(1)
}
