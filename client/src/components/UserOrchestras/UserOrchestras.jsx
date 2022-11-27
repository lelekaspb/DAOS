import { useState } from "react";
import styles from "./UserOrchestras.module.css";
import UserOrchestra from "../UserOrchestra/UserOrchestra";
import { useEffect } from "react";

const UserOrchestras = ({ userInfo }) => {
  const [orchestras, setOrchestras] = useState([]);

  useEffect(() => {
    const fetchAllOrchestras = async () => {
      const url = "http://127.0.0.1:3007/orchestra";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      };
      try {
        let response = await fetch(url, options);
        response = await response.json();
        setOrchestras(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllOrchestras();
  }, []);

  const updateState = (updatedOrchestra) => {
    const indexOfOrchestraToUpdate = orchestras.findIndex(
      (item) => item._id === updatedOrchestra._id
    );
    if (indexOfOrchestraToUpdate > -1) {
      const firstPart = orchestras.slice(0, indexOfOrchestraToUpdate);
      const lastPart = orchestras.slice(
        indexOfOrchestraToUpdate + 1,
        orchestras.length
      );
      setOrchestras([...firstPart, updatedOrchestra, ...lastPart]);
    }
  };

  const addMember = async (event) => {
    const orchestraId = event.target.dataset.orchestra;
    const userId = event.target.dataset.user;
    const url = `http://127.0.0.1:3007/orchestra/${orchestraId}/members`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ id: userId }),
    };
    try {
      let response = await fetch(url, options);
      response = await response.json();
      updateState(response);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMember = async (event) => {
    const orchestraId = event.target.dataset.orchestra;
    const userId = event.target.dataset.user;
    const url = `http://127.0.0.1:3007/orchestra/${orchestraId}/members/${userId}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    try {
      let response = await fetch(url, options);
      response = await response.json();
      updateState(response);
    } catch (err) {
      console.error(err);
    }
  };

  const listOfAllOrchestras = orchestras.map((orchestra, index) => (
    <UserOrchestra
      key={index}
      title={orchestra.title}
      zipcode={orchestra.zipcode}
      city={orchestra.city}
      website={orchestra.website}
      isMember={
        orchestra.members.find((member) => member._id == userInfo.id) || false
      }
      members={orchestra.members.map((member) => (
        <span key={member._id}>
          {member.firstName} &nbsp;{member.lastName} &nbsp;
        </span>
      ))}
      addMember={addMember}
      deleteMember={deleteMember}
      orchestraId={orchestra._id}
      userId={userInfo.id}
    />
  ));
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h2 className={styles.page_heading}>Ensembler</h2>
        <article className={styles.orchestra_list}>
          {listOfAllOrchestras}
        </article>
      </section>
    </main>
  );
};

export default UserOrchestras;
