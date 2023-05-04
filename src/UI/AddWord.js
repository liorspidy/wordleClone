import { useState } from "react";
import Card from "./Card";
import classes from "./Card.module.css";
import wordsDb from "../merged_words.json";

const AddWord = ({ setShowAddWord, showAddWord }) => {
  const [addWordVal, setAddWordVal] = useState("");

  const addWordHandler = (event) => {
    event.stopPropagation();
    const hebrewLettersPattern = /^[\u0590-\u05FF\s]*$/;
    if (hebrewLettersPattern.test(addWordVal)) {
      const updatedWordsDb = [...wordsDb];
      updatedWordsDb.push(addWordVal);
      updatedWordsDb.sort();
      const updatedWordsDbJson = JSON.stringify(updatedWordsDb);
      localStorage.setItem("wordsDb", updatedWordsDbJson);
      setShowAddWord(false);
    }
  };

  const inputChangeHandler = (event) => {
    const hebrewLettersPattern = /^[\u0590-\u05FF\s]*$/;
    if (hebrewLettersPattern.test(event.target.value)) {
      setAddWordVal(event.target.value);
    }
  };

  return (
    <div
      className={`${classes.backdrop} ${showAddWord ? classes.show : ""}`}
      onClick={() => setShowAddWord(false)}
    >
      <Card onClick={(event) => event.stopPropagation()}>
        <div className={classes.addWord}>
          <label dir="rtl" htmlFor="wordInput">
            הוסף מילה חדשה בת 5 מילים למילון:
          </label>
          <input
            id="wordInput"
            type="text"
            maxLength={5}
            value={addWordVal}
            onChange={inputChangeHandler}
          />
          <button className={classes.btn} onClick={addWordHandler}>
            הוספה
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AddWord;
