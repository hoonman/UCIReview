import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CreatePost from './CreatePost';
import { Link } from 'react-router-dom';
const Home = () => {
  // search posts by professor name or course name, create professor review button -> takes user to a form, 
  // call the zot API to get 
  // full URL for peterportalAPI: https://api.peterportal.org/rest/v0/courses/all
  // we must get a list of courses, and a list of professors. each 'post' will be tagged with a course and a professor (maybe multiple course ids and a single professor id)
  // we must get a list of reviews, each review will have a course id, a professor id, and a review body

  const [reviews, setReviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');

  const [profIdNameMap, setProfIdNameMap] = useState({});

  // populate the courses and professors using the peterportalAPI
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('https://api.peterportal.org/rest/v0/courses/all');
      // const response = await fetch('https://1tgg4m2pra.execute-api.us-east-2.amazonaws.com/prod/courses?subject=COMPSCI');
      const data = await response.json();
      console.log("data: ", data);
      // go through the data and find courses that are "department: Computer Science" and update the data
      const filteredData = data.filter((course) => course.department === "COMPSCI");
      console.log("filteredData: ", filteredData);

      // setCourses(data);
      setCourses(filteredData);
    }

    const fetchProfessors = async () => {
      const response = await fetch('https://api.peterportal.org/rest/v0/instructors/all');
      const data = await response.json();
      // go through the professor list and associate the prof id (ucinetid) to prof name (name)
      const profMap = {};
      for (let i = 0; i < data.length; i++) {
        profMap[data[i].ucinetid] = data[i].name;
      }
      console.log("profMap: ", profMap);
      setProfIdNameMap(profMap);
      setProfessors(data);
    }
    fetchCourses();
    fetchProfessors();

    // go through the data and find courses that are "department: Computer Science" and update the data
  }, [])
  useEffect(() => {
    // whenever selected course changes, we fetch the relevant professors for professors useState variable list
    // go through the professors list and find the professors that teach the selected course
    // the api structure looks like this (for courses:)

    // {
    //   id: "COMPSCI103",
    //   department: "COMPSCI",
    //   number: "103",
    //   school: "Donald Bren School of Information and Computer Sciences",
    //   title: "Advanced Programming and Problem Solving with C++",
    //   course_level: "Upper Division (100-199)",
    //   department_alias: [
    //   "CS"
    //   ],
    //   units: [
    //   4,
    //   4
    //   ],
    //   description: "Advanced programming language concepts for more complex, higher performance software design. Builds depth of programming skills in C++ as a foundation for upper-division courses and projects. Focuses on strengthening programming, debugging, and problem solving skills.",
    //   department_name: "Computer Science",
    //   professor_history: [
    //   "klefstad"
    //   ]
    // }
    
    // implement below:
    const filterProf = () => {
      const profs = [];
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].id === selectedCourse) {
          for (let j = 0; j < courses[i].professor_history.length; j++) {
            // each child in a list should have a unique "key" prop
            profs.push({name: courses[i].professor_history[j]});
          }
          break;
        }
      }
      return profs;
    }
    const profs = filterProf();
    console.log("profs: ", profs);
    // for each entry in profs, we need to associate that prof with a full name in the profIdNameMap
    for (let i = 0; i < profs.length; i++) {
      profs[i].name = profIdNameMap[profs[i].name];
    }
    setProfessors(profs);
  }, [selectedCourse])

  const handleChange = (e) => {
    console.log("e.target.value: ", e.target.value);
    // setCourses(e.target.value);
    setSelectedCourse(e.target.value);
  }

  const handleChange2 = (e) => {
    console.log("e.target.value: ", e.target.value);
    // setProfessors(e.target.value);
    setSelectedProfessor(e.target.value);
  }

  const handleSubmit = () => {
    console.log("selectedCourse: ", selectedCourse);
    console.log("selectedProfessor: ", selectedProfessor);
    // TODO: when we click submit, we should look for reviews that match the selected course and professor! 
  }

  return (
    <div>
      <h1>UCIReview</h1>
      {courses.length > 0 && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCourse}
              label="Courses"
              onChange={handleChange}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>{course.id}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {professors.length > 0 && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Instructors</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedProfessor}
              label="Professors"
              onChange={handleChange2}
            >
              {professors.map((professor) => (
                <MenuItem key={professor.ucinetid} value={professor.name}>{professor.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      <button type="submit" onClick={handleSubmit}>Search!</button>
      {/* this button 'create review' will prompt us to a new page where we can create a new professor review based on the selected professor and class */}
      {/* <button type="submit" >Create Review</button>  */}
      {/* <Link to="/create"><button type="submit">Create Review</button></Link> */}
      <Link to={`/create?professor=${selectedProfessor}&course=${selectedCourse}`}><button type="submit">Create Review</button></Link>
    </div>
  );
}

export default Home;