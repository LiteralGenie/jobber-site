export function useSearchForm() {
    return { formToParams, deserializeParams }
}

/**
 * Convert form data to query params
 */
function formToParams(raw: FormData): URLSearchParams {
    const params: SearchParamsData = {}

    const text = raw.get("text") as string
    if (text.length) {
        params["text"] = text
    }

    if (raw.get("clearance-no")) {
        params["clearance"] = false
    } else if (raw.get("clearance-yes")) {
        params["clearance"] = true
    }

    const salaryRaw = raw.get("salary") as string
    const salary = salaryRaw ? parseInt(salaryRaw) : NaN
    if (!isNaN(salary)) {
        params["salary"] = salary
    }

    const namesIncluded = raw.getAll("include-skill-name") as string[]
    const yoeIncluded = raw.getAll("include-skill-yoe") as string[]
    const skillsIncluded = namesIncluded.flatMap((name, idx) => {
        if (!name.length) {
            return []
        }

        const yoeRaw = yoeIncluded[idx]
        const yoe = parseInt(yoeRaw)
        if (isNaN(yoe)) {
            return []
        }

        return [{ name, yoe }]
    })
    if (skillsIncluded.length) {
        params["skills-included"] = skillsIncluded
    }

    const skillsExcluded = raw
        .getAll("exclude-skill")
        .filter((text) => (text as string).length) as string[]
    if (skillsExcluded.length) {
        params["skills-excluded"] = skillsExcluded
    }

    const respsIncluded = raw
        .getAll("include-responsibility")
        .filter((text) => (text as string).length) as string[]
    if (respsIncluded.length) {
        params["duties-included"] = respsIncluded
    }

    const respsExcluded = raw
        .getAll("exclude-responsibility")
        .filter((text) => (text as string).length) as string[]
    if (respsExcluded.length) {
        params["duties-excluded"] = respsExcluded
    }

    const urlParams = serializeParams(params)
    return urlParams
}

function serializeParams(data: SearchParamsData): URLSearchParams {
    const params = new URLSearchParams()

    if (data.text !== undefined) {
        params.set('text', data.text)
    }

    if (data.clearance !== undefined) {
        params.set('clearance', data.clearance.toString())
    }

    if (data.salary !== undefined) {
        params.set('salary', data.salary.toString())
    }

    data['skills-included']
        ?.map(({ name, yoe }) => `${name},${yoe}`)
        .forEach(text => params.append('skills-included', text))

    data['skills-excluded']
        ?.forEach(text => params.append('skills-excluded', text))

    data['duties-included']
        ?.forEach(text => params.append('duties-included', text))

    data['duties-excluded']
        ?.forEach(text => params.append('duties-excluded', text))

    return params
}

function deserializeParams(params: URLSearchParams): Partial<SearchFormData> {
    const data: Partial<SearchFormData> = {}

    const text = params.get('text')
    if (text) {
        data['text'] = text
    }

    const salaryRaw = params.get('salary')
    const salary = salaryRaw ? parseInt(salaryRaw) : NaN
    if (!isNaN(salary)) {
        data['salary'] = salary
    }

    const clearance = params.get('clearance')
    if (clearance === 'true') {
        data['clearance'] = 'yes'
    } else if (clearance === 'false') {
        data['clearance'] = 'no'
    }

    const skillsIncluded = params.getAll('skills-included')
    if (skillsIncluded.length) {
        data.skills = data.skills || {
            include: [],
            exclude: []
        }

        data.skills.include = skillsIncluded.flatMap(text => {
            const [name, yoeRaw] = text.split(',')

            const yoe = parseInt(yoeRaw)
            if (isNaN(yoe)) {
                return []
            }

            return { name, yoe }
        })
    }

    const skillsExcluded = params.getAll('skills-excluded')
    if (skillsExcluded.length) {
        data.skills = data.skills || {
            include: [],
            exclude: []
        }

        data.skills.exclude = skillsExcluded.map(name => ({ name }))
    }

    const dutiesExcluded = params.getAll('duties-excluded')
    if (dutiesExcluded.length) {
        data.duties = data.duties || {
            include: [],
            exclude: []
        }

        data.duties.exclude = dutiesExcluded.map(value => ({ value }))
    }

    const dutiesIncluded = params.getAll('duties-included')
    if (dutiesIncluded.length) {
        data.duties = data.duties || {
            include: [],
            exclude: []
        }

        data.duties.exclude = dutiesIncluded.map(value => ({ value }))
    }

    return data
}