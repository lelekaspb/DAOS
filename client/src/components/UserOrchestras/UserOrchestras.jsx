import { useState } from "react";
import styles from "./UserOrchestras.module.css";
import UserOrchestra from "../UserOrchestra/UserOrchestra";
import { useEffect } from "react";

const UserOrchestras = () => {
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
        console.log(response);
        setOrchestras(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllOrchestras();
  }, []);

  const listOfAllOrchestras = orchestras.map((orchestra, index) => (
    <UserOrchestra
      key={index}
      title={orchestra.title}
      zipcode={orchestra.zipcode}
      city={orchestra.city}
      website={orchestra.website}
      isMember={true}
    />
  ));
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <article className={styles.orchestra_list}>
          {listOfAllOrchestras}
        </article>
      </section>
    </main>
  );
};

export default UserOrchestras;
