import axios from "axios"

function getRepositories(options) {
    return axios.get(`https://api.github.com/search/repositories`, { 
        params: { 
            q: options.q,
            per_page: 10,
            page: options.page
        } 
    } )
}

export  {getRepositories};