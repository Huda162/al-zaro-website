import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../constants/API_URL"
import { Product } from "../../interfaces/product"


interface filteredProductResponse {
    data: Product[]
    total: number
    links: any[]
    current_page: number
    last_page: number
    per_page: number
    from: number
    to: number
    next_page_url: string | null
    prev_page_url: string | null
}

const useFilterProducts = (param: any) => {

    const [filteredProducts, setFilteredProducts] = useState<filteredProductResponse>()
    const [loading, setLoading] = useState(true)


    const [filters, setFilters] = useState({
        categoryId: Number(param.id),
        sortBy: '',
        name: '',
        page: 1
    })

    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            categoryId: Number(param.id),
            page: 1
        }));
    }, [param.id])


    const handleSortChange = (sortBy: string) => {
        setFilters(prev => ({
            ...prev, sortBy: sortBy, page: 1
        }))
    }

    const handleNameChange = (name: string) => {
        setFilters(prev => ({
            ...prev, name: name, page: 1
        }))
    }

    const handlePageChange = (page: number) => {
        setFilters(prev => ({
            ...prev, page: page
        }))
    }

    const filterProduct = async () => {

        const params: any = {}

        params.category_id = filters.categoryId
        params.page = filters.page

        if (filters.sortBy == 'latest') {
            params.latest = filters.sortBy
        } else if (filters.sortBy == 'most_ordered') {
            params.most_ordered = filters.sortBy
        }
        if (filters.name !== '') {
            params.name = filters.name
        }


        try {
            const response = await axios.get(
                `${API_URL}/filter_products`,
                {
                    params: params,
                }

            );
            setFilteredProducts(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    return {

        handleSortChange,
        filterProduct,
        handleNameChange,
        handlePageChange,
        filteredProducts,
        filters,
        loading,
        param

    }
}

export default useFilterProducts