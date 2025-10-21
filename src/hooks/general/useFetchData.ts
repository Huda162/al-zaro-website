import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/API_URL";
import { Prdouct } from "../../interfaces/product";
import { Category } from "../../interfaces/category";
import { Social } from "../../interfaces/socail";

export interface useFetchDataProps {
    endpoint: string;
    params: any
}


interface dataResponse {
    categories: Category[]
    product: Prdouct
    related_product: Prdouct[]
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