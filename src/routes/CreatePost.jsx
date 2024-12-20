import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useLocation } from 'react-router-dom';

const CreatePost = ({}) => {
  const [review, setReview] = useState({professor: '', course: '', description: '', rating: '', difficulty: ''});
  // note that we have already selected the professor, and the course.
  // we need to get the review description, rating, and difficulty from the user in a form

  // function createReview that will connect to supabase and create a new review
  const createReview = async (event) => {
    event.preventDefault();
    await supabase
      .from('Reviews')
      .insert({professor: review.professor, course: review.course, description: review.description, rating: review.rating, difficulty: review.difficulty})
      .select();
    window.location = "/reviews";
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setReview( (prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
    console.log("review: ", review);
  }
  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const selectedProf = queryParams.get('professor');
  const selectedCourse = queryParams.get('course');
  // would like to set review object's professor when the selected professor changes
  useEffect(() => {
    setReview((prev) => {
      return {
        ...prev,
        professor: selectedProf,
        course: selectedCourse
      }
    })
  }
  , [selectedProf, selectedCourse])
  return (
    <div>
      <form className="review-form">
        <h1 className="review-prof">Review: {selectedProf}</h1>
        <h2 className="review-course">Course: {selectedCourse}</h2>
        <label>Description: </label>
        <textarea type="text" id="description" name="description" onChange={handleChange}></textarea>
        <label>Rating: </label>
        <input type="text" id="rating" name="rating" onChange={handleChange}></input>
        <label>Difficulty: </label>
        <input type="text" id="difficulty" name="difficulty" onChange={handleChange}></input>
        <button onClick={createReview}>Submit</button>
      </form>
    </div>
  )
}

export default CreatePost;