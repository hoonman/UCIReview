import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import more from '../components/more.png';

const Card =({review}) => {
  return (
    <div className="card">
      {/* <Link to={'edit/' + review.id + "/" + review.professor + "/" + review.course}><img className="moreButton" alt="edit button" src={more}></img></Link> */}
      <Link to={'edit/' + review.id}><img className="moreButton" alt="edit button" src={more}></img></Link>
      <h1 className="card-professor">{review.professor}</h1>
      <h3 className="card-course">{review.course}</h3>
      <p className="card-description">{review.description}</p>
      <p className="card-rating">{review.rating}</p>
      <p className="card-difficulty">{review.difficulty}</p>
      {/* <Link to={`/reviews/${review.id}`}>Read More</Link> */}

    </div>
  )
}

export default Card;