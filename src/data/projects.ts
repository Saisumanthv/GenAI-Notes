// Parsed at load time from projects.md (one "## Category (n)" section per category,
// one "### n. Title" block per project).
import raw from './projects.md?raw'

export type Project = {
  id: number
  title: string
  domain: string
  stack: string[]
  features: string[]
}

export type ProjectCategory = {
  id: number
  title: string
  projects: Project[]
}

function parse(md: string): ProjectCategory[] {
  const categories: ProjectCategory[] = []
  let category: ProjectCategory | undefined
  let project: Project | undefined
  let inFeatures = false
  let projectId = 1

  for (const line of md.split(/\r?\n/)) {
    const cat = line.match(/^##\s+(.+?)\s*(?:\(\d+\))?\s*$/)
    if (cat && !line.startsWith('###')) {
      category = { id: categories.length + 1, title: cat[1], projects: [] }
      categories.push(category)
      project = undefined
      continue
    }
    const proj = line.match(/^###\s+(?:\d+\.\s*)?(.+?)\s*$/)
    if (proj && category) {
      project = { id: projectId++, title: proj[1], domain: '', stack: [], features: [] }
      category.projects.push(project)
      inFeatures = false
      continue
    }
    if (!project) continue

    const domain = line.match(/^-\s+\*\*Domain:\*\*\s*(.+)$/)
    if (domain) {
      project.domain = domain[1].trim()
      continue
    }
    const stack = line.match(/^-\s+\*\*Tech Stack:\*\*\s*(.+)$/)
    if (stack) {
      // Split on commas that are not inside parentheses, e.g. "PEFT (LoRA, QLoRA)"
      project.stack = stack[1].split(/,(?![^(]*\))/).map((s) => s.trim()).filter(Boolean)
      continue
    }
    if (/^-\s+\*\*Core Features/.test(line)) {
      inFeatures = true
      continue
    }
    const item = line.match(/^\s+-\s+(.+)$/)
    if (inFeatures && item) project.features.push(item[1].trim())
  }
  return categories
}

export const PROJECT_CATEGORIES: ProjectCategory[] = parse(raw)
