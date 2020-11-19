import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Notices from "../components/Notices"
// import Lectures from '../components/Lectures';
import About from '../components/About';


export default (
  { data }
  ) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    addingMeta();
  }, [user, setUser]);


  const addingMeta = () => {
    const newMeta = document.createElement('meta');
    newMeta.setAttribute('http-equiv', "Content-Security-Policy");
    newMeta.setAttribute('content', "upgrade-insecure-requests");
    const htmlTag = document.querySelector('head');
    htmlTag.appendChild(newMeta)
  }

  const {
    allStrapiNotices: { nodes: notices },
    // allStrapiLectures: { nodes: lectures },
  } = data;

  typeof window !== 'undefined' && window.addEventListener("beforeunload", function () {
    localStorage.removeItem('user');
  });

  return (
    <Layout>
      <Hero />
      <About />
      <Notices notices={notices} title="the latest notice" showLink/>
      {/* <Notices notices={notices} title="the latest notice" showLink /> */}
    </Layout>
  )
}

export const query = graphql`
  {    
    allStrapiNotices(sort: {fields: date, order: DESC}, limit: 1) {
      nodes {
        date(formatString: "MMMM Do, YYYY")
        notice_title
        strapiId
        notice_item {
          id
          name
        }
      }
    }
    
    allStrapiLectures(sort: {fields: date, order: DESC}, limit: 3) {
      nodes {
        teacher
        slug
        desc
        date(formatString: "MMMM Do, YYYY")
        id
        title
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

