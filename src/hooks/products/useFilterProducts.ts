import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../constants/API_URL"
import { Prdouct } from "../../interfaces/product"


interface filteredProductResponse {
    data: Prdouct[]
}
const useFilterProducts = (param: any) => {

    const [filteredProducts, setFilteredProducts] = useState<filteredProductResponse>()
    const [loading, setLoading] = useState(true)


    const [filters, setFilters] = useState({
        categoryId: Number(param.id),
        sortBy: '',
        name: ''
    })

    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            categoryId: Number(param.id)
        }));
    }, [param.id])


    const handleSortChange = (sortBy: string) => {
        setFilters(prev => ({
            ...prev, sortBy: sortBy,
        }))
    }

    const handleNameChange = (name: string) => {
        setFilters(prev => ({
            ...prev, name: name
        }))
    }

    const filterProduct = async () => {

        const params: any = {}

        params.category_id = filters.categoryId

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
        filteredProducts,
        filters,
        loading,
        param

    }
}

export default useFilterProducts