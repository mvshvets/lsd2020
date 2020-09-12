export interface ServicesModel {
    id: number
    full_name: string
    name: string[]
    voice_docs: string[]
    print_docs: string[]
    to: string
    comment: string
}

export interface ServicesUrlParamsModel {
    id?: string
}