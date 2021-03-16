import React, { useState } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import useFetchJobs from './useFetchJobs'


function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)  
  const { jobs, error, loading,hasNextPage } = useFetchJobs(params, page);
  function handleParamChange(e){
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams(prevParams=>{
      return {...prevParams, [param]:value};
    })
  }
  return (
    <Container className="my-4">
        <h1>Github Jobs</h1>
        <SearchForm params={params} onParamChange={handleParamChange}></SearchForm>
         <JobsPagination page = {page} setPage = {setPage} hasNextPage = {hasNextPage}/>
        {loading && <h1>Loading...</h1>}
        {jobs.map(job=>{
            return <Job key={job.id} job={job}></Job>
        })}
        <JobsPagination page = {page} setPage = {setPage} hasNextPage={hasNextPage}/>
    </Container>
  )
}

export default App;