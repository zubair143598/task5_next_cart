import React from "react";

const Pagination2 = ({totalPosts, postsPerPage,currentPage,setCurrentPage}) => {
  let pages = [];
  for (let i= 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  const goToPrevPage = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
  };

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };
  return (
  <div className="flex">
            

      <button  onClick={goToPrevPage}
        disabled={currentPage === 1}   className="bg-red-700 px-4 py-2 mx-3 rounded-xl" >prev</button>
    {
        pages.map((page,index)=>{
            return (
                <div key={index}>
                    <button onClick={()=>setCurrentPage(page)} className="mx-4" key={index}>{page}</button>
                </div>
            )
        })
    }
            <button  onClick={goToNextPage}
        disabled={currentPage === Math.ceil(totalPosts / postsPerPage)} 
        className="bg-green-700 px-4 py-2 mx-3 rounded-xl" >Next</button>

  </div>
)};

export default Pagination2;
