import Head from "next/head";
import React from "react";
import { Layout } from "../../components";
import { server } from "../../config";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { wrapper } from '../../redux/store'
import { getProjectDetails } from '../../redux/actions/projectActions'


function ProjectPage() {
  // const router = useRouter();
  const {project} = useSelector((state) =>
    state.project
  );

  return (
    <>
      <Head></Head>
      <Layout>
        {project ? (
          <div className="p-8 lg:p-20 container mx-auto">
            <h1 className="font-bold text-3xl text-white">{project.name}</h1>
          </div>
        ) : (
          <div className="p-8 lg:p-20 container mx-auto">
            <h1 className="font-bold text-3xl text-white">404: Project Not Found</h1>
          </div>
        )}
      </Layout>
    </>
  );
}

export default ProjectPage;

export const getServerSideProps = wrapper.getServerSideProps(store => async({params}) => {
  await store.dispatch(getProjectDetails(params.id))
})

// export const getServerSideProps = async (context) => {
//   const res = await fetch(`${server}/api/projects/${context.params.id}`);
//   const data = await res.json();
//   const project = data.project;
//   console.log(`project is`, project);

//   return {
//     props: {
//       project,
//     },
//   };
// };
