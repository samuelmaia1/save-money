import { Transaction } from "./Transaction";

export interface CreateUser {
    name: string,
    lastName: string,
    email: string,
    password: string,
}

export interface User {
    id: string,
    name: string,
    lastName: string,
    email: string,
    transactions: Transaction[]
}