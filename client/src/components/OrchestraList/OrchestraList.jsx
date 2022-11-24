import { useState } from "react";
import styles from "./OrchestraList.module.css";
import OrchestraItem from "../OrchestraItem/OrchestraItem";
import { useEffect } from "react";

const OrchestraList = () => {
  const [orchestras, setOrchestras] = useState(["1", "2"]);

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
    <OrchestraItem
      key={index}
      title={orchestra.title}
      zipcode={orchestra.zipcode}
      city={orchestra.city}
      website={orchestra.website}
      isMember={false}
    />
  ));
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        orchestras here
        <article className={styles.orchestra_list}>
          {listOfAllOrchestras}
        </article>
      </section>
    </main>
  );
};

export default OrchestraList;
