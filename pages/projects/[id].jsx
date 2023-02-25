import Head from "next/head";
import React from "react";
import {Layout} from "../../components";
import {server} from '../../config'
function ProjectPage({project}) {
  return (
    <>
      <Head></Head>
      <Layout>
      <div className="p-8 lg:p-20 container mx-auto">
          <h1 className="font-bold text-3xl text-white">{project.name}</h1>
          </div>
      </Layout>
    </>
  );
}

export default ProjectPage;

export const getServerSideProps = async (context) => {
  const res = await fetch(`${server}/api/projects/${context.params.id}`);
  const data = await res.json();
  const project = data.project;
  console.log(`project is`, project);
  return {
    props: {
      project,
    },
  };
};
