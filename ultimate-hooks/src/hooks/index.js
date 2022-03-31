import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
 export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    // ...
    useEffect( async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    }, [baseUrl])
  
  
    const create = async (resource) => {
      const response = await axios.post(baseUrl, resource);
      const newResouce = response.data;
      setResources(resources.concat(newResouce))    
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }