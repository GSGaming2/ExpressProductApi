import axios from 'axios'

export const fetchExternalProduct = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    return response.data
}

export const mapToProduct = (item: any) => ({
    externalId: item.id.toString(),
    id: item.id,
    title: item.title,
    completed: item.completed
})