export interface Transaction {
    id: string,
    type: string,
    date: Date,
    isCurrent: boolean,
    source?: string,
    receiver?: string,
    category: string,
    value: number,
    title: string
}