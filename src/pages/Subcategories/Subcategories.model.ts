export interface SubcategoriesModel {
    id: number
    title: string
    parent: number[]
    child: number[]
    popular: boolean
    question: number[]
    link: string
}