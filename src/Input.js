import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { index, to } from "mathjs";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { click } from "@testing-library/user-event/dist/click";
function Input() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setedit] = useState(false);
  const [index, setindex] = useState(-1);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "w"),
      (snapshot) => {
        setTodo(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      },
      (error) => {
        console.log("err  ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const add = async () => {
    if (input.trim !== "") {
      await addDoc(collection(db, "w"), { todo: input });
    }
  };

  const editI = (i) => {
    const updatedTodo = [...todo];

    updatedTodo[i].todo = input;
    setTodo(updatedTodo);
    console.log(todo);
    const todoRef = doc(db, "w", todo[i].id);

    updateDoc(todoRef, { todo: input });
    {
      editIndex === false ? setedit(true) : setedit(false);
    }
  };

  const del = (i) => {
    try {
      const upda_re = doc(db, "w", todo[i].id);
      deleteDoc(upda_re);
    } catch {
      console.log("ef");
    }
  };

  return (
    <>
      <div className="bg-slate-200 rounded-t-lg shadow-xl ">
        <h1 className="text-center text-3xl font-bold m-4 ">Todo App</h1>

        <div className="m-4 p-4  ">
          <input
            type="text"
            placeholder="ADD todo"
            className="m-2 p-2 focus:outline-teal-400 border border-slate-500 rounded border-none shadow-lg w-80"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="button"
            className="border p-2 bg-blue-500 rounded-lg font-semibold border-none  text-neutral-950"
            onClick={add}
          >
            ADD
          </button>
        </div>
      </div>

      <div className="p-4 m-4 rounded-xl bg-slate-100">
        <div className="">
          <ul>
            {todo.map((k, i) => {
              return (
                <>
                  <li
                    key={i}
                    className="flex  flex-row gap-2 items-center justify-between"
                  >
                    <span className="bg-cyan-200  shadow-xl text-2xl rounded w-60">
                      {editIndex == false ? (
                        k.todo
                      ) : (
                        <input
                          type="text"
                          placeholder="ADD todo"
                          className="m-2 p-2 focus:outline-teal-400 border border-slate-500 rounded border-none shadow-lg w-80"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                        />
                      )}
                    </span>

                    <button
                      type="button"
                      className="bg-green-600 border rounded p-2 m-2 font-semibold text-neutral-950 border-none"
                      key={i}
                      onClick={() => editI(i)}
                    >
                      {editIndex == false ? "edit" : "click to edit"}
                    </button>

                    <button
                      type="button"
                      className="bg-red-600 border rounded p-2  font-semibold text-neutral-950 border-none"
                      onClick={() => del(i)}
                    >
                      DELETE
                    </button>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Input;
