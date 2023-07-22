import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";

import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let count = 0;
let increment = 1;
let intervalId;

import { db } from "../firebaseConfig";
import {
  doc,
  onSnapshot,
  arrayRemove,
  updateDoc,
  getDoc,
} from "firebase/firestore";

export default function Home() {
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");

  const [used, setUsed] = useState([]);
  const [bands, setBands] = useState([]);
  const [assignedName, setAssignedName] = useState(null);

  const [generator, setGenerator] = useState(false);
  const [value, setValue] = useState(null);

  const [btnValue, setBtnValue] = useState("Start Generating");

  const fetchBandNames = async () => {
    let arr = [];
    const unsub = onSnapshot(doc(db, "data", "0X9AQ3TEluBfmqmwBa53"), (doc) => {
      arr = doc.data().bandNames;
      setBands(arr);
    });
  };

  useEffect(() => {
    fetchBandNames();
  }, []);

  const startGeneration = () => {
    setBtnValue("Stop Generating");

    intervalId = setInterval(() => {
      count += increment;
      setValue(count);

      if (count === 5) increment = -1;
      else if (count === 0) increment = 1;
    }, 100);
  };

  const stopGeneration = async () => {
    clearInterval(intervalId);

    setBtnValue("Completed");

    const rand = parseInt(Math.random() * (bands.length - 0) + 0);

    setAssignedName("Assigned Band Name: " + bands[rand]);

    const ref = doc(db, "data", "0X9AQ3TEluBfmqmwBa53");
    await updateDoc(ref, {
      bandNames: arrayRemove(bands[rand]),
      [code + "LoginStatus"]: true,
    });
  };

  const checkLoginStatus = async (abc) => {
    const ref = doc(db, "data", "0X9AQ3TEluBfmqmwBa53");

    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      if (docSnap.data()[abc + "LoginStatus"] === true) {
        return true;
      } else {
        return false;
      }
    }
  };

  const login = async () => {
    if (secret.trim() === "" || code.trim() === "") {
      toast.error("Please enter the secret and code");
      return;
    }

    if (secret === "code1" && code === "school1") {
      if (await checkLoginStatus(code)) toast.error("Already Generated");
      else {
        toast.success("Validated");
        setGenerator(true);
      }
    } else if (secret === "code2" && code === "school2") {
      if (await checkLoginStatus(code)) toast.error("Already Generated");
      else {
        toast.success("Validated");
        setGenerator(true);
      }
    } else if (secret === "code3" && code === "school3") {
      if (await checkLoginStatus(code)) toast.error("Already Generated");
      else {
        toast.success("Validated");
        setGenerator(true);
      }
    } else if (secret === "code4" && code === "school4") {
      if (await checkLoginStatus(code)) toast.error("Already Generated");
      else {
        toast.success("Validated");
        setGenerator(true);
      }
    } else if (secret === "code5" && code === "school5") {
      if (await checkLoginStatus(code)) toast.error("Already Generated");
      else {
        toast.success("Validated");
        setGenerator(true);
      }
    } else if (secret === "testcase" && code === "carmel") {
      if (await checkLoginStatus(code)) toast.error("Already Generated");
      else {
        toast.success("Validated");
        setGenerator(true);
      }
    } else {
      toast.error("Invalid Secret or Code");
    }
  };

  return (
    <>
      <Head>
        <title>Choressa - CS'2K23</title>
        <meta name="description" content="Choressa - Carmel Summit 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <ToastContainer toastClassName={styles.toaster} />
        <center>
          <Image
            priority
            src="/images/pngcslogo.png"
            height={200}
            width={200}
            alt="CS Logo"
          />
          <input
            required
            className={styles.input}
            type="text"
            placeholder="Enter School Code"
            onChange={(e) => setCode(e.target.value)}
          />
          <br />
          <input
            required={true}
            className={styles.input}
            type="text"
            placeholder="Enter Secret"
            onChange={(e) => setSecret(e.target.value)}
          />
          <br />
          <button onClick={login} className={styles.btn}>
            Validate
          </button>

          {generator && (
            <div className={styles.generator}>
              <h1 className={styles.head}>Generator</h1>

              <h1>{value}</h1>
              <br />
              <h1>{assignedName}</h1>

              <button
                disabled={btnValue === "Completed"}
                onClick={
                  btnValue === "Start Generating"
                    ? startGeneration
                    : stopGeneration
                }
                className={styles.btn}
              >
                {btnValue}
              </button>
            </div>
          )}
        </center>
      </div>
    </>
  );
}
