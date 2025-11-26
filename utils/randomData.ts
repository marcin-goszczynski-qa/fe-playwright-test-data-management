export const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

export const randomFromWords = (count = 2) => {
    const words = [
        'alpha',
        'beta',
        'gamma',
        'delta',
        'epsilon',
        'omega',
        'lorem',
        'ipsum',
        'nova',
        'solar',
        'node',
        'stack',
        'cloud',
        'dev',
        'byte',
        'pixel',
        'matrix',
        'quantum',
        'neo',
        'prime',
    ]
    return Array.from({ length: count }, () => pick(words)).join(' ')
}

export const randomName = () => {
    const first = pick([
        'Alice',
        'Bob',
        'Carol',
        'David',
        'Eve',
        'Frank',
        'Grace',
        'Heidi',
        'Ivan',
        'Judy',
    ])
    const last = pick([
        'Nowak',
        'Kowalski',
        'Wiśniewski',
        'Wójcik',
        'Kaczmarek',
        'Zieliński',
        'Szymański',
        'Lewandowski',
    ])
    return `${first} ${last}`
}

export const randomUsername = () => {
    const base = randomName().toLowerCase().replace(/\s+/g, '.')
    return `${base}${randomInt(1, 999)}`
}

export const randomEmail = (username?: string) => {
    const domain = pick([
        'example.com',
        'mail.com',
        'test.dev',
        'acme.co',
        'example.org',
    ])
    const user = username
        ? username.replace(/\s+/g, '.').toLowerCase()
        : `user${randomInt(100, 999)}`
    return `${user}@${domain}`
}

export const randomPhone = () => {
    if (Math.random() < 0.5) {
        return `+48-${randomInt(100, 999)}-${randomInt(100, 999)}-${randomInt(100, 999)}`
    }
    return `${randomInt(100, 999)}-${randomInt(100, 999)}`
}

export const randomWebsite = () => {
    const name = randomFromWords(1).replace(/\s+/g, '')
    const tld = pick(['com', 'dev', 'io', 'pl', 'org'])
    return `${name.toLowerCase()}.${tld}`
}

export const randomZip = () => {
    return `${randomInt(10, 99)}-${randomInt(100, 999)}`
}

export const randomGeo = () => {
    const lat = (Math.random() * 180 - 90).toFixed(6)
    const lng = (Math.random() * 360 - 180).toFixed(6)
    return { lat, lng }
}

export const randomCompany = () => ({
    name: randomFromWords(2),
    catchPhrase: randomFromWords(3),
    bs: randomFromWords(2),
})
