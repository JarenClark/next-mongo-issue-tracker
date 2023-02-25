import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  BriefcaseIcon,
  BugAntIcon,
  Squares2X2Icon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { server } from "../config";

function Layout({ children }) {
  const router = useRouter();

  const [projectMenuExpanded, setProjectMenuExpanded] = useState(false);

  useEffect(() => {
    setProjectMenuExpanded(false);
  }, [router]);

  return (
    <>
      <div className="flex w-screen h-screen">
        {/* MAIN */}
        <div
          onClick={() => setProjectMenuExpanded(false)}
          className="flex flex-col grow relative z-[1] pl-20"
        >
          <main>{children}</main>
        </div>

        {/* SIDEBAR */}
        <div className="z-[10] fixed top-0 left-0  h-screen border-r border-zinc-700 bg-gray-900">
          <div className="bg-gray-900 flex flex-col justify-between h-screen">
            <div className="p-8">
              <ul className="flex flex-col space-y-4">
                {/* Dashboard */}
                <li>
                  <Link href={"/"}>
                    <div className="rounded-lg group hover:text-white">
                      <BugAntIcon className="w-8 h-8 " />
                    </div>
                  </Link>
                </li>

                {/* Project Select */}
                <li>
                  <button
                    onClick={() => setProjectMenuExpanded(!projectMenuExpanded)}
                  >
                    <div className="rounded-lg group hover:text-white">
                      <Squares2X2Icon className="w-8 h-8" />
                    </div>
                  </button>
                </li>

                {/* My Tasks */}
                <li>
                  <Link href={"/"}>
                    <div className="rounded-lg group hover:text-white">
                      <BriefcaseIcon className="w-8 h-8 " />
                    </div>
                  </Link>
                </li>
                {/* Teams */}
                {/* Calendar */}
                {/* Notifications */}
                {/* Comments */}
              </ul>
            </div>
            <div className="p-8">
              <div className="rounded-full bg-red-500 p-2 text-white">JC</div>
            </div>

            <ProjectMenu
              projectMenuExpanded={projectMenuExpanded}
              setProjectMenuExpanded={setProjectMenuExpanded}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function ProjectMenu({ projectMenuExpanded, setProjectMenuExpanded }) {
  const [projects, setProjects] = useState([]);

  const [searchInput, setSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // atatched to close icon enxt to search bar
  function stopSearching() {
    setSearchInput(false);
    setSearchTerm("");
  }

  // attached to serach icon/text for opening inline input
  function openSearchIfClosed() {
    if (searchInput == false) {
      setSearchInput(true);
    }
  }

  // get projects and pass our search query
  async function getProjects(term) {
    const res = await fetch(`${server}/api/projects?searchQ=${term}`);
    const data = await res.json();
    setProjects(data.projects);
  }

  // on load
  useEffect(() => {
    getProjects(searchTerm);
  }, []);

  //
  useEffect(() => {
    getProjects(searchTerm);
  }, [searchTerm]);

  return (
    <>
      {projectMenuExpanded && (
        <div
          onClick={() => setProjectMenuExpanded(false)}
          className="fixed inset-0 w-screen h-screen backdrop-blur-sm z-[-2]"
        ></div>
      )}
      <div
        className={`${
          projectMenuExpanded ? `translate-x-0` : `-translate-x-full`
        } transition duration-200 z-[-2] absolute h-screen top-0 bottom-0 left-full w-auto min-w-[200px] bg-gray-800`}
      >
        {projectMenuExpanded && (
          <div className="relative w-full">
            <div className="absolute top-8 left-full ">
              <button
                className="transform -translate-x-1/2 transition duration-200 bg-white hover:bg-blue-500 rounded-full text-black hover:text-white p-1"
                onClick={() => setProjectMenuExpanded(false)}
              >
                <ChevronLeftIcon className="w-5 h-5 " />
              </button>
            </div>
          </div>
        )}
        <ul className="flex flex-col space-y-3 mt-8 px-4 pb-8 border-b border-gray-400">
          {/* NEW PROJECT */}
          <li className="inline-flex space-x-2 cursor-pointer group hover:text-blue-400">
            <PlusIcon className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </li>
          {/* FILTER */}
          <li className="inline-flex space-x-2 cursor-pointer group hover:text-indigo-300">
            <FunnelIcon className="w-4 h-4 " />
            <span className="text-sm">Filter</span>
          </li>
          {/* SEARCH */}
          <li
            onClick={openSearchIfClosed}
            className={` ${
              searchInput == false && `hover:text-cyan-500`
            } inline-flex items-center space-x-2 cursor-pointer group `}
          >
            <MagnifyingGlassIcon
              onClick={() => setSearchInput(!searchInput)}
              className="w-4 h-4 hover:text-cyan-500"
            />
            {searchInput ? (
              <>
                <input
                  className=" px-2 rounded-full text-white"
                  placeholder={"Search..."}
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <XMarkIcon
                  onClick={stopSearching}
                  className="w-4 h-4 hover:text-cyan-500"
                />
              </>
            ) : (
              <span
                onClick={() => setSearchInput(true)}
                className="text-sm hover:text-cyan-500"
              >
                Search
              </span>
            )}
          </li>
        </ul>
        <div className="px-4 py-8">
          <h3 className="font-bold text-xl text-white">Projects</h3>
          {projects && projects.length > 0 ? (
            <ul className="flex flex-col space-y-2 px-6 p-4 text-sm">
              {projects.map((project, i) => (
                <li key={i} className="hover:text-white">
                  <Link href={`/projects/${project._id}`}>
                    <span>{project.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="my-4 flex items-center spaxe-x-2 text-sm ml-6 ">
              <p>
                0 results {" "}
                {searchTerm && (
                  <>for: <span className="font-mono p-1 bg-black text-white">{searchTerm}</span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Layout;
