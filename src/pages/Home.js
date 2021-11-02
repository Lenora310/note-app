import React, { Fragment, useEffect, useContext } from "react";
import { Form } from "../components/Form";
import { Loader } from "../components/Loader";
import { Notes } from "../components/Notes";
import {FirebaseContext} from '../context/firebase/firebaseContext'


export const Home = () => {
   
  const {loading, notes, fetchNotes, removeNote} = useContext(FirebaseContext)

  useEffect( ()=> {
    fetchNotes()
    //eslint-disable-next-line
  }, [])

  const handler = () => {
    console.log("Hello, I am note!")
  } 
  return (
    <div onClick={handler}>
      <Fragment>
      <Form></Form>
      <hr />

      {loading
      ? <Loader/>
      :<Notes notes={notes} onRemove={removeNote} ></Notes>
      }

      
    </Fragment>
    </div>
    
  );
};
 