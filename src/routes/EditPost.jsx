import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditPost = ({ data }) => {
  const {id} = useParams();
  const [review, setReview] = useState({professor: '', course: '', description: '', rating: '', difficulty: ''});

  const fetchReview = async () => {
    const { data, error } = await supabase
      .from('Reviews')
      .select()
      .eq('id', id);
    setReview(data[0]);
  }

  useEffect(() => {
    fetchReview();
  }
  , [id]);

  const updatePost = async (event) => {
    event.preventDefault();
    await supabase
      .from('Reviews')
      .update({professor: review.professor, course: review.course, description: review.description, rating: review.rating, difficulty: review.difficulty})
      .eq('id', id);
    window.location = "/reviews";
  }

  const deleteReview = async (event) => {
    event.preventDefault();
    await supabase
      .from('Reviews')
      .delete()
      .eq('id', id);
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
  }
  return (
    <div>
      <form className="review-form">
        <h2>Editing Review for {review.professor}</h2>
        <h3>Course: {review.course}</h3>
        <label>Description: </label>
        <textarea type="text" id="description" name="description" onChange={handleChange}></textarea>
        <label>Rating: </label>
        <input type="text" id="rating" name="rating" onChange={handleChange}></input>
        <label>Difficulty: </label>
        <input type="text" id="difficulty" name="difficulty" onChange={handleChange}></input>
        <button onClick={updatePost}>Update</button>
        <button onClick={deleteReview}>Delete</button>
      </form>
    </div>
  )
}

export default EditPost;