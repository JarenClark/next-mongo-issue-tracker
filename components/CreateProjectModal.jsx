import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { XMarkIcon, Spin } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { Spinner } from "./index";

const labelClasses = `block mb-2 text-sm`;
const inputClasses = `block w-full bg-transparent border border-zinc-700 rounded-md p-2 mb-4`;
const buttonClasses = `mt-6 w-full bg-indigo-600 text-white text-center py-2 px-12 flex justify-center items-center rounded-md`;

function CreateProjectModal({
  createProjectModalIsOpen,
  setCreateProjectModalIsOpen,
}) {
  const { setValue, register, handleSubmit, error } = useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const teamOptions = ["Content", "Design", "Engineering", "Strategy"];
  const onSubmit = async (data) => {
    console.log(data);
    setFormSubmitted(true);
  };

  // let label click check the input
  function checkMySibling(e) {
    setValue("team", e.target.innerText);
    let parent = e.target.parentNode;
    parent.querySelector("input").checked = true;
  }

  return (
    <>
      <Modal
        className={"ProjectModal"}
        overlayClassName={"ProjectModalOverlay"}
        isOpen={createProjectModalIsOpen}
        appElement={document.getElementById("__next")}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setCreateProjectModalIsOpen(false)}
      >
        {/* <div className="w-screen h-screen flex justify-center items-center"> */}
          <div className="max-w-lg bg-gray-900 mx-auto w-full border border-zinc-700 p-8  rounded-2xl">
            <div className="flex justify-end mb-4">
              <button
                className="cursor-pointer transition duration-200 hover:text-white"
                onClick={() => {
                  setFormSubmitted(false);
                  setCreateProjectModalIsOpen(false);
                }}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <h3 className="mb-4 text-center text-2xl font-bold text-white">
              Create Project
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} id="projectForm">
              <fieldset>
                <div className="mb-8">
                  <label className={labelClasses} htmlFor="projectName">
                    Project Name
                  </label>
                  <input
                    className={inputClasses}
                    type="projectName"
                    {...register("projectName", { required: true })}
                  />
                </div>
                <div className="pt-8 border-t border-zinc-700">
                  <label className="block mb-4 text-sm" htmlFor="team">
                    Team
                  </label>
                  <div className="radios flex flex-wrap -mx-2">
                    {teamOptions.map((item, i) => (
                      <div
                        key={i}
                        className="flex w-1/2 lg:w-1/3 items-center px-2 space-x-2 my-2"
                      >
                        <label
                          className="text-base cursor-pointer group hover:text-white"
                          htmlFor="team"
                        >
                          <input
                            {...register("team")}
                            type="radio"
                            value={item}
                          />{" "}
                          <span onClick={(e) => checkMySibling(e)}>{item}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  disabled={formSubmitted}
                  className={`${buttonClasses} disabled:opacity-50`}
                  type="submit"
                >
                  {formSubmitted ? <Spinner /> : "Next"}
                </button>
              </fieldset>
            </form>
          </div>
        {/* </div> */}
      </Modal>
    </>
  );
}

export default CreateProjectModal;
