import { server } from "../config";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import { Layout } from "../components";
import { getProjects } from '../redux/actions/projectActions'
import { wrapper } from '../redux/store'
import { useSelector } from 'react-redux'


const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const { projects } = useSelector(state => state.allProjects)

  return (
    <>
      <Head>
        <title>Issue Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="p-8 lg:p-20 container mx-auto">
          <h1 className="font-bold text-3xl text-white">Dashboard</h1>

          {/* PINNED */}
          <div className="mt-8 mb-16">
            <h2>Pinned Projects</h2>
            <ul className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {projects.slice(0,2).map((project, i) => (
                <li
                  key={i}
                  className="border border-zinc-700 rounded-xl overflow-hidden flex items-stretch"
                >
                  <div className="p-8 bg-indigo-500"></div>
                  <div className="p-4">{project.name}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* PROJECT TABLE */}
          {projects ? (
            <div className="border border-zinc-700 rounded-lg overflow-hidden mb-16">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className={`hover:bg-white hover:bg-opacity-5 flex items-center ${
                    i == 0 ? `` : `border-t border-zinc-700`
                  }`}
                >
                  {/* TITLE AND TEAM */}
                  <div className=" w-full lg:w-3/5 ">
                    <Link href={`/projects/${project._id}`}>
                      <div className="inline-flex items-center py-3 px-6 space-x-2">
                        <span className="p-1 rounded-full bg-red-500"></span>
                        <p>
                          <span className="font-bold text-white">
                            {project.name}
                          </span>{" "}
                          in Engineering
                        </p>
                      </div>
                    </Link>
                  </div>
                  {/* MEMBERS */}
                  <div className="w-0 lg:w-1/5 hidden lg:flex items-center">
                    {[...Array.from(Array(3).keys())].map((j) => (
                      <div key={j} className="h-6">
                        <div className={` relative w-4 h-6`}>
                          <div className="absolute top-0 left-0 rounded-full p-2 border bg-indigo-500 w-6 h-6 hover:scale-110"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* LAST UPDATED */}
                  <div className="w-0 lg:w-1/5 hidden lg:flex items-center">
                    <p>March 17, 2020</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>no projects found</p>
          )}
          <div>
            <h2>Latest Comments</h2>
            <a href="#">View All</a>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps(store => async() => {
  await store.dispatch(getProjects())
})
