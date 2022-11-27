import UserOrchestra from "../UserOrchestra/UserOrchestra";
import styles from "./FindOrchestra.module.css";
import { useState, useEffect } from "react";

const FindOrchestra = () => {
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

  const becomeMember = () => {
    // get id from key, made fetch request
  };

  const listOfAllOrchestras = orchestras.map((orchestra) => (
    <UserOrchestra
      key={orchestra._id}
      title={orchestra.title}
      zipcode={orchestra.zipcode}
      city={orchestra.city}
      website={orchestra.website}
      isMember={false}
      description={orchestra.description}
      musitiansAmount={orchestra.musicians_amount}
      frequency={orchestra.practice_frequency}
      genres={orchestra.genres}
      becomeMember={becomeMember}
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

export default FindOrchestra;
