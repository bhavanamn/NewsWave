import React from 'react'
const NewsItem =(props)=> {
    let {title,description,imageUrl,newsUrl,author,date}  = props;
    // destructuring the object
    return (
      <div className="container my-3">
       <div className="card"  >
            <img src={imageUrl ? imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrkRyy_4tUpldmlMmp4keJsNNo5IYXbwJXRw&usqp=CAU" } className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}<span className="badge bg-secondary">New</span></h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author ?author:"Unknown"}on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer"href={newsUrl}target="_blank"className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  
}

export default NewsItem
