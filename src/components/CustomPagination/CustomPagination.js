import { Container, Pagination } from "react-bootstrap";

const CustomPagination = props => {
    const { count, setPage, page } = props;

    const fistPage = () => {
        setPage(1)
    }
    const nextPage = () => {
        setPage(page + 1);
    }
    function prevPage() {
        setPage(page - 1);
    }

    function lastPage() {
        setPage(count)
    }
    return (
        <>
            <Container className="d-flex justify-content-center" >
                <Pagination hidden={count === 0}>
                    <Pagination.First disabled={page === 1} onClick={fistPage} />
                    <Pagination.Prev disabled={page === 1} onClick={prevPage} />
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Next disabled={page === count} onClick={nextPage} />
                    <Pagination.Last disabled={page === count} onClick={lastPage} />
                </Pagination>
            </Container>
        </>
    )
}

export default CustomPagination;