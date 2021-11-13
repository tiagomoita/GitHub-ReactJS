import CustomCard from "../CustomCard/CustomCard"
import CustomNavbar from "../CustomNavbar/CustomNavbar"
import Search from "../Search/Search"
import { useState } from "react"
import { Container, Spinner, Image } from "react-bootstrap"
import CustomPagination from "../CustomPagination/CustomPagination"
import "./style.css"
import img from "../../assets/pasta.png";

const Home = props => {
    const [repositories, setRepositores] = useState([])
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [loading, setloading] = useState(true)
    return (
        <>
            <CustomNavbar />
            <Search setValue={setRepositores} page={page} count={setCount} setloading={setloading} />
            <Container className="d-flex justify-content-around flex-wrap" fluid>
                {loading ?
                    <Spinner id="loading-search" animation="border" className="m-5" /> :
                    repositories.map(repo => (
                        <CustomCard _id={repo.id} user={props.location.state} key={repo.id} image={repo.owner.avatar_url} url={repo.git_url} title={repo.name} subTitle={repo.full_name} description={repo.description} repoUrl={repo.archive_url} language={repo.language} />
                    ))
                }
                {(repositories.length === 0 && !loading) &&
                    <>
                        <div className="d-flex justify-content-center flex-column text-center">
                            <Image src={img} width="300px" />
                            <h2>NO RESULTS FOUND</h2>
                        </div>
                    </>
                }
            </Container>
            {!loading ?
                <CustomPagination page={page} setPage={setPage} count={count} /> : ""
            }

        </>
    )
}

export default Home;