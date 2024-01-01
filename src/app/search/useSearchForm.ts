import { SearchFormData } from "./types";

export function useSearchForm() {
    return { getInitialValue, serializeForm }
}

function getInitialValue(defaultValue: SearchFormData, params: URLSearchParams): SearchFormData {
    const result = { ...defaultValue }
    const paramData = deserializeParams(params)

    result.text = paramData.text || defaultValue.text
    result.salary = paramData.salary || defaultValue.salary
    result.clearance = paramData.clearance || defaultValue.clearance
    result.skills.include = paramData.skills?.include.length ? paramData.skills.include : defaultValue.skills.include
    result.skills.exclude = paramData.skills?.exclude.length ? paramData.skills.exclude : defaultValue.skills.exclude
    result.duties.include = paramData.duties?.include.length ? paramData.duties.include : defaultValue.duties.include
    result.duties.exclude = paramData.duties?.exclude.length ? paramData.duties.exclude : defaultValue.duties.exclude

    return result
}

/**
 * Convert form data to query params
 */
function serializeForm(data: SearchFormData): URLSearchParams {
    const params = new URLSearchParams()

    if (data.text) {
        params.set('text', data.text)
    }

    switch (data.clearance) {
        case "any":
            break;
        case "no":
        case "yes":
            params.set('clearance', data.clearance)
            break
    }

    if (data.salary > 0) {
        params.set('salary', data.salary.toString())
    }

    data.skills.include
        .filter(({ name }) => !!name)
        .map(({ name, yoe }) => `${name},${yoe}`)
        .forEach(text => params.append('skills-included', text))

    data.skills.exclude
        .filter(({ name }) => !!name)
        .forEach(({ name }) => params.append('skills-included', name))

    data.duties.include
        .filter(({ value }) => !!value)
        .forEach(({ value }) => params.append('duties-included', value))

    data.duties.exclude
        .filter(({ value }) => !!value)
        .forEach(({ value }) => params.append('duties-excluded', value))

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

    const clearance = params.get('clearance') as any
    if (['no', 'yes'].includes(clearance)) {
        data['clearance'] = clearance
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

        data.duties.include = dutiesIncluded.map(value => ({ value }))
    }

    return data
}