export interface Transaction {
    id?: string,
    type: string,
    date: string,
    source?: string,
    receiver?: string,
    category: string,
    value: number,
    title: string,
    description: string
}