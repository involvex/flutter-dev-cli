import SelectInput from '../components/select-input.js'
import {readdir, readFile} from 'fs/promises'
import {useState, useEffect} from 'react'
import {Text, Box, useInput} from 'ink'
import TextInput from 'ink-text-input'
import {join} from 'path'

interface DocFile {
	name: string
	path: string
	title: string
}

interface DocCategory {
	id: string
	name: string
	path: string
}

const categories: DocCategory[] = [
	{id: 'root', name: 'Index', path: '.'},
	{id: 'about', name: 'About', path: 'about'},
	{id: 'contributing', name: 'Contributing', path: 'contributing'},
	{id: 'ecosystem', name: 'Ecosystem', path: 'ecosystem'},
	{id: 'engine', name: 'Engine', path: 'engine'},
	{id: 'infra', name: 'Infrastructure', path: 'infra'},
	{id: 'platforms', name: 'Platforms', path: 'platforms'},
	{id: 'releases', name: 'Releases', path: 'releases'},
	{id: 'roadmap', name: 'Roadmap', path: 'roadmap'},
	{id: 'tool', name: 'Tool', path: 'tool'},
	{id: 'wiki_archive', name: 'Wiki Archive', path: 'wiki_archive'},
]

async function findDocs(
	dir: string,
	basePath: string = 'docs',
): Promise<DocFile[]> {
	const docs: DocFile[] = []
	try {
		const entries = await readdir(dir, {withFileTypes: true})
		for (const entry of entries) {
			if (entry.isFile() && entry.name.endsWith('.md')) {
				const relativePath = join(basePath, entry.name)
				const title = entry.name.replace(/\.md$/, '').replace(/-/g, ' ')
				docs.push({
					name: entry.name,
					path: relativePath,
					title,
				})
			} else if (entry.isDirectory() && !entry.name.startsWith('.')) {
				const subDir = join(dir, entry.name)
				const subDocs = await findDocs(subDir, join(basePath, entry.name))
				docs.push(...subDocs)
			}
		}
	} catch {
		// Ignore errors
	}
	return docs
}

async function readDocContent(docPath: string): Promise<string> {
	try {
		const content = await readFile(docPath, 'utf-8')
		// Extract first 50 lines and remove markdown syntax
		const lines = content.split('\n').slice(0, 50)
		return lines
			.map(line =>
				line.replace(/^#+\s*/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'),
			)
			.filter(line => line.trim())
			.join('\n')
	} catch {
		return 'Unable to read document'
	}
}

async function searchDocs(query: string, docs: DocFile[]): Promise<DocFile[]> {
	if (!query) return []
	const lowerQuery = query.toLowerCase()
	const results: DocFile[] = []
	for (const doc of docs) {
		if (
			doc.title.toLowerCase().includes(lowerQuery) ||
			doc.path.toLowerCase().includes(lowerQuery)
		) {
			results.push(doc)
		}
	}
	return results.slice(0, 10)
}

export default function FlutterDocs({onBack}: {onBack: () => void}) {
	const [view, setView] = useState<
		'categories' | 'docs' | 'content' | 'search'
	>('categories')
	const [selectedCategory, setSelectedCategory] = useState<DocCategory | null>(
		null,
	)
	const [docFiles, setDocFiles] = useState<DocFile[]>([])
	const [selectedDoc, setSelectedDoc] = useState<DocFile | null>(null)
	const [docContent, setDocContent] = useState<string>('')
	const [searchQuery, setSearchQuery] = useState('')
	const [searchResults, setSearchResults] = useState<DocFile[]>([])
	const [allDocs, setAllDocs] = useState<DocFile[]>([])

	useEffect(() => {
		findDocs('docs').then(docs => {
			setAllDocs(docs)
		})
	}, [])

	const handleCategorySelect = async (item: {label: string; value: string}) => {
		const cat = categories.find(c => c.id === item.value)
		if (cat) {
			setSelectedCategory(cat)
			const docs = await findDocs(join('docs', cat.path))
			setDocFiles(docs)
			setView('docs')
		}
	}

	const handleDocSelect = async (item: {label: string; value: string}) => {
		const doc = docFiles.find(d => d.path === item.value)
		if (doc) {
			setSelectedDoc(doc)
			const content = await readDocContent(doc.path)
			setDocContent(content)
			setView('content')
		}
	}

	const handleSearch = async () => {
		const results = await searchDocs(searchQuery, allDocs)
		setSearchResults(results)
		setView('search')
	}

	useInput((_input, key) => {
		if (key.escape) {
			if (view === 'content') {
				setView('docs')
			} else if (view === 'docs' || view === 'search') {
				setView('categories')
			} else {
				onBack()
			}
		}
	})

	// Search view
	if (view === 'search') {
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
						Search Results: "{searchQuery}"
					</Text>
				</Box>
				{searchResults.length > 0 ? (
					<SelectInput
						items={searchResults.map(d => ({
							label: d.title,
							value: d.path,
						}))}
						onSelect={handleDocSelect}
					/>
				) : (
					<Text dimColor>No results found</Text>
				)}
				<Box marginTop={1}>
					<Text dimColor>Enter Select • Esc Back</Text>
				</Box>
			</Box>
		)
	}

	// Content view
	if (view === 'content' && selectedDoc) {
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
						{selectedDoc.title}
					</Text>
				</Box>
				<Box
					flexDirection="column"
					borderStyle="round"
					padding={1}
					minHeight={15}
				>
					<Text>{docContent}</Text>
				</Box>
				<Box marginTop={1}>
					<Text dimColor>Path: {selectedDoc.path}</Text>
				</Box>
				<Box marginTop={1}>
					<Text dimColor>Esc Back</Text>
				</Box>
			</Box>
		)
	}

	// Docs list view
	if (view === 'docs' && selectedCategory) {
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
						{selectedCategory.name} Docs
					</Text>
				</Box>
				{docFiles.length > 0 ? (
					<SelectInput
						items={docFiles.map(d => ({
							label: d.title,
							value: d.path,
						}))}
						onSelect={handleDocSelect}
					/>
				) : (
					<Text dimColor>No docs in this category</Text>
				)}
				<Box marginTop={1}>
					<Text dimColor>Enter Select • Esc Back</Text>
				</Box>
			</Box>
		)
	}

	// Categories view
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
					Flutter Docs
				</Text>
			</Box>
			<Box
				marginX={2}
				marginBottom={1}
			>
				<Text dimColor>Select a category:</Text>
			</Box>
			<SelectInput
				items={categories.map(c => ({
					label: c.name,
					value: c.id,
				}))}
				onSelect={handleCategorySelect}
			/>
			<Box
				marginTop={1}
				flexDirection="column"
			>
				<Text
					bold
					color="magenta"
				>
					Search:
				</Text>
				<TextInput
					value={searchQuery}
					onChange={setSearchQuery}
					onSubmit={handleSearch}
					placeholder="Search docs..."
				/>
			</Box>
			<Box marginTop={1}>
				<Text dimColor>Enter Select • Type to search • Esc Back</Text>
			</Box>
		</Box>
	)
}
