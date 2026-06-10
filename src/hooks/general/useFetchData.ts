import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/API_URL";
import { Category } from "../../interfaces/category";
import { Social } from "../../interfaces/socail";
import { Product } from "../../interfaces/product";

export interface useFetchDataProps {
    endpoint: string;
    params: any
}


interface dataResponse {
    categories: Category[]
    product: Product
    related_product: Product[]
    socials: Social[]
}
export default function useFetchData({ endpoint, params }: useFetchDataProps) {

    const [data, setData] = useState<dataResponse>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);


    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/${endpoint}`, { params })
            setData(response.data)

        } catch (error) {

            if (error instanceof Error) {
                setError(error.message);
            }
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [endpoint, params])

    return { data, loading, error }
}