import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const fetchReviews = async () => {
    const { data } = await supabase
      .from('Reviews')
      .select();
    setReviews(data);
  }
  useEffect(() => {
    fetchReviews();
  }, [])
  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          return <Card review={review} key={review.id}/>
        })
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  )
}

export default AllReviews;