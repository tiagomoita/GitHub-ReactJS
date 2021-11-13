import { getRepositories } from "../../API/gh"
import { useState, useEffect } from "react";
import { Card, FormGroup, Form, FormControl, Button } from "react-bootstrap";
import "./style.css"

const Search = (props) => {
    const { page, setValue, count, setloading } = props;
    const [search, setSearch] = useState('')

    const setPage = (size) => {
        size = (size / 10)
        size > 100 ? size = 100 : size = Math.ceil(size)
        return size
    }

    const clearSearch = _ =>{
        setSearch('');
        setValue([]);
        count(0)
    }

    async function fetchRepositories() {
        try {
            setloading(true)
            const result = await getRepositories({ q: search, page });
            setValue(result.data.items)
            count(setPage(result.data.total_count))
        } catch (err) {
            console.error(err);
            clearSearch();
            setloading(false);

        } finally {
            setloading(false);
        }
    }

    useEffect(() => {
        fetchRepositories();
    }, [page]);

    return (
        <>
            <div id="search" className="d-flex justify-content-center">
                <Card className="border-0 bg-light">
                    <div className="card-body">
                        <h5 className="card-title mb-4 ">Search GitHub Repos</h5>
                        <Form>
                            <FormGroup>
                                <FormControl value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="" />
                            </FormGroup>
                            <FormGroup className="d-flex justify-content-end mb-0">
                                <Button className="mr-2" onClick={fetchRepositories}>Search</Button>
                                <Button variant="dark" onClick={clearSearch}>Clear</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Search;