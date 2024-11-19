import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchResult, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchResults = async () => {
      const course = searchParams.get('course');
      const professor = searchParams.get('professor');
      console.log("professor: ", professor); // this is the professor from the URL
      console.log("course: ", course); // this is the course from the URL
      const { data } = await supabase
        .from('Reviews')
        .select()
        .eq('course', course)
        .eq('professor', professor);

      setSearchResults(data);
    };
    fetchResults();
    }, [searchParams]);

  return (
    <div>
      {searchResult.length > 0 ? (
        searchResult.map((review) => {
          return <Card review={review} key={review.id}/>
        })
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  )
}

export default Search;