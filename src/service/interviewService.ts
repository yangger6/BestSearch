import service from './index'

type IResponseStatusType = 'FAIL' | 'OK'

interface IBaseResponse<T> {
    status: IResponseStatusType
    msg: string
    data: T
}
export type IProductItem = {
    id: number
    image: string
    price: string
    published_at: string
    store_domain: string
    title: string
}
export type IProductLaunchItem = {
    key: number
    doc_count: number
    key_as_string: string
}
export type IProductTrendItem = {
    name: string
    date: string
    search_msv: Array<{
        date: string
        sv: number
    }>
}
interface IKeywordSearchData {
    products: IProductItem[]
    product_trends: IProductTrendItem[]
    product_launch_data: IProductLaunchItem[]
}

/**
 * fetch product
 * @param {string} keyword - keyword
 */
export const keywordSearch = (keyword: string) => {
    return service.post<IBaseResponse<IKeywordSearchData>>(
        '/api/interview/keyword_search',
        {
            search_phrase: keyword,
        }
    )
}

/**
 * fetch remote options
 * @param {string} keyword - keyword
 */
export const optionsSearch = async (keyword: string) => {
    const delay = (t: number) =>
        new Promise((resolve) => setTimeout(resolve, t))
    await delay(500)
    return ['Best cat toys', 'Best Shoes', 'hat'].filter(
        (word) => word.indexOf(keyword) > -1
    )
}
